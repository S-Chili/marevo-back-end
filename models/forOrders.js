const Joi = require("joi");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { DB_HOST } = process.env;
const client = new MongoClient(DB_HOST);
const dbName = "marevoData"; // ⚠️ Замініть на назву вашої БД
const collectionName = "orders"; // ⚠️ Назва колекції

async function getDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

const addOrdersSchema = Joi.object({
  userID: Joi.string().required(),
  name: Joi.string().min(3).required(),
  phone: Joi.number().required(),
  bouquetTite: Joi.string().required(),
  bouquetPrice: Joi.number().required(),
  bouquetImg: Joi.string().required(),
});

module.exports = {
  getDB,
  schemas: { addOrdersSchema },
};
