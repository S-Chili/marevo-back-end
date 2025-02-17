const Joi = require("joi");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { DB_HOST } = process.env;
const client = new MongoClient(DB_HOST);
const dbName = "marevoData"; // ⚠️ Замініть на назву вашої БД
const collectionName = "favs"; // ⚠️ Назва колекції

async function getDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

const addFavsSchema = Joi.object({
  userID: Joi.string().required(),
  bouquetTitle: Joi.string().required(),
  bouquetPrice: Joi.number().required(),
  bouquetImg: Joi.string().required(),
});

module.exports = {
  getDB,
  schemas: { addFavsSchema },
};
