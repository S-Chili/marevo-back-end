const { User, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    console.log(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
