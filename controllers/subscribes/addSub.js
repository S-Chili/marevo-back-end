const { getDB, schemas } = require("../../models/forSubscribes");

const addSub = async (req, res, next) => {
  try {
    const { error } = schemas.addSubscribeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const db = await getDB();
    const result = await db.insertOne({
      email: req.body.email,
      subscribedAt: new Date(),
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { addSub };
