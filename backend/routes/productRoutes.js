const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(productController.getProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productController.createProduct
  );

router.get(
  "/new",
  productController.getNewProducts,
  productController.getProducts
);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProductReviews,
    productController.deleteProduct
  );

router.use("/:productId/reviews", reviewRouter);

module.exports = router;
