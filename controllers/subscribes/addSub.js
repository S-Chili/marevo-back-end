const { Subscribe, schemas } = require("../../models/forSubscribes");

const addSub = async (req, res, next) => {
  try {
    const { error } = schemas.addSubscribeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await Subscribe.create({ email: req.body.email });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { addSub };
