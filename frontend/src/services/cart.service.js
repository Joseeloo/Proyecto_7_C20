import api from "../config/axios";

const getMyCart = async () => {
    const res = await api.get("/cart");
    return res.data.data.cart;
};

const updateCart = async (items) => {
    const res = await api.put("/cart", { items });
    return res.data.data.cart;
};

const clearCart = async () => {
    const res = await api.put("/cart", { items: [] });
    return res.data.data.cart;
};

export default { getMyCart, updateCart, clearCart };
