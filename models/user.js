const Joi = require("joi");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { DB_HOST } = process.env;
const client = new MongoClient(DB_HOST);
const dbName = "marevoData"; // Назва бази даних
const collectionName = "users"; // Назва колекції

async function getDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

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

const updateUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  gender: Joi.string().valid("male", "female", "other"),
  dateOfBirth: Joi.string(), // або `.isoDate()` якщо ISO 8601
  country: Joi.string(),
  city: Joi.string(),
  avatarUrl: Joi.object(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateUserSchema, // ✅ Додали нову схему
};

module.exports = {
  getDB,
  schemas,
};
