const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
                error: null
            };

        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                loading: false
            };

        case "SET_CURRENT":
            return {
                ...state,
                current: action.payload,
                loading: false
            };

        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default ProductReducer;
