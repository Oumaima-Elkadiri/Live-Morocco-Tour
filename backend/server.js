// --- IMPORTS EN ES MODULES ---
import dotenv from "dotenv";
dotenv.config();
import process from "process";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";
import validator from "validator";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { Mutex } from "async-mutex";
import dns from "dns/promises";

// --- FIX : __dirname pour ES Modules ---
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- EXPRESS ---
const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "emails.json");

// --- MIDDLEWARES ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.options("*", cors());
app.use(express.json());

// --- RATE LIMIT ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Trop de requêtes. Réessayez plus tard." },
});
app.use("/api/newsletter", limiter);

const mutex = new Mutex();

// --- SMTP Nodemailer ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Vérification SMTP
transporter
  .verify()
  .then(() => console.log("SMTP connecté ✔️"))
  .catch((err) => console.warn("⚠ Problème SMTP :", err.message));

// --- Traductions simple ---
const messages = {
  en: {
    email_invalid: "Invalid email.",
    newsletter_success: "Subscription successful!",
    already_subscribed: "This email is already subscribed.",
    contact_success: "Message sent successfully!",
    contact_error: "Invalid name, email or message.",
  },
  du: {
    email_invalid: "Ongeldig e-mailadres.",
    newsletter_success: "Inschrijving succesvol!",
    already_subscribed: "Dit e-mailadres is al ingeschreven.",
    contact_success: "Bericht succesvol verzonden!",
    contact_error: "Ongeldige naam, e-mail of bericht.",
  },
  es: {
    email_invalid: "Correo electrónico inválido.",
    newsletter_success: "¡Suscripción exitosa!",
    already_subscribed: "Este correo ya está suscrito.",
    contact_success: "¡Mensaje enviado con éxito!",
    contact_error: "Nombre, correo o mensaje inválido.",
  },
  it: {
    email_invalid: "Email non valido.",
    newsletter_success: "Iscrizione avvenuta con successo!",
    already_subscribed: "Questa email è già iscritta.",
    contact_success: "Messaggio inviato con successo!",
    contact_error: "Nome, email o messaggio non valido.",
  },
  ru: {
    email_invalid: "Недействительный адрес электронной почты.",
    newsletter_success: "Подписка успешно оформлена!",
    already_subscribed: "Этот адрес электронной почты уже подписан.",
    contact_success: "Сообщение успешно отправлено!",
    contact_error: "Неверное имя, электронная почта или сообщение.",
  },
};


// --- Email JSON ---
async function readEmailsFile() {
  try {
    const content = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}
async function writeEmailsFile(emails) {
  await fs.writeFile(DATA_FILE, JSON.stringify(emails, null, 2), "utf8");
}

// --- Vérification domaine A + MX ---
async function checkEmailDomain(email) {
  try {
    const domain = email.split("@")[1];
    const aRecord = await dns.resolve(domain);
    if (!aRecord) return { valid: false, reason: "Domain not found" };
    const mxRecords = await dns.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0)
      return { valid: false, reason: "Domain has no MX (cannot receive emails)" };
    return { valid: true };
  } catch (err) {
    return { valid: false, reason: err.message };
  }
}

// --- Middleware pour récupérer la langue ---
app.use((req, res, next) => {
  const langHeader = req.headers["accept-language"]?.split(",")[0] || "en";
  if (langHeader.startsWith("du")) req.lang = "du";
  else if (langHeader.startsWith("es")) req.lang = "es";
  else if (langHeader.startsWith("it")) req.lang = "it";
  else if (langHeader.startsWith("ru")) req.lang = "ru";
  else req.lang = "en"; // par défaut
  next();
});


// --- ROUTE : NEWSLETTER ---
app.post("/api/newsletter", async (req, res) => {
  const release = await mutex.acquire();
  try {
    const { email } = req.body;
    const lang = req.lang;

    if (!email || !validator.isEmail(String(email))) {
      return res.status(400).json({ message: messages[lang].email_invalid });
    }

    const normalized = validator.normalizeEmail(email);
    const domainCheck = await checkEmailDomain(normalized);
    if (!domainCheck.valid) {
      return res.status(400).json({
        message: messages[lang].email_invalid + " (" + domainCheck.reason + ")",
      });
    }

    let emails = await readEmailsFile();
    if (emails.includes(normalized)) {
      return res.status(409).json({ message: messages[lang].already_subscribed });
    }

    emails.push(normalized);
    await writeEmailsFile(emails);

    // Email de bienvenue TOUJOURS EN ANGLAIS
    try {
      await transporter.sendMail({
        from: `"Moroccan Trails" <${process.env.FROM_EMAIL}>`,
        to: normalized,
        subject: "Welcome to Moroccan Trails!",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin:auto; padding:20px; border-radius:10px; border:1px solid #eee;">
            <div style="text-align:center; margin-bottom:20px;">
              <img src="LOGO_URL" alt="Moroccan Trails" style="max-width:150px;">
            </div>
            <h2 style="text-align:center; color:#3366ff;">Welcome to Moroccan Trails!</h2>
            <p>Thank you for subscribing to Moroccan Trails! You will receive our latest updates and travel tips.</p>
            <p style="text-align:center; margin-top:30px;">
              <a href="https://yourwebsite.com" style="background-color:##3366ff; color:#fff; text-decoration:none; padding:12px 25px; border-radius:5px; font-weight:bold;">
                Visit Our Website
              </a>
            </p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error("Mail error:", mailErr);
    }

    return res.status(201).json({ message: messages[lang].newsletter_success });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur." });
  } finally {
    release();
  }
});

// --- ROUTE : CONTACT ---
app.post("/api/contact", async (req, res) => {
  const { nom, email, message } = req.body;
  const lang = req.lang;

  if (!nom || !email || !validator.isEmail(email) || !message) {
    return res.status(400).json({ message: messages[lang].contact_error });
  }

  const domainCheck = await checkEmailDomain(email);
  if (!domainCheck.valid) {
    return res.status(400).json({
      message: messages[lang].email_invalid + " (" + domainCheck.reason + ")",
    });
  }

  try {
    await transporter.sendMail({
      from: `"${nom}" <${email}>`,
      to: process.env.SMTP_USER,
      subject: lang === "fr" ? `Nouveau message de ${nom}` : `New message from ${nom}`,
      html: `<p><strong>${lang === "fr" ? "Nom" : "Name"} :</strong> ${nom}</p>
             <p><strong>Email :</strong> ${email}</p>
             <p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    return res.status(200).json({ message: messages[lang].contact_success });
  } catch (err) {
    console.error("Erreur contact:", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
});

app.get("/", (req, res) => {
  res.send("Backend running — newsletter & contact API.");
});

// --- Lancement serveur ---
app.listen(PORT, () => {
  console.log(`🚀 Backend on http://localhost:${PORT}`);
});

