const { ObjectId } = require("mongodb");
const { getDB } = require("../../models/forFavorites");

const removeById = async (req, res) => {
  const { id: favId } = req.params;

  try {
    const favsCollection = await getDB();

    const result = await favsCollection.findOneAndDelete({
      _id: new ObjectId(favId),
    });

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      message: "Delete successful",
    });
  } catch (error) {
    console.error("Error fetching fav:", error); // Лог для помилки
    res.status(500).json({ message: error.message });
  }
};

module.exports = removeById;
