const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.number().required(),
});

const Contact = model("contact", contactsSchema);

const schemas = {
  addSchema,
};

module.exports = {
  Contact,
  schemas,
};
