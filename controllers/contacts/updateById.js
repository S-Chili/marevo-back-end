// я просто залишаю це тут, як приклад успішного методу)

const { Contact } = require("../../models/forContacts");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({
    message: "Update successful",
  });
};

module.exports = updateById;
