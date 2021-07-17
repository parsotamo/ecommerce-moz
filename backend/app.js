const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

dotenv.config({ path: "config.env" });

const AppError = require("./utils/AppError");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// app.use(helmet());
// app.use(
//   "/api",
//   rateLimit({
//     max: 500,
//     windowMs: 60 * 60 * 1000,
//     message: "Too many requests from this IP. Try again in an hour.",
//   })
// );
// app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// app.use(mongoSanitize());
// app.use(xss());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res, next) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
const mydir = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(mydir, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(mydir, "frontend", "build", "index.html"));
  });
} else {
  app.use(express.static("./public"));
}

app.all("*", (req, res, next) => {
  next(
    new AppError(`A rota "${req.originalUrl}" não existe neste servidor`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
