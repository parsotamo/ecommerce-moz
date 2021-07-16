const express = require("express");

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.get("/users", reviewController.getReviewsUsers);

router
  .route("/")
  .get(reviewController.getReviews)
  .post(
    authController.protect,
    reviewController.setProductAndUserIds,
    reviewController.createReview
  );

router.use(authController.protect);
router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
