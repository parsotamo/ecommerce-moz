export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_ORDER_REQUEST':
      return { loading: true };
    case 'CREATE_ORDER_SUCCESS':
      return { loading: false, success: true, order: action.payload };
    case 'CREATE_ORDER_FAIL':
      return { loading: false, error: action.payload };
    case 'CREATE_ORDER_RESET':
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'ORDER_DETAILS_REQUEST':
      return { ...state, loading: true };
    case 'ORDER_DETAILS_SUCCESS':
      return { ...state, loading: false, success: true, order: action.payload };
    case 'ORDER_DETAILS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayMpesaReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_PAY_MPESA_REQUEST':
      return { loading: true };
    case 'ORDER_PAY_MPESA_SUCCESS':
      return { loading: false, success: true, data: action.payload };
    case 'ORDER_PAY_MPESA_FAIL':
      return { loading: false, error: action.payload };
    case 'ORDER_PAY_MPESA_RESET':
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_PAY_REQUEST':
      return { loading: true };
    case 'ORDER_PAY_SUCCESS':
      return { loading: false, success: true };
    case 'ORDER_PAY_FAIL':
      return { loading: false, error: action.payload };
    case 'ORDER_PAY_RESET':
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_DELIVER_REQUEST':
      return { loading: true };
    case 'ORDER_DELIVER_SUCCESS':
      return { loading: false, success: true };
    case 'ORDER_DELIVER_FAIL':
      return { loading: false, error: action.payload };
    case 'ORDER_DELIVER_RESET':
      return {};
    default:
      return state;
  }
};

export const userOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_ORDERS_REQUEST':
      return { loading: true };
    case 'USER_ORDERS_SUCCESS':
      return { loading: false, orders: action.payload };
    case 'USER_ORDERS_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_ORDERS_RESET':
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'ORDER_LIST_REQUEST':
      return { loading: true, ...state };
    case 'ORDER_LIST_SUCCESS':
      return {
        loading: false,
        success: true,
        orders: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'ORDER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
