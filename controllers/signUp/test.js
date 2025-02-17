const checkAuth = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // Перевіряємо токен (наприклад, через jwt.verify)
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    res.json({ authenticated: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
