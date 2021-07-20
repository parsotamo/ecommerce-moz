const multer = require("multer");
const sharp = require("sharp");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const factory = require("./factoryHandler");

const mydir = path.resolve();

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

const gc = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
});

const myBucket = gc.bucket(process.env.GOOGLE_CLOUD_BUCKET);

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

  if (req.files.image) {
    const blob = myBucket.file(`${req.params.id}-main.jpeg`);

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        cacheControl: "no-cache",
      },
    });

    blobStream.on("error", (err) => console.log(err));
    const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET}/${req.params.id}-main.jpeg`;

    req.body.image = publicUrl;

    blobStream.on("finish", () => {});
    const imageBuffer = await sharp(req.files.image[0].buffer)
      .resize(300, 300)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();
    blobStream.end(imageBuffer);
  }
  if (
    req.files.image1 ||
    req.files.image2 ||
    req.files.image3 ||
    req.files.image4 ||
    req.files.image5
  ) {
    const index = req.body.index;
    const filename = `${req.params.id}-(${Number(index)}).jpeg`;

    const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET}/${filename}`;

    req.files.image1
      ? (req.body.image1 = publicUrl)
      : req.files.image2
      ? (req.body.image2 = publicUrl)
      : req.files.image3
      ? (req.body.image3 = publicUrl)
      : req.files.image4
      ? (req.body.image4 = publicUrl)
      : req.files.image5 && (req.body.image5 = publicUrl);

    Object.values({ ...req.files })[0].map(async (file) => {
      const blob = myBucket.file(filename);

      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          cacheControl: "no-cache",
        },
      });
      blobStream.on("error", (err) => console.log(err));

      blobStream.on("finish", () => {});
      const imageBuffer = await sharp(file.buffer)
        .resize(400, 350)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toBuffer();
      blobStream.end(imageBuffer);
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
