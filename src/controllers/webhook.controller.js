const { upsertLead } = require("../services/lead.service");
const { generateReply } = require("../services/openai.service");

async function handleWebhook(req, res) {

  // 🔹 Meta Verification Step
  if (req.method === "GET") {
    const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  // 🔹 Incoming Message
  if (req.method === "POST") {
    try {
      const body = req.body;

      const message =
        body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;

      const phone =
        body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

      if (!message || !phone) {
        return res.sendStatus(200);
      }

      console.log("Incoming Message:", message);
      console.log("From:", phone);

      await upsertLead(phone, message);

      const reply = await generateReply(message);

      console.log("AI Reply:", reply);

      // For now just log reply
      // Later we will send reply using Meta API

      return res.sendStatus(200);

    } catch (error) {
      console.error("Webhook Error:", error);
      return res.sendStatus(500);
    }
  }
}

module.exports = { handleWebhook };