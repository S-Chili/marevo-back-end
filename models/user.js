const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const usersSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", usersSchema);

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  schemas,
};
