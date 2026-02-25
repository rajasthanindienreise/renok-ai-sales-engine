const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

async function generateReply(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are Renok Adventures' senior trekking consultant.
Friendly, confident, persuasive.
Keep answers under 120 words.
`
      },
      {
        role: "user",
        content: message
      }
    ],
    max_tokens: 150
  });

  return response.choices[0].message.content;
}

module.exports = { generateReply };