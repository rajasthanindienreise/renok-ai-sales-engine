const { upsertLead } = require("../services/lead.service");
const { generateReply } = require("../services/openai.service");

async function handleAskAI(req, res) {
  try {
    const phone = req.query.phone;
    const message = req.query.message;

    if (!phone || !message) {
      return res.status(400).json({
        error: "Phone and message are required"
      });
    }

    const paymentLink = await upsertLead(phone, message);

    const aiReply = await generateReply(message);

    let finalReply = aiReply;

    if (paymentLink) {
      finalReply += `\n\nTo confirm your seat, please complete payment here:\n${paymentLink}`;
    }

    res.json({
      reply: finalReply
    });

  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { handleAskAI };