const Order = require("../models/orderModel");
const catchAsyncError = require("../utils/catchAsyncError");
const factory = require('./factoryHandler');

exports.setUserIdToParams = (req, res, next)=>{
    if (!req.params.userId) req.params.userId = req.user.id;
    next();
}

exports.updateOrderToPaid = catchAsyncError( async(req, res, next)=>{
    const order = await Order.findById(req.params.id);
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    }
    const updatedOrder = await order.save();

    res.status(200).json({
        status: "success",
        data: updatedOrder
    });
});

exports.updateOrderToDelivered = catchAsyncError( async(req, res, next)=>{
    const order = await Order.findById(req.params.id);
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    res.status(200).json({
        status: "success",
        data: updatedOrder
    });
});


exports.getOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.createOrder = factory.createOne(Order);
