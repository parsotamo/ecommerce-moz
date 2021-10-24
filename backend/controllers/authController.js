const { promisify } = require('util');
const crypto = require('crypto');

const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const Email = require('../utils/Email');
const io = require('../socket');

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsyncError(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    whatsAppNumber: req.body.whatsAppNumber,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // await new Email(user, `${req.protocol}://${req.get("host")}`).sendWelcome();
  const token = signJWT(user._id);

  // io.getIO().emit("auth", {
  //   action: "new-user",
  //   msg: `Usuário chamado ${user.name} acaba de cadastrar-se`,
  // });

  res.status(201).json({
    status: 'success',
    token,
    data: user,
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(`Preencha os campo(s) em falta`, 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('email ou password incorrecto', 400));
  }
  const token = signJWT(user._id);
  res.status(200).json({
    status: 'success',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
      token,
    },
  });
});

exports.protect = catchAsyncError(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new AppError('Você não está autenticado. Faça o login.', 401));
  }
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError('Token inválido! Usuário não existe', 401));
  }
  if (user.passwordChangedAfter(decoded.iat)) {
    return next(new AppError('Token inválido faça o login de novo', 401));
  }
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Não tem permissão para aceder está página', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('Usuário com este email não existe', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const message = `Para fazer a recuperação da sua conta, clique neste link ${
    req.protocol
  }://${res.get('host')}/api/users/forgot-password/${resetToken}`;

  try {
    await sendMail({ email, message });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: 'success',
    message: 'Email para fazer o reset enviado com sucesso',
  });
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const hashToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetTokenExpires: Date.now(),
  });
  if (!user) {
    return next(new AppError('Reset token inválido ou expirou', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.save();

  const token = signJWT(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, password, passwordConfirm } = req.body;

  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    return next(new AppError('Faça o login para aceder a esta página', 401));
  }
  if (!(await user.correctPassword(oldPassword, user.password))) {
    return next(new AppError('Senha incorrecta', 400));
  }
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.save();

  res.status(200).json({
    status: 'success',
    message: 'Senha actualizada com sucesso',
  });
});
