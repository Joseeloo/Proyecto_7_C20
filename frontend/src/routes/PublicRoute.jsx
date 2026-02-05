import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/Auth/AuthContext";

const PublicRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PublicRoute;
