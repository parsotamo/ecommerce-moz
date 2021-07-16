const Review = require("../models/reviewModel");
const catchAsyncError = require("../utils/catchAsyncError");
const factory = require("./factoryHandler");

exports.setProductAndUserIds = (req, res, next)=>{
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getReviewsUsers = catchAsyncError( async(req, res, next)=>{

    req.query.sort = "-rating";
    req.query.limit = 12;
    const reviews = await Review.find().sort(req.query.sort).limit(req.query.limit).populate({ path: "product", select: "name avgRating numReviews" });

    res.status(200).json({
        status: "success",
        data: reviews
    })
})

exports.getReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
