import { useReducer } from "react";
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
import productService from "../../services/product.service";

const ProductState = ({ children }) => {
    const initialState = {
        products: [],
        current: null,
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const getProducts = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const data = await productService.getAll();
            dispatch({ type: "SET_PRODUCTS", payload: data });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
        }
    };

    const getProductBySlug = async (slug) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const data = await productService.getBySlug(slug);
            dispatch({ type: "SET_CURRENT", payload: data });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
        }
    };

    return (
        <ProductContext.Provider
            value={{
                ...state,
                getProducts,
                getProductBySlug,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductState;
