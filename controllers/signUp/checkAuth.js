require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const checkAuth = async (req, res) => {
  const token = req.cookies.token;
  console.log("Token received:", token); // Це дозволить зрозуміти, чи є токен
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded:", decoded);
    console.log("Headers:", res.getHeaders());
    res.json({ authenticated: true, user: decoded });
  } catch (error) {
    console.error("Error decoding token:", error); // Більше інформації про помилку
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = checkAuth;
