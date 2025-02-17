const { getDB, schemas } = require("../../models/forOrders");

const addOrder = async (req, res, next) => {
  try {
    const { error } = schemas.addOrdersSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const db = await getDB();
    const result = await db.insertOne({
      ...req.body,
      orderedAt: new Date(),
    });
    console.log(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addOrder;
