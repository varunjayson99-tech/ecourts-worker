const express = require("express");
const app = express();

// health check route
app.get("/", (req, res) => {
  res.send("🚀 LitiGate AI backend running");
});

// 🔥 CRITICAL: Railway PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
