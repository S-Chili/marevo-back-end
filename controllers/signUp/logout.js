const { getDB } = require("../../models/user");

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({
      message: "Logout success",
    });
  } catch (error) {
    console.error("Помилка при виході:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = logout;
