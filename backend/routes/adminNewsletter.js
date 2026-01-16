import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ==============================
// __dirname fix (ES Modules)
// ==============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==============================
// emails.json path
// ==============================
const DATA_FILE = path.join(__dirname, "../emails.json");

// ==============================
// Lire les emails
// ==============================
async function readEmails() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
}

// ==============================
// EXPORT FUNCTION (transporter)
// ==============================
export default function adminNewsletterRoutes(transporter) {
  const router = express.Router();

  // ==============================
  // 🔐 Middleware admin key
  // ==============================
  router.use((req, res, next) => {
    const key = req.headers["x-admin-key"];

    if (!key || key !== process.env.ADMIN_KEY) {
      return res.status(401).json({
        message: "Unauthorized admin access",
      });
    }

    next();
  });

  // ==============================
  // 📤 ENVOYER NEWSLETTER
  // ==============================
  router.post("/send", async (req, res) => {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        message: "Subject and message required",
      });
    }

    try {
      const emails = await readEmails();

      if (emails.length === 0) {
        return res.status(400).json({
          message: "No subscribers found",
        });
      }

      for (const email of emails) {
        await transporter.sendMail({
          from: `"Live Morocco Tour" <${process.env.FROM_EMAIL}>`,
          to: email,
          subject,
          html: `
            <div style="font-family:Arial; max-width:600px; margin:auto">
              <h2>${subject}</h2>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
          `,
        });
      }

      res.json({
        message: `Newsletter sent to ${emails.length} subscribers`,
      });
    } catch (err) {
      console.error("Admin newsletter error:", err);
      res.status(500).json({
        message: "Server error",
      });
    }
  });

  return router;
}
