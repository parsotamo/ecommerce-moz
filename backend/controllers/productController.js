const multer = require("multer");
const sharp = require("sharp");

const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const factory = require("./factoryHandler");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("Formato inválido. Por favor adicione apenas imagem", 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "image5", maxCount: 1 },
]);

exports.resizeProductImages = catchAsyncError(async (req, res, next) => {
  if (!req.files) return next();
  //   if (
  //     (!req.files.image && !req.files.image1) ||
  //     req.files.image2 ||
  //     req.files.image3 ||
  //     req.files.image4 ||
  //     req.files.image5
  //   ) {
  //     return next();
  //   }

  if (req.files.image) {
    req.body.image = `${req.params.id}-main.jpeg`;
    await sharp(req.files.image[0].buffer)
      .resize(700, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(
        `${__dirname}/../../frontend/public/images/products/${req.body.image}`
      );
  }
  if (
    req.files.image1 ||
    req.files.image2 ||
    req.files.image3 ||
    req.files.image4 ||
    req.files.image5
  ) {
    const index = req.body.index;
    req.files.image1
      ? (req.body.image1 = `${req.params.id}-(${Number(index)}).jpeg`)
      : req.files.image2
      ? (req.body.image2 = `${req.params.id}-(${Number(index)}).jpeg`)
      : req.files.image3
      ? (req.body.image3 = `${req.params.id}-(${Number(index)}).jpeg`)
      : req.files.image4
      ? (req.body.image4 = `${req.params.id}-(${Number(index)}).jpeg`)
      : req.files.image5 &&
        (req.body.image5 = `${req.params.id}-(${Number(index)}).jpeg`);

    Object.values({ ...req.files })[0].map(async (file) => {
      const filename = `${req.params.id}-(${Number(index)}).jpeg`;
      await sharp(file.buffer)
        .resize(400, 350)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toFile(
          `${__dirname}/../../frontend/public/images/products/${filename}`
        );
    });
  }
  next();
});

exports.deleteProductReviews = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  const review = await Review.findOne({ product: productId });
  if (!review) return next();
  await Review.deleteMany({ product: productId });

  next();
});

exports.getNewProducts = (req, res, next) => {
  req.query.sort = "-createdAt";
  req.query.limit = 5;
  req.body.skip = true;
  next();
};

exports.getProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
