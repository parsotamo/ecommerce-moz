import { combineReducers } from "redux";

import {
  newProductsReducer,
  productsReducer,
  productReducer,
  productReviewsReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
  productCreateReviewReducer,
} from "./productReducer";

import { cartReducer } from "./cartReducers";

import {
  createOrderReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderDeliverReducer,
  userOrdersReducer,
} from "./orderReducers";

import {
  usersReducer,
  userReducer,
  userReviewsReducer,
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userChatsReducer,
  newChatContentReducer,
} from "./userReducers";

import { reviewsUsersReducer } from "./reviewReducers";

export default combineReducers({
  newProducts: newProductsReducer,
  products: productsReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  productCreate: productCreateReducer,
  productCreateReview: productCreateReviewReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,

  cart: cartReducer,

  orderList: orderListReducer,
  orderCreate: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,

  userList: usersReducer,
  user: userReducer,
  userReviews: userReviewsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userOrders: userOrdersReducer,
  userDelete: userDeleteReducer,

  reviewsUsers: reviewsUsersReducer,

  userChats: userChatsReducer,
  newChatContent: newChatContentReducer,
});
