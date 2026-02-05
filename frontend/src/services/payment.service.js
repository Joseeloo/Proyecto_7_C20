import api from "../config/axios";

const createCheckoutSession = async () => {
  const res = await api.post("/payments/checkout-session");
  return res.data.data.session_url;
};

export default { createCheckoutSession };
