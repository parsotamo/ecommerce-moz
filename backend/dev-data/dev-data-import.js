const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const Product = require("../models/productModel");
const User = require("../models/userModel");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console("Database connected successfully!");
  })
  .catch((err) => {
    console.log(err.message);
  });

const importData = async () => {
  try {
    // const data = JSON.parse(fs.readFileSync(`${__dirname}/products.json`));
    // await Product.create(data);

    const data = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));
    await User.create(data, { validateBeforeSave: false });
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    // await Product.deleteMany({});
    await User.deleteMany({});
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
  console.log("Produtos importados com sucesso.");
} else if (process.argv[2] === "--delete") {
  deleteData();
  console.log("Produtos apagados com sucesso.");
}
