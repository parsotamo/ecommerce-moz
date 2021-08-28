const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Preencha campo usuário"],
  },
  orderItems: [
    {
      name: { type: String, required: [true, "Preencha este campo"] },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Preencha este campo"],
      },
      qty: { type: Number, default: 0 },
      price: { type: Number, required: [true, "Preencha este campo"] },
      image: { type: String, required: [true, "Preencha este campo"] },
    },
  ],
  shippingAddress: {
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  paymentMethod: {
    type: String,
    maxlength: [200, "200 caracteres é o máximo"],
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  taxPrice: {
    type: Number,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: [true, "Preencha este campo"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
