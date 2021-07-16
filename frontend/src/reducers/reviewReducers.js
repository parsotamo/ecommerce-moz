export const reviewsUsersReducer = (state = { reviewsUsers: [] }, action)=>{
    switch (action.type){
        case("REVIEWS_USERS_REQUEST"):
            return { loading: true, ...state };
        case("REVIEWS_USERS_SUCCESS"):
            return { ...state, loading: false, success: true, reviewsUsers: action.payload.data };
        case("REVIEWS_USERS_FAIL"):
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
