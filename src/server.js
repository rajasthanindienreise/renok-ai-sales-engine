const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("WORKING");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port", PORT);
});