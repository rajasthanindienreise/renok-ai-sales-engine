function detectTrek(message) {
  const text = message.toLowerCase();

  if (text.includes("hampta")) return "Hampta Pass Trek";
  if (text.includes("kedarkantha")) return "Kedarkantha Trek";
  if (text.includes("kashmir")) return "Kashmir Great Lakes";
  if (text.includes("bhrigu")) return "Bhrigu Lake Trek";

  return null;
}

module.exports = { detectTrek };