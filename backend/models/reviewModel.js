const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      required: [true, "Preecha campo comentário"],
    },
    rating: {
      type: Number,
      min: [1.0, "1 é classificação mínima"],
      max: [5.0, "5 é classificação máxima"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Preencha este campo"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Preencha este campo"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calcReviewsAvgProduct = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        numReviews: { $sum: 1 },
        avgRatings: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        avgRating: stats[0].avgRatings,
        numReviews: stats[0].numReviews,
      },
      { returnOriginal: false }
    );
  } else {
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        // ratingsAverage: 4.5,
        ratingsQuantity: 0,
      },
      { returnOriginal: false }
    );
  }
};
reviewSchema.post("save", async function () {
  await this.constructor.calcReviewsAvgProduct(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcReviewsAvgProduct(this.r.product);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
