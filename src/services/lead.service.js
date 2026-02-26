const supabase = require("../database/supabase");
const { scoreLead } = require("../utils/leadScoring");
const { detectTrek } = require("../utils/trekDetector");
const { createPaymentLink } = require("./payment.service");

async function upsertLead(phone, message) {
  console.log("Lead Service Running...");
  console.log("Phone:", phone);
  console.log("Message:", message);

  const leadStatus = scoreLead(message);
  const trekName = detectTrek(message);

  console.log("Lead Status:", leadStatus);
  console.log("Detected Trek:", trekName);

  // Check if lead exists
  const { data: existingLead } = await supabase
    .from("leads")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (existingLead) {
    await supabase
      .from("leads")
      .update({
        last_message: message,
        lead_status: leadStatus,
        trek_name: trekName
      })
      .eq("phone", phone);
  } else {
    await supabase.from("leads").insert([
      {
        phone,
        last_message: message,
        lead_status: leadStatus,
        trek_name: trekName
      }
    ]);
  }

  // Generate payment link ONLY if hot lead + trek detected
  if (leadStatus === "hot" && trekName) {
    const { data: trekData } = await supabase
      .from("treks")
      .select("*")
      .eq("trek_name", trekName)
      .maybeSingle();

    if (!trekData) {
      console.log("Trek not found in DB");
      return null;
    }

    const paymentLink = await createPaymentLink(
      phone,
      trekName,
      trekData.price
    );

    console.log("Payment link generated:", paymentLink);

    return paymentLink;
  }

  return null;
}

module.exports = { upsertLead };