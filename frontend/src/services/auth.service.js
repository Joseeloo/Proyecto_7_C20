import api from "../config/axios";

export const updateProfile = async (data) => {
  const res = await api.put("/auth/me", data);
  return res.data.data.user;
};
