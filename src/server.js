if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const webhookRoutes = require("./routes/webhook.routes");

const app = express();
app.use(express.json());

app.use("/", aiRoutes);
app.use("/", webhookRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Renok AI Running 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});