const { Schema, model } = require("mongoose");
const Joi = require("joi");

const subscribesSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const addSubscribeSchema = Joi.object({
  email: Joi.string().email().required(),
});

const Subscribe = model("subscribe", subscribesSchema);

const schemas = {
  addSubscribeSchema,
};

module.exports = {
  Subscribe,
  schemas,
};
