const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');
const mongoose = require('mongoose');

const Product = require('../models/productModel');
const { Category, SubCategory } = require('../models/categoryModel');
const Review = require('../models/reviewModel');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');
const factory = require('./factoryHandler');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Formato inválido. Por favor adicione apenas imagem', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.single('image');
exports.resizeProductImage = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();
  let publicUrl, imgResized;
  if (req.file) {
    publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/products/${req.body.filename}`;

    imgResized = await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();
  }
  req.body.image = publicUrl;
  req.body.imgResized = imgResized;

  next();
});
exports.resizeCreateProductImages = catchAsyncError(async (req, res, next) => {
  if (!req.files.image || !req.files.images) return next();
  let _id = crypto.randomBytes(12).toString('hex');
  mongoose.Types.ObjectId(_id);
  let publicUrl, imageResized;
  const names = [];
  if (req.files.image) {
    publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/products/${_id}-main.jpeg`;

    imageResized = await sharp(req.files.image[0].buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();
  }
  if (req.files.images) {
    req.files.images.map((_, ind) => {
      names.push(
        `https://${process.env.AWS_BUCKET_NAME}.s3.${
          process.env.AWS_BUCKET_REGION
        }.amazonaws.com/products/${_id}-(${ind + 1}).jpeg`
      );
    });
  }
  req.body._id = _id;
  req.body.image = publicUrl;
  req.body.images = names;
  req.body.imageResized = imageResized;

  next();
});
exports.createProductImages = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 5 },
]);
exports.uploadProductImages = upload.array('images', 5);

exports.getNameUploadProductImages = catchAsyncError(async (req, res, next) => {
  if (req.files.length === 0) return next();
  const filenames = [];
  const indexes = [];
  const publicUrl = [];
  let elePos;
  let splittedImages = req.body.prodImages.split(',');
  splittedImages = splittedImages ? splittedImages : [req.body.prodImages];

  req.files.map((el) => {
    elePos = splittedImages.indexOf('');
    if (elePos === 0) {
      indexes.push(0);
      filenames.push(`${req.params.id}-(1).jpeg`);
      publicUrl.push(
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/products/${filenames[0]}`
      );
      splittedImages[0] = publicUrl[0];
    } else if (elePos >= 0) {
      indexes.push(elePos);
      filenames.push(`${req.params.id}-(${elePos + 1}).jpeg`);
      splittedImages[elePos] = `https://${process.env.AWS_BUCKET_NAME}.s3.${
        process.env.AWS_BUCKET_REGION
      }.amazonaws.com/products/${req.params.id}-(${elePos + 1}).jpeg`;
    } else {
      elePos = splittedImages.length;
      indexes.push(splittedImages.length);
      filenames.push(`${req.params.id}-(${elePos + 1}).jpeg`);
      splittedImages[elePos] = `https://${process.env.AWS_BUCKET_NAME}.s3.${
        process.env.AWS_BUCKET_REGION
      }.amazonaws.com/products/${req.params.id}-(${elePos + 1}).jpeg`;
    }
  });

  req.body.indexes = indexes;
  req.body.filenames = filenames;
  req.body.publicUrl = publicUrl;
  req.body.splittedImages = splittedImages;

  next();
});

exports.getNameUpdateProductImage = catchAsyncError(async (req, res, next) => {
  if (!req.files) return next();
  req.body.filename = `${req.params.id}-(${Number(req.body.index) + 1}).jpeg`;
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
  req.query.sort = '-createdAt';
  next();
};
exports.getHotProducts = (req, res, next) => {
  req.query.hot = true;
  next();
};
exports.getPopularProducts = (req, res, next) => {
  req.query.sort = '-views';
  next();
};
exports.getProductsCategory = (req, res, next) => {
  req.query.category = req.params.categoryId;
  next();
};

exports.getCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: categories,
  });
});

exports.getSubCategories = catchAsyncError(async (req, res, next) => {
  const categories = await SubCategory.find();

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: categories,
  });
});

exports.createCategory = catchAsyncError(async (req, res, next) => {
  const category = await SubCategory.create(req.body);

  res.status(200).json({
    status: 'success',
    data: category,
  });
});

exports.setUserIdToParams = (req, res, next) => {
  if (!req.params.userId) req.params.userId = req.user.id;

  next();
};

exports.incrementViews = catchAsyncError(async (req, res, next) => {
  await Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
  });
});

exports.incrementPhoneNumberViews = catchAsyncError(async (req, res, next) => {
  await Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { phoneNumberViews: 1 } },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
  });
});

exports.getProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.newImages = factory.updateArray(Product);
exports.updateImage = factory.updateArraySingle(Product);
exports.deleteImage = factory.deleteFromArray(Product);
