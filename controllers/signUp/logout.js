const { getDB } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;

  // Підключення до колекції users
  const usersCollection = await getDB();

  // Оновлення користувача і очищення токена
  await usersCollection.updateOne({ _id }, { $set: { token: "" } });

  res.clearCookie("token", {
    httpOnly: true, // Токен можна зчитати тільки через HTTP запити
    secure: process.env.NODE_ENV === "production", // Якщо ви в продакшн, то потрібно HTTPS
    sameSite: "Strict", // Запобігає відправці cookies з інших сайтів
  });

  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
