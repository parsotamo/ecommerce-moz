const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');
const productRouter = require('./productRoutes');
const orderRouter = require('./orderRoutes');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:resetToken', authController.resetPassword);

router.use('/products', productRouter);
router.use('/orders', orderRouter);

router
  .get('/users-online', chatController.checkUsersOnline)
  .get('/is-offline/:userId', chatController.checkIsOffline)
  .get('/is-online/:userId', chatController.checkIsOnline);

router.use(authController.protect);

router.post('/update-password', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.deleteUserPhotoAWS,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete(
  '/deleteMe',
  userController.deleteUserReviews,
  userController.deleteMe
);

router
  .route('/chat/:userId?')
  .get(chatController.getUserChat)
  .post(chatController.uploadChatContent);

router.post(
  '/upload-chat-image',
  chatController.uploadUserMsgImage,
  chatController.resizeUserMsgImage,
  chatController.uploadChatContent
);

router.post(
  '/upload-voice',
  chatController.uploadAudio,
  chatController.uploadChatContent
);

router
  .route('/')
  .get(userController.getUsers)
  .post(authController.restrictTo('admin'), userController.createUser);
router.route('/:id').get(userController.getUser);

router.use(authController.restrictTo('admin'));
router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUserReviews, userController.deleteUser);

module.exports = router;
