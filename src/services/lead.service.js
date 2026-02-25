const supabase = require("../database/supabase");
const { scoreLead } = require("../utils/leadScoring");
const { detectTrek } = require("../utils/trekDetector");
const { createPaymentLink } = require("./payment.service");

async function upsertLead(phone, message) {

  const leadStatus = scoreLead(message);
  const trekName = detectTrek(message);

  // Check if lead already exists
  const { data: existingLead, error: selectError } = await supabase
    .from("leads")
    .select("*")
    .eq("phone", phone)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    console.log("Select Error:", selectError);
  }

  // If HOT lead → Generate payment link
  let paymentLink = null;

  if (leadStatus === "hot" && trekName) {

  console.log("Detected Trek:", trekName);   // 👈 ADD THIS LINE

  const { data: trekDataArray, error: trekError } = await supabase
    .from("treks")
    .select("*")
    .eq("trek_name", trekName);

if (trekError) {
  console.log("Trek Fetch Error:", trekError);
}

const trekData = trekDataArray && trekDataArray.length > 0
  ? trekDataArray[0]
  : null;

    if (trekError) {
      console.log("Trek Fetch Error:", trekError);
    }

    if (trekData) {
      paymentLink = await createPaymentLink(
        phone,
        trekName,
        trekData.base_price
      );

      console.log("Payment Link:", paymentLink);
    }
  }

  // Update existing lead
  if (existingLead) {

    const { error: updateError } = await supabase
      .from("leads")
      .update({
        last_message: message,
        lead_status: leadStatus,
        trek_name: trekName
      })
      .eq("phone", phone);

    if (updateError) {
      console.log("Update Error:", updateError);
    }

  } else {

    // Insert new lead
    const { error: insertError } = await supabase
      .from("leads")
      .insert([
        {
          phone,
          name: "Unknown",
          last_message: message,
          lead_status: leadStatus,
          trek_name: trekName
        }
      ]);

    if (insertError) {
      console.log("Insert Error:", insertError);
    }
  }

  return paymentLink; // important for future WhatsApp reply
}

module.exports = { upsertLead };