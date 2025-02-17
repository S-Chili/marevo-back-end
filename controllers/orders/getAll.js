const { getDB } = require("../../models/forOrders");

const getAll = async (req, res) => {
  try {
    // Підключення до колекції contacts
    const ordersCollection = await getDB();

    // Отримання всіх контактів з колекції
    const result = await ordersCollection.find().toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAll;
