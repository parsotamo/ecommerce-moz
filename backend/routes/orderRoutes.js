const express = require("express");

const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder);
router.route("/:id").get(orderController.getOrder);
router.route("/:id/pay").patch(orderController.updateOrderToPaid);
router.route("/:id/deliver").patch(orderController.updateOrderToDelivered);

router.get("/", orderController.setUserIdToParams, orderController.getOrders);

module.exports = router;
