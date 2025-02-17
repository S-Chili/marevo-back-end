const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const subsRouter = require("./routes/api/subscribes");
const authRouter = require("./routes/api/auth");
const ordersRouter = require("./routes/api/orders");
const favsRouter = require("./routes/api/favs");

const app = express();

// JSON parsing middleware
app.use(express.json());
app.use(cookieParser());

// Logger format based on environment
const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

// Enable CORS for all origins or configure as needed
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Дозволяємо необхідні заголовки
    methods: ["GET", "POST", "PATCH", "DELETE"], // Дозволені методи
  })
);

app.use(express.json({ limit: "5mb" })); // Збільшуємо ліміт JSON
app.use(express.urlencoded({ limit: "5mb", extended: true })); // Для form-data

app.use("/api/contacts", contactsRouter);
app.use("/api/subscribes", subsRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/favorites", favsRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

// General error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
  console.error(err.stack);
});

module.exports = app;
