const mongoose = require("mongoose");

const app = require("./app");

require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .then(() => console.log("Datebase connected"))
  .catch((error) => {
    console.log("Error connecting to the database:", error.message);
    process.exit(1);
  });
