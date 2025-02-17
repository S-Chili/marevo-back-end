const fs = require("fs").promises;
const path = require("path");
const { getDB } = require("../../models/user");

const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user._id;
    const db = await getDB();

    // Отримуємо поточний аватар користувача
    const user = await db.findOne({ _id: userId });

    if (user?.avatar) {
      const oldAvatarPath = path.join(
        __dirname,
        "../../uploads",
        path.basename(user.avatar)
      );
      try {
        await fs.unlink(oldAvatarPath);
        console.log("Старий аватар видалено:", oldAvatarPath);
      } catch (err) {
        console.warn("Не вдалося видалити старий аватар:", err.message);
      }
    }

    // Зберігаємо новий аватар
    const avatarUrl = `/uploads/${req.file.filename}`;
    await db.updateOne({ _id: userId }, { $set: { avatar: avatarUrl } });

    res.json({ success: true, avatarUrl });
  } catch (error) {
    console.error("Помилка при оновленні аватара:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = updateAvatar;
