const multer = require("multer");
const sharp = require("sharp");

const Chat = require("../models/chatModel");
const Conversation = require("../models/conversationModel");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const factory = require("./factoryHandler");
const heartbeat = require("../models/heartbeat");
// Upload User Message Image
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
const uploadMsgImage = multer({
  storage: multerStorage,
  fileFilter: filterMulter,
});
exports.uploadUserMsgImage = uploadMsgImage.single("image");

exports.resizeUserMsgImage = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(100, 150)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(
      `${__dirname}/../../frontend/public/chat/images/${req.file.filename}`
    );
  req.body.image = req.file.filename;
  next();
});

// End Upload User Message Image

// Upload User voice
const audioMulterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../frontend/public/chat/audio/`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const username = req.user.name.split(" ").join("_");
    req.body.voice = `${username}-${Date.now()}.${ext}`;
    cb(null, `${username}-${Date.now()}.${ext}`);
  },
});

const audioUpload = multer({
  storage: audioMulterStorage,
});

exports.uploadAudio = audioUpload.single("voice");

// End Upload User voice

exports.getUserChat = catchAsyncError(async (req, res, next) => {
  let userChat;
  let conversation = await Conversation.findOne({
    users: { $all: [req.user.id, req.params.userId] },
  });
  if (conversation) {
    userChat = await Chat.find({ conversation: conversation._id });
  } else {
    conversation = await Conversation.create({
      users: [req.user.id, req.params.userId],
    });
    userChat = await Chat.find({ conversation: conversation._id });
  }
  res.status(200).json({
    data: userChat,
    conversationId: conversation._id,
  });
});

exports.checkIsOffline = catchAsyncError(async (req, res, next) => {
  heartbeat.getUserInfoState("CM:USER:OFF", req.params.userId, (e, r) => {
    res.status(200).send(r ? r : false);
  });
});
exports.checkIsOnline = catchAsyncError(async (req, res, next) => {
  heartbeat.getUserInfoState("CM:USER:ON", req.params.userId, (e, r) => {
    res.status(200).send(r ? r : false);
  });
});
exports.checkUsersOnline = catchAsyncError(async (req, res, next) => {
  heartbeat.getUsersInfoState("CM:USER:ON", (e, r) => {
    res.status(200).send(r ? r : false);
  });
});
exports.uploadChatContent = factory.createOne(Chat);
