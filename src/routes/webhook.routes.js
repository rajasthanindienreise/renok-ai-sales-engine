const express = require("express");
const { handleWebhook } = require("../controllers/webhook.controller");

const router = express.Router();

// Verification endpoint (Meta requires this)
router.get("/webhook", handleWebhook);

// Incoming message endpoint
router.post("/webhook", handleWebhook);

module.exports = router;