const { Contact, schemas } = require("../../models/forContacts");

const add = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    console.log(req.body);

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
