const express = require("express");
const { handleAskAI } = require("../controllers/ai.controller");

const router = express.Router();

router.get("/ask-ai", handleAskAI);

module.exports = router;