const { getDB, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { RequestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const usersCollection = await getDB();
  const user = await usersCollection.findOne({ email });

  if (!user) {
    throw RequestError(401, "Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw RequestError(401, "Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });
  user.token = token;

  // Лог токену перед оновленням в базі
  console.log("Generated token:", token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  // Оновлення токену в базі
  await usersCollection.updateOne({ _id: user._id }, { $set: { token } });

  res.json({ token, user });
};

module.exports = login;
