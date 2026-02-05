import { useReducer, useEffect } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import api from "../../config/axios";

const token = localStorage.getItem("token");

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    token,
    isAuthenticated: !!token,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
  };

  const register = async (data) => {
    await api.post("/auth/register", data);
  };

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      dispatch({
        type: "SET_USER",
        payload: res.data.data.user,
      });
    } catch {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    if (state.token && !state.user) {
      loadUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        loadUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
