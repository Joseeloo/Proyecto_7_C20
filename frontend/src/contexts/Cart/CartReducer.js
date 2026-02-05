const CartReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: true, error: null };

        case "SET_CART":
            return {
                ...state,
                cart: action.payload,
                loading: false,
            };

        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case "CLEAR_CART":
            return {
                cart: null,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default CartReducer;
