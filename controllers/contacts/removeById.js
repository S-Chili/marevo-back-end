// я просто залишаю це тут, як приклад успішного методу) 

const { Contact } = require("../../models/forContacts");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({
    message: "Delete successful",
  });
};

module.exports = removeById;
