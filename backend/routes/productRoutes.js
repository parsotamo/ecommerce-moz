const express = require('express');

const productController = require('../controllers/productController');
const awsController = require('../controllers/awsController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(productController.getProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    productController.createProductImages,
    productController.resizeCreateProductImages,
    awsController.createProducImagesAWS,
    productController.createProduct
  );

router
  .route('/category/:categoryName/:categoryId')
  .get(productController.getProductsCategory, productController.getProducts);

router
  .route('/categories')
  .get(productController.getCategories)
  .post(productController.createCategory);

router.route('/subcategories').get(productController.getSubCategories);

router.get(
  '/new',
  productController.getNewProducts,
  productController.getProducts
);
router.get(
  '/popular',
  productController.getPopularProducts,
  productController.getProducts
);
router.get(
  '/hot',
  productController.getHotProducts,
  productController.getProducts
);
router.get(
  '/my',
  authController.protect,
  productController.setUserIdToParams,
  productController.getProducts
);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    productController.uploadProductImage,
    productController.resizeProductImage,
    awsController.uploadProducImageAWS,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    productController.deleteProductReviews,
    awsController.deleteProductImagesAWS,
    productController.deleteProduct
  );

router.get('/:id/incrementViews', productController.incrementViews);
router.get(
  '/:id/incrementPhoneNumberViews',
  productController.incrementPhoneNumberViews
);

router
  .route('/:id/upload')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    productController.uploadProductImages,
    productController.getNameUploadProductImages,
    awsController.uploadProducImagesAWS,
    productController.newImages
  );

router
  .route('/:id/update')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    productController.uploadProductImage,
    productController.resizeProductImage,
    awsController.uploadProducImageAWS,
    productController.updateImage
  );
router
  .route('/:id/delete')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    awsController.deleteProductImageAWS,
    productController.deleteImage
  );

router.use('/:productId/reviews', reviewRouter);

module.exports = router;
