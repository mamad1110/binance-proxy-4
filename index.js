import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/*", async (req, res) => {
  const target = "https://api.binance.com" + req.originalUrl;

  try {
    const response = await fetch(target);
    const data = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Error fetching Binance API" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Binance Proxy running on port ${PORT}`);
});
