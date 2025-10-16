const { getDB, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../sendEmail");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { firstName, lastName, email, password } = req.body;

    const usersCollection = await getDB();

    // Перевірка, чи є користувач з таким email
    const user = await usersCollection.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Хешування пароля
    const hashPassword = await bcrypt.hash(password, 10);

    // Додаємо користувача
    const result = await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const userId = result.insertedId.toString();

    const token = jwt.sign({ id: result.insertedId.toString() }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    // Відправка вітального email (не блокує реєстрацію при помилці)
    try {
      await sendEmail(email, `Hello ${firstName}, welcome to our platform!`);
      console.log(`✅ Email sent to ${email}`);
    } catch (err) {
      console.error("❌ Error sending email:", err.response?.body || err);
    }

    // Відповідь без токена (бо він у cookie)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: userId,
        firstName,
        lastName,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
