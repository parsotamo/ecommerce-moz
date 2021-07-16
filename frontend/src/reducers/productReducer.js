export const newProductsReducer = (state = {newProducts: [], }, action)=>{
    switch (action.type){
    case("FETCH_NEW_PRODUCTS_REQUEST"):
        return {loading: true, ...state};
    case("FETCH_NEW_PRODUCTS_SUCCESS"):
        return {loading: false, success: true, newProducts: action.payload.data};
    case("FETCH_NEW_PRODUCTS_FAIL"):
        return {loading: false, error: action.payload};
    default:
            return state;
    }
}


export const productsReducer = (state = {products: [], }, action)=>{
    switch (action.type){
    case("FETCH_PRODUCTS_REQUEST"):
        return {loading: true, ...state};
    case("FETCH_PRODUCTS"):
        return {loading: false, success: true, products: action.payload.data, page: action.payload.page, pages: action.payload.pages};
    case("FETCH_PRODUCTS_FAIL"):
        return {loading: false, error: action.payload};
    default:
            return state;
    }
}

export const productReducer = (state = {product: {reviews: []}}, action)=>{
    switch (action.type){
    case("FETCH_PRODUCT_REQUEST"):
    return {loading: true, ...state};
    case("FETCH_PRODUCT"):
        return {...state, loading: false, success: true, product: action.payload};
    case("FETCH_PRODUCT_FAIL"):
        return {loading: false, error: action.payload.message};
    case("FETCH_PRODUCT_RESET"):
        return {};
    default:
            return state;
    }
}


export const productReviewsReducer = (state = { productReviews: [] }, action)=>{
    switch (action.type){
        case("PRODUCT_REVIEWS_REQUEST"):
            return { loading: true, ...state };
        case("PRODUCT_REVIEWS_SUCCESS"):
            return { ...state, loading: false, productReviews: action.payload.data, page: action.payload.page, pages: action.payload.pages };
        case("PRODUCT_REVIEWS_FAIL"):
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productCreateReducer = (state = {}, action) =>{
    switch (action.type){
        case("PRODUCT_CREATE_REQUEST"):
            return {loading: true};
        case("PRODUCT_CREATE_SUCCESS"):
            return {loading: false, success: true, product: action.payload};
        case("PRODUCT_CREATE_FAIL"):
            return {loading: false, error: action.payload};
        case("PRODUCT_CREATE_RESET"):
        return {};
        default:
            return state;
    }
}

export const productUpdateReducer = (state = {}, action) =>{
    switch (action.type){
        case("PRODUCT_UPDATE_REQUEST"):
            return {loading: true};
        case("PRODUCT_UPDATE_SUCCESS"):
            return {loading: false, success: true};
        case("PRODUCT_UPDATE_FAIL"):
            return {loading: false, error: action.payload};
        case("PRODUCT_UPDATE_RESET"):
        return {};
        default:
            return state;
    }
}

export const productDeleteReducer = (state = {}, action) =>{
    switch (action.type){
        case("PRODUCT_DELETE_REQUEST"):
            return {loading: true};
        case("PRODUCT_DELETE_SUCCESS"):
            return {loading: false, success: true};
        case("PRODUCT_DELETE_FAIL"):
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const productCreateReviewReducer = (state = {}, action) =>{
    switch (action.type){
        case("PRODUCT_CREATE_REVIEW_REQUEST"):
            return {loading: true};
        case("PRODUCT_CREATE_REVIEW_SUCCESS"):
            return {loading: false, success: true};
        case("PRODUCT_CREATE_REVIEW_FAIL"):
            return {loading: false, error: action.payload};
        case("PRODUCT_CREATE_REVIEW_RESET"):
        return {};
        default:
            return state;
    }
}
