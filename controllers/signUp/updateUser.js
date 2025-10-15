const { getDB, schemas } = require("../../models/user");
const { ObjectId } = require("mongodb");

const updateUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    const { error } = schemas.updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userId = new ObjectId(req.user._id);
    const db = await getDB();
    const updatedUser = await db.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!updatedUser.value) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Return a consistent JSON object for success
    res.json({ message: "User updated successfully", user: updatedUser.value });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = updateUser;
