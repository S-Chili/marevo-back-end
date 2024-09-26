const { Contact } = require("../../models/forContacts");

const getAll = async (req, res) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAll;
