export const newProductsReducer = (state = { newProducts: [] }, action) => {
  switch (action.type) {
    case 'FETCH_NEW_PRODUCTS_REQUEST':
      return { loading: true };
    case 'FETCH_NEW_PRODUCTS_SUCCESS':
      return {
        loading: false,
        success: true,
        newProducts: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_NEW_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    case 'FETCH_NEW_PRODUCTS_RESET':
      return { newProducts: [] };
    default:
      return state;
  }
};

export const hotProductsReducer = (state = { hotProducts: [] }, action) => {
  switch (action.type) {
    case 'FETCH_HOT_PRODUCTS_REQUEST':
      return { loading: true };
    case 'FETCH_HOT_PRODUCTS_SUCCESS':
      return {
        loading: false,
        success: true,
        hotProducts: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_HOT_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    case 'FETCH_HOT_PRODUCTS_RESET':
      return { hotProducts: [] };
    default:
      return state;
  }
};

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { loading: true, ...state };
    case 'FETCH_PRODUCTS':
      return {
        loading: false,
        success: true,
        products: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    case 'FETCH_PRODUCTS_RESET':
      return { products: [] };
    default:
      return state;
  }
};
export const popularProductsReducer = (
  state = { popularProducts: [] },
  action
) => {
  switch (action.type) {
    case 'FETCH_POPULAR_PRODUCTS_REQUEST':
      return { loading: true, ...state };
    case 'FETCH_POPULAR_PRODUCTS':
      return {
        loading: false,
        success: true,
        popularProducts: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_POPULAR_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    case 'FETCH_POPULAR_PRODUCTS_RESET':
      return { popularProducts: [] };
    default:
      return state;
  }
};
export const userProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'FETCH_USER_PRODUCTS_REQUEST':
      return { loading: true, ...state };
    case 'FETCH_USER_PRODUCTS_SUCCESS':
      return {
        loading: false,
        success: true,
        products: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_USER_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productsCategoryReducer = (
  state = { productsCategory: [] },
  action
) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_CATEGORY_REQUEST':
      return { loading: true, ...state };
    case 'FETCH_PRODUCTS_CATEGORY_SUCCESS':
      return {
        loading: false,
        success: true,
        productsCategory: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_PRODUCTS_CATEGORY_FAIL':
      return { loading: false, error: action.payload };
    case 'FETCH_PRODUCTS_CATEGORY_RESET':
      return { productsCategory: [] };
    default:
      return state;
  }
};

export const relatedProductsReducer = (
  state = { relatedProducts: [] },
  action
) => {
  switch (action.type) {
    case 'FETCH_RELATED_PRODUCTS_REQUEST':
      return { loading: true, ...state };
    case 'FETCH_RELATED_PRODUCTS_SUCCESS':
      return {
        loading: false,
        success: true,
        relatedProducts: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_RELATED_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    case 'FETCH_RELATED_PRODUCTS_RESET':
      return { relatedProducts: [] };
    default:
      return state;
  }
};

export const categoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
      return { loading: true, ...state };
    case 'FETCH_CATEGORIES_SUCCESS':
      return { loading: false, success: true, categories: action.payload.data };
    case 'FETCH_CATEGORIES_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subCategoriesReducer = (state = { subCategories: [] }, action) => {
  switch (action.type) {
    case 'FETCH_SUB_CATEGORIES_REQUEST':
      return { loading: true, ...state };
    case 'FETCH_SUB_CATEGORIES_SUCCESS':
      return {
        loading: false,
        success: true,
        subCategories: action.payload.data,
      };
    case 'FETCH_SUB_CATEGORIES_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case 'CREATE_CATEGORY_REQUEST':
      return { loading: true, ...state };
    case 'CREATE_CATEGORY_SUCCESS':
      return {
        loading: false,
        success: true,
        newCategory: action.payload.data,
      };
    case 'CREATE_CATEGORY_FAIL':
      return { loading: false, error: action.payload };
    case 'CREATE_CATEGORY_RESET':
      return {};
    default:
      return state;
  }
};

export const productReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_REQUEST':
      return { loading: true, ...state };
    case 'FETCH_PRODUCT':
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case 'FETCH_PRODUCT_FAIL':
      return { loading: false, error: action.payload.message };
    case 'FETCH_PRODUCT_RESET':
      return { reviews: [] };
    default:
      return state;
  }
};

export const productReviewsReducer = (
  state = { productReviews: [] },
  action
) => {
  switch (action.type) {
    case 'PRODUCT_REVIEWS_REQUEST':
      return { loading: true, ...state };
    case 'PRODUCT_REVIEWS_SUCCESS':
      return {
        ...state,
        loading: false,
        productReviews: action.payload.data,
        success: true,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'PRODUCT_REVIEWS_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_REVIEWS_RESET':
      return { productReviews: [] };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_CREATE_REQUEST':
      return { loading: true };
    case 'PRODUCT_CREATE_SUCCESS':
      return { loading: false, success: true, product: action.payload };
    case 'PRODUCT_CREATE_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_CREATE_RESET':
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_UPDATE_REQUEST':
      return { loading: true };
    case 'PRODUCT_UPDATE_SUCCESS':
      return { loading: false, success: true };
    case 'PRODUCT_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_UPDATE_RESET':
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_DELETE_REQUEST':
      return { loading: true };
    case 'PRODUCT_DELETE_SUCCESS':
      return { loading: false, success: true };
    case 'PRODUCT_DELETE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_CREATE_REVIEW_REQUEST':
      return { loading: true };
    case 'PRODUCT_CREATE_REVIEW_SUCCESS':
      return { loading: false, success: true };
    case 'PRODUCT_CREATE_REVIEW_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_CREATE_REVIEW_RESET':
      return {};
    default:
      return state;
  }
};

export const uploadProductImageReducer = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case 'UPLOAD_PRODUCT_IMAGE_REQUEST':
      return { loading: true };
    case 'UPLOAD_PRODUCT_IMAGE_SUCCESS':
      return {
        loading: false,
        success: true,
        productImage: action.payload.data,
      };
    case 'UPLOAD_PRODUCT_IMAGE_FAIL':
      return { loading: false, error: action.payload };
    case 'UPLOAD_PRODUCT_IMAGE_RESET':
      return {};
    default:
      return state;
  }
};

export const uploadProductImagesReducer = (
  state = { productImages: [] },
  action
) => {
  switch (action.type) {
    case 'UPLOAD_PRODUCT_IMAGES_REQUEST':
      return { loading: true };
    case 'UPLOAD_PRODUCT_IMAGES_SUCCESS':
      return {
        loading: false,
        success: true,
        productImages: action.payload.data,
      };
    case 'UPLOAD_PRODUCT_IMAGES_FAIL':
      return { loading: false, error: action.payload };
    case 'UPLOAD_PRODUCT_IMAGES_RESET':
      return { productImages: [] };
    default:
      return state;
  }
};

export const updateProductImageReducer = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT_IMAGE_REQUEST':
      return { loading: true };
    case 'UPDATE_PRODUCT_IMAGE_SUCCESS':
      return { loading: false, success: true };
    case 'UPDATE_PRODUCT_IMAGE_FAIL':
      return { loading: false, error: action.payload };
    case 'UPDATE_PRODUCT_IMAGE_RESET':
      return {};
    default:
      return state;
  }
};

export const deleteProductImageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT_IMAGE_REQUEST':
      return { loading: true };
    case 'DELETE_PRODUCT_IMAGE_SUCCESS':
      return { loading: false, success: true, imagesAD: action.payload.data };
    case 'DELETE_PRODUCT_IMAGE_FAIL':
      return { loading: false, error: action.payload };
    case 'DELETE_PRODUCT_IMAGE_RESET':
      return {};
    default:
      return state;
  }
};
