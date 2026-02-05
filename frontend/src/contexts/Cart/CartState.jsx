import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import cartService from "../../services/cart.service";

const CartState = ({ children }) => {
    const initialState = {
        cart: null,
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    const loadCart = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const cart = await cartService.getMyCart();
            dispatch({ type: "SET_CART", payload: cart });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
        }
    };

    const updateCart = async (items) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const cart = await cartService.updateCart(items);
            dispatch({ type: "SET_CART", payload: cart });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        const currentItems = state.cart?.items || [];

        const exists = currentItems.find(
            (i) => i.product._id === productId
        );

        let newItems;
        if (exists) {
            newItems = currentItems.map((i) =>
                i.product._id === productId
                    ? { product: productId, quantity: i.quantity + quantity }
                    : { product: i.product._id, quantity: i.quantity }
            );
        } else {
            newItems = [
                ...currentItems.map((i) => ({
                    product: i.product._id,
                    quantity: i.quantity,
                })),
                { product: productId, quantity },
            ];
        }

        await updateCart(newItems);
    };

    const clearCart = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const cart = await cartService.clearCart();
            dispatch({ type: "SET_CART", payload: cart });
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message });
        }
    };

    const increaseQty = async (productId) => {
        const items = state.cart.items.map((i) =>
            i.product._id === productId
                ? { product: productId, quantity: i.quantity + 1 }
                : { product: i.product._id, quantity: i.quantity }
        );

        await updateCart(items);
    };

    const decreaseQty = async (productId) => {
        const items = state.cart.items
            .map((i) =>
                i.product._id === productId
                    ? { product: productId, quantity: i.quantity - 1 }
                    : { product: i.product._id, quantity: i.quantity }
            )
            .filter((i) => i.quantity > 0); // 👈 elimina si queda en 0

        await updateCart(items);
    };

    const removeItem = async (productId) => {
        const items = state.cart.items
            .filter((i) => i.product._id !== productId)
            .map((i) => ({
                product: i.product._id,
                quantity: i.quantity,
            }));

        await updateCart(items);
    };

    return (
        <CartContext.Provider
            value={{
                ...state,
                loadCart,
                updateCart,
                addToCart,
                clearCart,
                increaseQty,
                decreaseQty,
                removeItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartState;

