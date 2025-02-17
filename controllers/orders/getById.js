const { getDB } = require("../../models/forOrders");

const getById = async (req, res) => {
  const { id: userID } = req.params; // Це рядок

  try {
    const ordersCollection = await getDB();

    // Шукай всі замовлення цього користувача
    const orders = await ordersCollection.find({ userID }).toArray();

    if (!orders.length) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getById;
