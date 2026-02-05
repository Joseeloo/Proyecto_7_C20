import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/Auth/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;