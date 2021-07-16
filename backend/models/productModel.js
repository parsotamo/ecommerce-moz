const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Preencha campo nome"],
      trim: true,
      minlength: [4, "4 caracteres no mínimo"],
      maxlength: [200, "200 caracteres no máximo"],
    },
    image: {
      type: String,
      required: [true, "Produto deve ter pelo menos uma imagem"],
    },
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    image6: String,
    price: {
      type: Number,
      required: [true, "Preencha campo preço"],
      min: [1, "Preço deve ser maior que 0"],
      max: [9999999999, "Não pode exceder 10 dígitos"],
    },
    brand: {
      type: String,
      required: [true, "Preencha campo marca"],
      minlength: [3, "4 caracteres no mínimo"],
      maxlength: [100, "200 caracteres no máximo"],
    },
    description: {
      type: String,
      minlength: [10, "4 caracteres no mínimo"],
      maxlength: [1000, "200 caracteres no máximo"],
    },
    category: {
      type: String,
      required: [true, "Preencha campo categoria"],
      minlength: [3, "4 caracteres no mínimo"],
      maxlength: [100, "200 caracteres no máximo"],
    },
    avgRating: {
      type: Number,
      min: [0, "Não deve ser maior que 0"],
      max: [5, "5 é classificação máxima"],
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next) {
  this.initial = Date.now();
  next();
});

productSchema.post(/^find/, function () {
  console.log(`${Date.now() - this.initial} milisegundos`);
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
