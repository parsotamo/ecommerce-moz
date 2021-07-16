import axios from "axios";

const config = (state) => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${state().userLogin.userInfo.token}`,
    },
  };
};

export const fetchNewProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_NEW_PRODUCTS_REQUEST" });
    const { data } = await axios.get(`/api/products/new`);

    dispatch({ type: "FETCH_NEW_PRODUCTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_NEW_PRODUCTS_FAIL", payload: error.response.data });
  }
};

export const fetchProducts = (
  page = "1",
  keyword = "",
  category = "",
  price = "",
  avgRating = ""
) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
    const { data } = await axios.get(
      `/api/products/?page=${page}&keyword=${keyword}&category=${category}&price[lte]=${price}&avgRating[gte]=${avgRating}`
    );
    dispatch({ type: "FETCH_PRODUCTS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_PRODUCTS_FAIL", payload: error.response.data });
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_PRODUCT_REQUEST" });
    const { data: response } = await axios.get(`/api/products/${id}/`);

    dispatch({ type: "FETCH_PRODUCT", payload: response.data });
  } catch (error) {
    dispatch({
      type: "FETCH_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_CREATE_REQUEST" });
    const { data: response } = await axios.post(
      `/api/products/`,
      product,
      config(getState)
    );
    dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_CREATE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const createProductReview = (id, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "PRODUCT_CREATE_REVIEW_REQUEST" });
    const { data } = await axios.post(
      `/api/products/${id}/reviews/`,
      review,
      config(getState)
    );
    dispatch({ type: "PRODUCT_CREATE_REVIEW_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_CREATE_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REVIEWS_REQUEST" });
    const { data } = await axios.get(`/api/products/${productId}/reviews/`);
    dispatch({ type: "PRODUCT_REVIEWS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_REVIEWS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getReviewsUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "REVIEWS_USERS_REQUEST" });
    const { data } = await axios.get(`/api/reviews/users/`);
    dispatch({ type: "REVIEWS_USERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "REVIEWS_USERS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const productUpdate = (
  id,
  name,
  price,
  brand,
  category,
  countInStock,
  description
) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_UPDATE_REQUEST" });
    const { data: response } = await axios.patch(
      `/api/products/${id}/`,
      {
        name,
        price,
        brand,
        category,
        countInStock,
        description,
      },
      config(getState)
    );
    dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_UPDATE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_DELETE_REQUEST" });
    await axios.delete(`/api/products/${id}/`, config(getState));
    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
      payload: `Produto ${id} removido com sucesso`,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data: response } = await axios.get(`/api/products/${id}/`);
  const { data } = response;
  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: "CART_REMOVE_ITEM", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const cartSaveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_SHIPPING_ADDRESS", payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const cartSavePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_PAYMENT_METHOD", payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const userLogin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data: response } = await axios.post(
      "/api/users/login/",
      {
        email,
        password,
      },
      { headers: { "content-type": "application/json" } }
    );

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem(
      "userInfo",
      JSON.stringify(getState().userLogin.userInfo)
    );
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "USER_DETAIL_RESET" });
  dispatch({ type: "USER_ORDERS_RESET" });
  dispatch({ type: "USER_LIST_RESET" });
};

export const register = (name, email, password, passwordConfirm) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    const { data: response } = await axios.post(
      "/api/users/signup/",
      {
        name,
        email,
        password,
        passwordConfirm,
      },
      { headers: { "content-type": "application/json" } }
    );
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        photo: response.data.photo,
        token: response.token,
      },
    });
    localStorage.setItem(
      "userInfo",
      JSON.stringify(getState().userLogin.userInfo)
    );
  } catch (err) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: err.response.data.message,
    });
  }
};

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_DETAIL_REQUEST" });
    const { data: response } = await axios.get(
      `/api/users/me/`,
      config(getState)
    );
    dispatch({ type: "USER_DETAIL_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "USER_DETAIL_FAIL",
      payload: error.response.data.message,
    });
    dispatch({ type: "USER_LOGOUT" });
  }
};

export const userUpdateProfile = (name, email, password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });
    const { data: response } = await axios.patch(
      "/api/users/updateMe",
      {
        name,
        email,
        password,
      },
      config(getState)
    );
    dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: response.data });
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        photo: response.data.photo,
        token: response.token,
      },
    });
    localStorage.setItem(
      "userInfo",
      JSON.stringify(getState().userLogin.userInfo)
    );
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_PROFILE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_PROFILE_DELETE_REQUEST" });
    const { data } = await axios.delete(
      `/api/users/delete/${id}/`,
      config(getState)
    );
    dispatch({
      type: "USER_PROFILE_DELETE_SUCCESS",
      payload: `Usuário ${id} apagado com sucesso`,
    });
  } catch (error) {
    dispatch({
      type: "USER_PROFILE_DELETE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getUsers = (page = 1, limit = "", sort = "name") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "GET_USERS_REQUEST" });
    const { data } = await axios.get(
      `/api/users/?page=${page}&sort=${sort}&limit=${limit}`,
      config(getState)
    );
    dispatch({ type: "GET_USERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAIL", payload: error.response.data.message });
  }
};

export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_REQUEST" });
    const { data: response } = await axios.get(
      `/api/users/${id}/`,
      config(getState)
    );
    dispatch({ type: "USER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_FAIL", payload: error.response.data.message });
  }
};

export const userUpdate = (id, name, email, role) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "USER_UPDATE_REQUEST" });
    const { data: response } = await axios.patch(
      `/api/users/${id}/`,
      {
        name,
        email,
        role,
      },
      config(getState)
    );
    dispatch({ type: "USER_UPDATE_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_DELETE_REQUEST" });
    const { data } = await axios.delete(`/api/users/${id}/`, config(getState));
    dispatch({
      type: "USER_DELETE_SUCCESS",
      payload: `Usuário ${id} apagado com sucesso`,
    });
  } catch (error) {
    dispatch({
      type: "USER_DELETE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const createOrder = (dataObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });
    const { data: response } = await axios.post(
      "/api/orders/",
      dataObj,
      config(getState)
    );
    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: response.data });
    dispatch({ type: "CART_RESET_ITEMS" });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: "CREATE_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_LIST_REQUEST" });
    const { data: response } = await axios.get(
      "/api/orders/",
      config(getState)
    );
    dispatch({ type: "ORDER_LIST_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ORDER_LIST_FAIL", payload: error.response.data.message });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST" });
    const { data: response } = await axios.get(
      `/api/orders/${id}/`,
      config(getState)
    );
    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_ORDERS_REQUEST" });
    const { data: response } = await axios.get(
      `/api/users/orders/ `,
      config(getState)
    );
    dispatch({ type: "USER_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "USER_ORDERS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_PAY_REQUEST" });
    const { data: response } = await axios.patch(
      `/api/orders/${id}/pay/`,
      paymentResult,
      config(getState)
    );
    dispatch({ type: "ORDER_PAY_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ORDER_PAY_FAIL", payload: error.response.data.message });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DELIVER_REQUEST" });
    const { data: response } = await axios.patch(
      `/api/orders/${id}/deliver`,
      {},
      config(getState)
    );
    dispatch({ type: "ORDER_DELIVER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "ORDER_DELIVER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getUserChat = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_CHATS_REQUEST" });
    const { data } = await axios.get(
      `/api/users/chat/${userId}`,
      config(getState)
    );
    dispatch({ type: "USER_CHATS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_CHATS_FAIL", payload: error.response.data.message });
  }
};

export const createChatContent = (chat) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CREATE_CHAT_CONTENT_REQUEST" });
    const { data: response } = await axios.post(
      `/api/users/chat/`,
      chat,
      config(getState)
    );
    dispatch({ type: "CREATE_CHAT_CONTENT_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "CREATE_CHAT_CONTENT_FAIL",
      payload: error.response.data.message,
    });
  }
};
