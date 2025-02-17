const { getDB } = require("../../models/forFavorites");

const getById = async (req, res) => {
  const { id: userID } = req.params;

  try {
    const favsCollection = await getDB();

    // Пошук усіх улюблених елементів цього користувача
    const favs = await favsCollection.find({ userID }).toArray();

    if (!favs.length) {
      return res.status(404).json({ message: "Favorites not found" });
    }

    res.json(favs); // Повертаємо список улюблених елементів
  } catch (error) {
    console.error("Error fetching favs:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getById;
