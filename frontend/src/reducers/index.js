import { combineReducers } from 'redux';

import {
  newProductsReducer,
  hotProductsReducer,
  productsReducer,
  popularProductsReducer,
  userProductsReducer,
  productsCategoryReducer,
  relatedProductsReducer,
  categoriesReducer,
  subCategoriesReducer,
  categoryCreateReducer,
  productReducer,
  productReviewsReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  uploadProductImageReducer,
  uploadProductImagesReducer,
  updateProductImageReducer,
  deleteProductImageReducer,
} from './productReducer';

import { cartReducer } from './cartReducers';

import {
  createOrderReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderPayMpesaReducer,
  orderDeliverReducer,
  userOrdersReducer,
} from './orderReducers';

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
} from './userReducers';

import { reviewsUsersReducer } from './reviewReducers';

export default combineReducers({
  newProducts: newProductsReducer,
  hotProducts: hotProductsReducer,
  popularProducts: popularProductsReducer,
  products: productsReducer,
  userProducts: userProductsReducer,
  productsCategory: productsCategoryReducer,
  relatedProducts: relatedProductsReducer,
  newCategory: categoryCreateReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  productCreate: productCreateReducer,
  productCreateReview: productCreateReviewReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productImage: uploadProductImageReducer,
  productImages: uploadProductImagesReducer,
  updateProductImage: updateProductImageReducer,
  deleteProductImage: deleteProductImageReducer,
  categories: categoriesReducer,
  subCategories: subCategoriesReducer,
  cart: cartReducer,

  orderList: orderListReducer,
  orderCreate: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderPayMpesa: orderPayMpesaReducer,
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
