const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const factory = require("./factoryHandler");

const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowed.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.getMe = catchAsyncError(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.updateMe = catchAsyncError(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email", "password");
  if (req.file) filteredBody.photo = req.body.photo;
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  const token = signJWT(user._id);
  res.status(200).json({
    status: "success",
    data: user,
    token,
  });
});

exports.deleteUserReviews = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findOne({ user: userId });
  if (!user) return next();
  await User.deleteMany({ user: userId });

  next();
});

exports.deleteMe = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: "success",
    message: "Apagado com sucesso",
  });
});

exports.getUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

// Upload User photo
const multerStorage = multer.memoryStorage();

const filterMulter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Ficheiro carregado não é inválido. Por favor faça upload apenas de fotos",
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filterMulter,
});

const gc = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
});

const myBucket = gc.bucket(process.env.GOOGLE_CLOUD_BUCKET);
myBucket.setMetadata(
  {
    lifecycle: null,
  },
  function (err, apiResponse) {}
);
exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `${req.user.email.split(".")[0]}-${req.user._id}.jpeg`;

  const blob = myBucket.file(req.file.filename);

  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      cacheControl: "private, max-age=0",
    },
  });

  blobStream.on("error", (err) => console.log(err));
  const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET}/${req.file.filename}`;
  req.body.photo = publicUrl;
  blobStream.on("finish", () => {});
  const imageBuffer = await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();

  blobStream.end(imageBuffer);

  next();
});

// End Upload User Photo
