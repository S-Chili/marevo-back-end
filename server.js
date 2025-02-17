const { MongoClient, ServerApiVersion } = require("mongodb");
const app = require("./app"); // Додаємо app
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

const client = new MongoClient(DB_HOST, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Успішно підключено до MongoDB!");

    // Перевіряємо статус підключення
    const admin = client.db().admin();
    const status = await admin.serverStatus();
    console.log(
      "📡 Статус MongoDB:",
      status.ok ? "OK" : "❌ Проблема з підключенням"
    );

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Помилка підключення:", error);
    process.exit(1);
  }
}

connectDB();

// Закриття підключення при завершенні процесу
process.on("SIGINT", async () => {
  await client.close();
  console.log("🔌 Підключення до MongoDB закрито.");
  process.exit(0);
});
