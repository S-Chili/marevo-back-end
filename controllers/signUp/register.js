const { getDB, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { firstName, lastName, email, password } = req.body;

    // Підключення до колекції users
    const usersCollection = await getDB();

    // Перевірка на наявність користувача з таким email
    const user = await usersCollection.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Хешуємо пароль перед збереженням
    const hashPassword = await bcrypt.hash(password, 10);

    // Додаємо нового користувача
    const result = await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: result.insertedId }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });

    console.log(req.body);
    res.status(201).json({
      _id: result.insertedId,
      firstName,
      lastName,
      email,
      message: "User registered and logged in",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
