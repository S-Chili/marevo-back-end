const Joi = require("joi");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { DB_HOST } = process.env;
const client = new MongoClient(DB_HOST);
const dbName = "marevoData"; // ⚠️ Замініть на назву вашої БД
const collectionName = "subscribes"; // ⚠️ Назва колекції

async function getDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

const addSubscribeSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  getDB,
  schemas: { addSubscribeSchema },
};
