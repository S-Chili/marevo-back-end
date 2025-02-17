const getCurrent = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { firstName, lastName, email } = req.user;

  res.json({
    firstName,
    lastName,
    email,
  });
};

module.exports = getCurrent;
