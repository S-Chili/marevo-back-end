const { ObjectId } = require("mongodb");
const { getDB } = require("../../models/forContacts");

const updateById = async (req, res) => {
  const { id: contactId } = req.params;

  try {
    const contactsCollection = await getDB();

    // Оновлення контакту, передаючи тільки потрібні поля
    const result = await contactsCollection.findOneAndUpdate(
      {
        _id: new ObjectId(contactId),
      },
      {
        $set: req.body, // Використовуємо $set для оновлення полів
      },
      { returnDocument: "after" } // Повертає оновлений документ
    );

    if (!result.value) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      message: "Update successful",
      updatedContact: result.value, // Повертаємо оновлений контакт
    });
  } catch (error) {
    console.error("Error fetching contact:", error); // Лог для помилки
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateById;
