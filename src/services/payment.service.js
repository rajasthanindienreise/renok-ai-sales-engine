const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createPaymentLink(phone, trekName, amount) {
  try {
    const paymentLink = await razorpay.paymentLink.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      description: `Booking for ${trekName}`,
      customer: {
        contact: phone
      },
      notify: {
        sms: true,
        email: false
      }
    });

    return paymentLink.short_url;

  } catch (error) {
    console.log("Razorpay Error:", error);
    return null;
  }
}

module.exports = { createPaymentLink };