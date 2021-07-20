const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Preencha nome"],
    trim: true,
    minlength: [4, "4 caracteres é o mínimo"],
    maxlength: [200, "200 caracteres é máximo"],
  },
  email: {
    type: String,
    required: [true, "Preencha email"],
    unique: [true, "este endereço de email já foi usado"],
    validate: [validator.isEmail, "email não é válido, tente novamente"],
  },
  photo: {
    type: String,
    default: "https://storage.googleapis.com/comercio-moz/default.jpg",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: [true, "preencha senha"],
    minlength: [8, "Senha deve ter 8 caracteres no mínimo"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "preencha confirmação de senha"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Senhas não são iguais",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const passwordChanged = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return tokenIssuedAt < passwordChanged;
  }
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
