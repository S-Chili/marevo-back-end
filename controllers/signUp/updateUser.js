const { getDB, schemas } = require("../../models/user");

const updateUser = async (req, res) => {
  try {
    console.log("req.user:", req.user); // Додано для перевірки

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    const { error } = schemas.updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userId = req.user._id; // Отримуємо ID з токена

    const db = await getDB();
    const updatedUser = await db.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = updateUser;
