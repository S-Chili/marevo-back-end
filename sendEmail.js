const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config(); // Завантажуємо змінні середовища

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // API-ключ з .env

const sendEmail = async (to, subject, text, html) => {
  try {
    const msg = {
      to, // Email отримувача
      from: process.env.SENDGRID_SENDER_EMAIL, // Ваш верифікований email у SendGrid
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.body || error);
  }
};

module.exports = sendEmail;
