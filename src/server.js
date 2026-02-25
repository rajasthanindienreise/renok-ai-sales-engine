process.env.NODE_OPTIONS = "--dns-result-order=ipv4first";
require("dotenv").config();

const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const webhookRoutes = require("./routes/webhook.routes");

const app = express();
app.use(express.json());

app.use("/", aiRoutes);
app.use("/", webhookRoutes);

app.get("/", (req, res) => {
  res.send("Renok AI Running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});