const express = require("express");

const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.get("/my", orderController.setUserIdToParams, orderController.getOrders);
router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder);
router.route("/:id").get(orderController.getOrder);
router.route("/:id").delete(orderController.deleteOrder);
router.route("/:id/pay_mpesa").post(orderController.pay_mpesa);
router.route("/:id/pay").patch(orderController.updateOrderToPaid);
router.route("/:id/deliver").patch(orderController.updateOrderToDelivered);

module.exports = router;
