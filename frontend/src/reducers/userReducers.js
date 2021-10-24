export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return { loading: true };
    case 'USER_REGISTER_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_REGISTER_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const userDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DETAIL_REQUEST':
      return { loading: true };
    case 'USER_DETAIL_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_DETAIL_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_DETAIL_RESET':
      return {};
    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REQUEST':
      return { ...state, loading: true };
    case 'USER_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_RESET':
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_UPDATE_PROFILE_REQUEST':
      return { loading: true };
    case 'USER_UPDATE_PROFILE_SUCCESS':
      return { loading: false, success: true };
    case 'USER_UPDATE_PROFILE_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_UPDATE_PROFILE_RESET':
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_UPDATE_REQUEST':
      return { loading: true };
    case 'USER_UPDATE_SUCCESS':
      return { loading: false, success: true };
    case 'USER_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_UPDATE_RESET':
      return {};
    default:
      return state;
  }
};

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'GET_USERS_REQUEST':
      return { loading: true };
    case 'GET_USERS_SUCCESS':
      return {
        loading: false,
        success: true,
        users: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'GET_USERS_FAIL':
      return { loading: false, error: action.payload };
    case 'GET_USERS_RESET':
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DELETE_REQUEST':
      return { loading: true };
    case 'USER_DELETE_SUCCESS':
      return { loading: false, success: true };
    case 'USER_DELETE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userReviewsReducer = (state = { userReviews: [] }, action) => {
  switch (action.type) {
    case 'USER_REVIEWS_REQUEST':
      return { loading: true, ...state };
    case 'USER_REVIEWS_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        userReviews: action.payload,
      };
    case 'USER_REVIEWS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userChatsReducer = (state = { userChats: [] }, action) => {
  switch (action.type) {
    case 'USER_CHATS_REQUEST':
      return { loading: true, ...state };
    case 'USER_CHATS_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        userChats: action.payload.data,
        conversationId: action.payload.conversationId,
      };
    case 'USER_CHATS_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_CHATS_RESET':
      return { userChats: [] };
    default:
      return state;
  }
};

export const newChatContentReducer = (
  state = { newChatContent: '' },
  action
) => {
  switch (action.type) {
    case 'CREATE_CHAT_CONTENT_REQUEST':
      return { loading: true, ...state };
    case 'CREATE_CHAT_CONTENT_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        newChatContent: action.payload,
      };
    case 'CREATE_CHAT_CONTENT_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
