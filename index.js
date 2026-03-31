const express = require("express");
const { chromium } = require("playwright");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/ecourts", async (req, res) => {
  if (API_KEY && req.headers["x-api-key"] !== API_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { cnr } = req.body;

  if (!cnr) {
    return res.status(400).json({ error: "Missing CNR" });
  }

  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto("https://services.ecourts.gov.in/ecourtindia_v6/");

    return res.json({
      success: true,
      message: "Worker live 🚀",
      cnr
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log("Worker running on port", PORT);
});
