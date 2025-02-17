const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { getDB } = require("../models/user");
const { RequestError } = require("../helpers");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  console.log("Cookies:", req.cookies); // Перевірка, що є cookies

  try {
    const token = req.cookies.token; // Якщо токен зберігається в cookies
    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "Unauthorized user (no token)" });
    }

    const { id } = jwt.verify(token, SECRET_KEY); // Декодуємо токен

    // Перетворюємо ID на ObjectId за допомогою MongoDB
    const objectId = new ObjectId(id);

    // Підключення до колекції users
    const usersCollection = await getDB();
    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      throw RequestError(401, "Unauthorized user (user not found)");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error); // Лог помилки
    if (!error.status) {
      error.status = 401;
      error.message = "Unauthorized user";
    }
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = authenticate;
