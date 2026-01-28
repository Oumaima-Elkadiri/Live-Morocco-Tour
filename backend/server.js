// ================= IMPORTS =================
import dotenv from "dotenv";
dotenv.config();

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
import { fileURLToPath } from "url";

import adminNewsletterRoutes from "./routes/adminNewsletter.js";

// ================= FIX __dirname =================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= EXPRESS APP =================
const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "emails.json");

// ================= MIDDLEWARES =================
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        mediaSrc: ["'self'", "data:"],
        connectSrc: ["'self'", process.env.FRONTEND_ORIGIN],
      },
    },
  })
);
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-admin-key"],
  })
);

app.options(
  "*",
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    allowedHeaders: ["Content-Type", "x-admin-key"],
  })
);

// ================= RATE LIMIT =================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many requests. Try again later." },
});
app.use("/api/newsletter", limiter);

const mutex = new Mutex();

// ================= SMTP =================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter
  .verify()
  .then(() => console.log("SMTP connecté ✔️"))
  .catch((err) => console.warn("⚠ Problème SMTP :", err.message));

// ================= TRADUCTIONS =================
const messages = {
  en: {
    email_invalid: "Invalid email.",
    newsletter_success: "Subscription successful!",
    already_subscribed: "This email is already subscribed.",
    contact_success: "Message sent successfully!",
    contact_error: "Invalid name, email or message.",
  },
  fr: {
    email_invalid: "Email invalide.",
    newsletter_success: "Inscription réussie !",
    already_subscribed: "Cet email est déjà inscrit.",
    contact_success: "Message envoyé avec succès !",
    contact_error: "Nom, email ou message invalide.",
  },
};

// ================= EMAILS JSON =================
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
  await fs.writeFile(DATA_FILE, JSON.stringify(emails, null, 2));
}

// ================= CHECK DOMAIN =================
async function checkEmailDomain(email) {
  try {
    const domain = email.split("@")[1];
    await dns.resolve(domain);
    const mx = await dns.resolveMx(domain);
    return mx.length > 0;
  } catch {
    return false;
  }
}

// ================= LANGUAGE =================
app.use((req, res, next) => {
  const lang = req.headers["accept-language"] || "en";
  req.lang = lang.startsWith("fr") ? "fr" : "en";
  next();
});

// ================= NEWSLETTER =================
app.post("/api/newsletter", async (req, res) => {
  const release = await mutex.acquire();
  try {
    const { email } = req.body;
    const lang = req.lang;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: messages[lang].email_invalid });
    }

    const normalized = validator.normalizeEmail(email);
    if (!(await checkEmailDomain(normalized))) {
      return res.status(400).json({ message: messages[lang].email_invalid });
    }

    const emails = await readEmailsFile();
    if (emails.includes(normalized)) {
      return res.status(409).json({ message: messages[lang].already_subscribed });
    }

    emails.push(normalized);
    await writeEmailsFile(emails);

    await transporter.sendMail({
      from: `"Live Morocco Tour" <${process.env.FROM_EMAIL}>`,
      to: normalized,
      subject: "Welcome to Live Morocco Tour!",
      html: `<h2>Welcome!</h2><p>Thank you for subscribing.</p>`,
    });

    res.status(201).json({ message: messages[lang].newsletter_success });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  } finally {
    release();
  }
});

// ================= CONTACT =================
app.post("/api/contact", async (req, res) => {
  const { nom, email, message } = req.body;
  const lang = req.lang;

  if (!nom || !email || !validator.isEmail(email) || !message) {
    return res.status(400).json({ message: messages[lang].contact_error });
  }

  try {
    await transporter.sendMail({
      from: `"${nom}" <${email}>`,
      to: process.env.SMTP_USER,
      subject: `New message from ${nom}`,
      html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    res.json({ message: messages[lang].contact_success });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// ================= ADMIN NEWSLETTER =================
app.use("/api/admin/newsletter", adminNewsletterRoutes(transporter));

// ================= SERVIR FRONTEND =================
const frontendPath = path.join(__dirname, "frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`🚀 Backend + Frontend running on port ${PORT}`);
});
