function scoreLead(message) {
  const text = message.toLowerCase();

  const hotKeywords = [
    "book",
    "payment",
    "price",
    "cost",
    "available",
    "departure",
    "how to confirm",
    "advance",
    "upi",
    "send details"
  ];

  const warmKeywords = [
    "itinerary",
    "difficulty",
    "snow",
    "weather",
    "fitness",
    "how many days",
    "best time",
    "safe",
    "girls"
  ];

  if (hotKeywords.some(word => text.includes(word))) {
    return "hot";
  }

  if (warmKeywords.some(word => text.includes(word))) {
    return "warm";
  }

  return "cold";
}

module.exports = { scoreLead };