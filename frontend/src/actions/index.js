import axios from 'axios';

const config = (state) => {
  return {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${state().userLogin.userInfo.token}`,
    },
  };
};

export const fetchNewProducts =
  (query = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_NEW_PRODUCTS_REQUEST' });
      const { data } = await axios.get(`/api/products/new/${query}`);
      dispatch({ type: 'FETCH_NEW_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_NEW_PRODUCTS_FAIL',
        payload: error.response.data,
      });
    }
  };

export const fetchHotProducts =
  (query = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_HOT_PRODUCTS_REQUEST' });

      const { data } = await axios.get(`/api/products/hot/${query}`);

      dispatch({ type: 'FETCH_HOT_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_HOT_PRODUCTS_FAIL',
        payload: error.response.data,
      });
    }
  };

export const fetchProducts =
  (query = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
      const { data } = await axios.get(`/api/products/${query}`);
      dispatch({ type: 'FETCH_PRODUCTS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAIL', payload: error.response.data });
    }
  };

export const fetchPopularProducts =
  (query = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_POPULAR_PRODUCTS_REQUEST' });
      const { data } = await axios.get(`/api/products/popular${query}`);
      dispatch({ type: 'FETCH_POPULAR_PRODUCTS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_POPULAR_PRODUCTS_FAIL',
        payload: error.response.data,
      });
    }
  };

export const fetchUserProducts =
  (query = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: 'FETCH_USER_PRODUCTS_REQUEST' });
      const { data } = await axios.get(
        `/api/users/products/my/${query}`,
        config(getState)
      );
      dispatch({ type: 'FETCH_USER_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_USER_PRODUCTS_FAIL',
        payload: error.response.data,
      });
    }
  };

export const fetchProductsCategory =
  ({ categoryId, categoryName }, query = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_PRODUCTS_CATEGORY_REQUEST' });

      const { data } = await axios.get(
        `/api/products/category/${categoryName}/${categoryId}${query}`
      );
      dispatch({ type: 'FETCH_PRODUCTS_CATEGORY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_PRODUCTS_CATEGORY_FAIL',
        payload: error.response.data,
      });
    }
  };

export const fetchFilteredProductsCategory =
  ({ categoryId, categoryName }, query = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_PRODUCTS_CATEGORY_REQUEST' });

      const { data } = await axios.get(
        `/api/products/category/${categoryName}/${categoryId}${query}`
      );
      dispatch({ type: 'FETCH_PRODUCTS_CATEGORY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_PRODUCTS_CATEGORY_FAIL',
        payload: error.response.data,
      });
    }
  };

export const fetchRelatedProducts =
  ({ categoryId, categoryName, productId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_RELATED_PRODUCTS_REQUEST' });

      const { data } = await axios.get(
        `/api/products/category/${categoryName}/${categoryId}/?_id[ne]=${productId}`
      );
      dispatch({ type: 'FETCH_RELATED_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_RELATED_PRODUCTS_FAIL',
        payload: error.response.data,
      });
    }
  };

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
    const { data } = await axios.get(`/api/products/categories`);
    dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_CATEGORIES_FAIL', payload: error.response.data });
  }
};

export const fetchSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_SUB_CATEGORIES_REQUEST' });
    const { data } = await axios.get(`/api/products/subcategories`);
    dispatch({ type: 'FETCH_SUB_CATEGORIES_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'FETCH_SUB_CATEGORIES_FAIL',
      payload: error.response.data,
    });
  }
};

export const createCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'CREATE_CATEGORY_REQUEST' });
    const { data: response } = await axios.post(
      `/api/products/categories/`,
      category,
      config(getState)
    );
    dispatch({ type: 'CREATE_CATEGORY_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'CREATE_CATEGORY_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_PRODUCT_REQUEST' });
    const { data: response } = await axios.get(`/api/products/${id}`);

    dispatch({ type: 'FETCH_PRODUCT', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCT_FAIL',
      payload: error.response.data.message,
    });
  }
};
// export const incrementViews = (id) => async () => {
//   try {
//     const { data } = await axios.get(`/api/products/${id}/incrementViews`);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_CREATE_REQUEST' });
    const { data: response } = await axios.post(`/api/products`, product, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: 'PRODUCT_CREATE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_CREATE_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const createProductReview =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_REQUEST' });
      const { data } = await axios.post(
        `/api/products/${id}/reviews`,
        review,
        config(getState)
      );
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_CREATE_REVIEW_FAIL',
        payload: error.response.data.message,
      });
    }
  };

export const getProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_REVIEWS_REQUEST' });
    const { data } = await axios.get(`/api/products/${productId}/reviews`);
    dispatch({ type: 'PRODUCT_REVIEWS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_REVIEWS_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getReviewsUsers = () => async (dispatch) => {
  try {
    dispatch({ type: 'REVIEWS_USERS_REQUEST' });
    const { data } = await axios.get(`/api/reviews/users`);
    dispatch({ type: 'REVIEWS_USERS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'REVIEWS_USERS_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const productUpdate =
  (productId, product) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'PRODUCT_UPDATE_REQUEST' });
      const { data: response } = await axios.patch(
        `/api/products/${productId}`,
        product,
        config(getState)
      );
      dispatch({ type: 'PRODUCT_UPDATE_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_UPDATE_FAIL',
        payload: error.response.data.message,
      });
    }
  };

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_DELETE_REQUEST' });
    await axios.delete(`/api/products/${id}`, config(getState));
    dispatch({
      type: 'PRODUCT_DELETE_SUCCESS',
      payload: `Produto ${id} removido com sucesso`,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DELETE_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data: response } = await axios.get(`/api/products/${id}`);
  const { data } = response;
  dispatch({
    type: 'CART_ADD_ITEM',
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const cartSaveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: 'CART_SAVE_SHIPPING_ADDRESS', payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const cartSavePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: 'CART_SAVE_PAYMENT_METHOD', payload: data });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export const userLogin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const { data: response } = await axios.post(
      '/api/users/login',
      {
        email,
        password,
      },
      { headers: { 'content-type': 'application/json' } }
    );

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
    localStorage.setItem(
      'userInfo',
      JSON.stringify(getState().userLogin.userInfo)
    );
  } catch (error) {
    dispatch({ type: 'USER_LOGIN_FAIL', payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
  dispatch({ type: 'USER_DETAIL_RESET' });
  dispatch({ type: 'USER_ORDERS_RESET' });
  dispatch({ type: 'USER_LIST_RESET' });
};

export const register =
  (name, email, password, passwordConfirm) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'USER_REGISTER_REQUEST' });
      const { data: response } = await axios.post(
        '/api/users/signup',
        {
          name,
          email,
          password,
          passwordConfirm,
        },
        { headers: { 'content-type': 'application/json' } }
      );
      dispatch({ type: 'USER_REGISTER_SUCCESS', payload: response.data });
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          photo: response.data.photo,
          token: response.token,
        },
      });
      localStorage.setItem(
        'userInfo',
        JSON.stringify(getState().userLogin.userInfo)
      );
    } catch (err) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload: err.response.data.message,
      });
    }
  };

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_DETAIL_REQUEST' });
    const { data: response } = await axios.get(
      `/api/users/me`,
      config(getState)
    );
    dispatch({ type: 'USER_DETAIL_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'USER_DETAIL_FAIL',
      payload: error.response.data.message,
    });
    dispatch({ type: 'USER_LOGOUT' });
  }
};

export const userUpdateProfile =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'USER_UPDATE_PROFILE_REQUEST' });
      const { data: response } = await axios.patch(
        '/api/users/updateMe',
        {
          name,
          email,
          password,
        },
        config(getState)
      );
      dispatch({ type: 'USER_UPDATE_PROFILE_SUCCESS', payload: response.data });
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          photo: response.data.photo,
          token: response.token,
        },
      });
      localStorage.setItem(
        'userInfo',
        JSON.stringify(getState().userLogin.userInfo)
      );
    } catch (error) {
      dispatch({
        type: 'USER_UPDATE_PROFILE_FAIL',
        payload: error.response.data.message,
      });
    }
  };

export const deleteUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_PROFILE_DELETE_REQUEST' });
    await axios.delete(`/api/users/delete/${id}`, config(getState));
    dispatch({
      type: 'USER_PROFILE_DELETE_SUCCESS',
      payload: `Usuário ${id} apagado com sucesso`,
    });
  } catch (error) {
    dispatch({
      type: 'USER_PROFILE_DELETE_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getUsers =
  (page = 1, limit = '', sort = 'name') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: 'GET_USERS_REQUEST' });
      const { data } = await axios.get(
        `/api/users/?page=${page}&sort=${sort}&limit=${limit}`,
        config(getState)
      );
      dispatch({ type: 'GET_USERS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'GET_USERS_FAIL',
        payload: error.response.data.message,
      });
    }
  };

export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_REQUEST' });
    const { data: response } = await axios.get(
      `/api/users/${id}`,
      config(getState)
    );
    dispatch({ type: 'USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'USER_FAIL', payload: error.response.data.message });
  }
};

export const userUpdate =
  (id, name, email, role) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'USER_UPDATE_REQUEST' });
      const { data: response } = await axios.patch(
        `/api/users/${id}`,
        {
          name,
          email,
          role,
        },
        config(getState)
      );
      dispatch({ type: 'USER_UPDATE_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'USER_UPDATE_FAIL',
        payload: error.response.data.message,
      });
    }
  };

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_DELETE_REQUEST' });
    await axios.delete(`/api/users/${id}`, config(getState));
    dispatch({
      type: 'USER_DELETE_SUCCESS',
      payload: `Usuário ${id} apagado com sucesso`,
    });
  } catch (error) {
    dispatch({
      type: 'USER_DELETE_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const createOrder = (dataObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'CREATE_ORDER_REQUEST' });
    const { data: response } = await axios.post(
      '/api/orders',
      dataObj,
      config(getState)
    );
    dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: response.data });
    dispatch({ type: 'CART_RESET_ITEMS' });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getOrders =
  (page = 1, limit = '', sort = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: 'ORDER_LIST_REQUEST' });
      const { data } = await axios.get(
        `/api/orders?page=${page}&sort=${sort}&limit=${limit}`,
        config(getState)
      );
      dispatch({ type: 'ORDER_LIST_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'ORDER_LIST_FAIL',
        payload: error.response.data.message,
      });
    }
  };

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_DETAILS_REQUEST' });
    const { data: response } = await axios.get(
      `/api/orders/${id}`,
      config(getState)
    );
    dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'ORDER_DETAILS_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_ORDERS_REQUEST' });
    const { data: response } = await axios.get(
      `/api/users/orders/my`,
      config(getState)
    );
    dispatch({ type: 'USER_ORDERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'USER_ORDERS_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_PAY_REQUEST' });
    const { data: response } = await axios.patch(
      `/api/orders/${id}/pay`,
      paymentResult,
      config(getState)
    );
    dispatch({ type: 'ORDER_PAY_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'ORDER_PAY_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const payMpesa = (id, paymentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_PAY_MPESA_REQUEST' });
    const { data: response } = await axios.post(
      `/api/orders/${id}/pay_mpesa`,
      paymentData,
      config(getState)
    );
    dispatch({ type: 'ORDER_PAY_MPESA_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ORDER_PAY_MPESA_FAIL', payload: error });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_DELIVER_REQUEST' });
    const { data: response } = await axios.patch(
      `/api/orders/${id}/deliver`,
      {},
      config(getState)
    );
    dispatch({ type: 'ORDER_DELIVER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'ORDER_DELIVER_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const getUserChat = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_CHATS_REQUEST' });
    const { data } = await axios.get(
      `/api/users/chat/${userId}`,
      config(getState)
    );
    dispatch({ type: 'USER_CHATS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'USER_CHATS_FAIL', payload: error.response.data.message });
  }
};

export const createChatContent = (chat) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'CREATE_CHAT_CONTENT_REQUEST' });
    const { data: response } = await axios.post(
      `/api/users/chat`,
      chat,
      config(getState)
    );
    dispatch({ type: 'CREATE_CHAT_CONTENT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'CREATE_CHAT_CONTENT_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const uploadProductImage = (id, image) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'UPLOAD_PRODUCT_IMAGE_REQUEST' });
    const { data } = await axios.patch(`/api/products/${id}`, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
    dispatch({ type: 'UPLOAD_PRODUCT_IMAGE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'UPLOAD_PRODUCT_IMAGE_FAIL',
      payload: error.response.data.message,
    });
  }
};

export const uploadProductImages =
  (id, payload) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'UPLOAD_PRODUCT_IMAGES_REQUEST' });
      const { data } = await axios.patch(
        `/api/products/${id}/upload`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_PRODUCT_IMAGES_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'UPLOAD_PRODUCT_IMAGES_FAIL',
        payload: error.response.data.message,
      });
    }
  };

export const updateProductImage =
  (id, payload) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'UPDATE_PRODUCT_IMAGE_REQUEST' });
      const { data } = await axios.patch(
        `/api/products/${id}/update`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPDATE_PRODUCT_IMAGE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'UDATE_PRODUCT_IMAGE_FAIL',
        payload: error.response.data.message,
      });
    }
  };

export const deleteProductImage =
  (productId, payload) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'DELETE_PRODUCT_IMAGE_REQUEST' });
      const { data } = await axios.patch(
        `/api/products/${productId}/delete`,
        payload,
        config(getState)
      );
      dispatch({ type: 'DELETE_PRODUCT_IMAGE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'DELETE_PRODUCT_IMAGE_FAIL',
        payload: error.response.data.message,
      });
    }
  };
