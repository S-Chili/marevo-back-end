const { User, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email or password are wrong" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    return res.status(401).json({ message: "Email or password are wrong" });
  }

  const token = "jnfgvnidufvni";

  console.log(req.body, token);
  res.status(201).json(token);
};

module.exports = login;
