const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function createPaymentLink(phone, trekName, amount) {
  try {
    const payment = await razorpay.paymentLink.create({
      amount: amount * 100,
      currency: "INR",
      description: `Booking for ${trekName}`,
      customer: {
        name: "Renok Customer",
        contact: phone
      },
      notify: {
        sms: true,
        email: false
      }
    });

    return payment.short_url;
  } catch (error) {
    console.error("Payment Link Error:", error);
    return null;
  }
}

module.exports = { createPaymentLink };