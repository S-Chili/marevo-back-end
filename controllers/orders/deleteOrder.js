const { ObjectId } = require("mongodb");
const { getDB } = require("../../models/forOrders");

const removeById = async (req, res) => {
  const { id: orderId } = req.params;

  try {
    const ordersCollection = await getDB();

    const result = await ordersCollection.findOneAndDelete({
      _id: new ObjectId(orderId),
    });

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      message: "Delete successful",
    });
  } catch (error) {
    console.error("Error fetching order:", error); // Лог для помилки
    res.status(500).json({ message: error.message });
  }
};

module.exports = removeById;
