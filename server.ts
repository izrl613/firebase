import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // WebAuthn Registration Options
  app.post("/api/auth/register-options", (req, res) => {
    const { userId, userEmail } = req.body;
    
    // In a real app, you'd generate a unique challenge and save it to a session
    const challenge = "mock_challenge_" + Math.random().toString(36).substring(7);
    
    const host = req.get('host')?.split(':')[0] || 'localhost';
    const rpId = host === '127.0.0.1' ? 'localhost' : host;
    
    res.json({
      challenge,
      rp: { name: "Agape Sovereign", id: rpId },
      user: { id: userId, name: userEmail, displayName: userEmail },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }, { alg: -257, type: "public-key" }],
      timeout: 60000,
      attestation: "none",
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "preferred",
        authenticatorAttachment: "platform",
      },
    });
  });

  // WebAuthn Verification (Mock for demo)
  app.post("/api/auth/verify-registration", (req, res) => {
    // In a real app, you'd use verifyRegistrationResponse from @simplewebauthn/server
    res.json({ verified: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Fallback to index.html for SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
