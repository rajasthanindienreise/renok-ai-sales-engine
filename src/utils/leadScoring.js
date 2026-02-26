function scoreLead(message) {
  const text = message.toLowerCase();

  if (
    text.includes("book") ||
    text.includes("confirm") ||
    text.includes("payment") ||
    text.includes("pay") ||
    text.includes("reserve") ||
    text.includes("seat") ||
    text.includes("register")
  ) {
    return "hot";
  }

  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("details") ||
    text.includes("itinerary") ||
    text.includes("snow") ||
    text.includes("difficulty")
  ) {
    return "warm";
  }

  return "cold";
}

module.exports = { scoreLead };