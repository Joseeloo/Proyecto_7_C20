import api from "../config/axios";

const getAll = async () => {
    const res = await api.get("/products");
    return res.data.data.products;
};

const getBySlug = async (slug) => {
    const res = await api.get(`/products/slug/${slug}`);
    return res.data.data.product;
};

export default { getAll, getBySlug };
