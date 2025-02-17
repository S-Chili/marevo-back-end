const { ObjectId } = require("mongodb");
const { getDB } = require("../../models/forContacts");

const getById = async (req, res) => {
  const { id: contactId } = req.params;

  console.log("Received ID:", contactId); // Лог для перевірки ID

  try {
    const contactsCollection = await getDB();

    const result = await contactsCollection.findOne({
      _id: new ObjectId(contactId),
    });

    if (!result) {
      console.log("Contact not found with ID:", contactId); // Лог, якщо контакт не знайдений
      return res.status(404).json({ message: "Not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching contact:", error); // Лог для помилки
    res.status(500).json({ message: error.message });
  }
};

module.exports = getById;
