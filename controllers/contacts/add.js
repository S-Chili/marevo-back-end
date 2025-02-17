const { getDB, schemas } = require("../../models/forContacts");

const add = async (req, res, next) => {
  try {
    // Валідація вхідних даних
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { _id } = req.user || {}; // Отримуємо ідентифікатор користувача
    if (!_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Підключення до колекції
    const contactsCollection = await getDB();

    // Додаємо контакт у базу
    const newContact = { ...req.body, owner: _id };
    const result = await contactsCollection.insertOne(newContact);

    // Відповідь клієнту
    res.status(201).json({ _id: result.insertedId, ...newContact });
    console.log("Contact added:", newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
