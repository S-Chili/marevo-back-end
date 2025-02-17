const { getDB } = require("../../models/forFavorites");

const getAll = async (req, res) => {
  try {
    // Підключення до колекції contacts
    const favsCollection = await getDB();

    // Отримання всіх контактів з колекції
    const result = await favsCollection.find().toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAll;
