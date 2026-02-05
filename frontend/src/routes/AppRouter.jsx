import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthState from "../contexts/Auth/AuthState";
import ProductState from "../contexts/Product/ProductState";
import CartState from "../contexts/Cart/CartState";

import Layout from "../components/Layout";
import Home from "../components/Home";

import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

import ProductList from "../components/Product/List";
import SingleProduct from "../components/Product/Single";

import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Profile from "../components/Profile";
import SuccessPage from "../components/SuccessPage";
import ErrorPage from "../components/ErrorPage";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => (
  <AuthState>
    <ProductState>
      <CartState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              <Route path="products" element={<ProductList />} />
              <Route path="products/:slug" element={<SingleProduct />} />

              <Route
                path="login"
                element={<PublicRoute component={Login} />}
              />
              <Route
                path="register"
                element={<PublicRoute component={Register} />}
              />

              <Route
                path="cart"
                element={<PrivateRoute component={Cart} />}
              />
              <Route
                path="checkout"
                element={<PrivateRoute component={Checkout} />}
              />
              <Route
                path="profile"
                element={<PrivateRoute component={Profile} />}
              />

              <Route path="success" element={<SuccessPage />} />
              <Route path="cancel" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartState>
    </ProductState>
  </AuthState>
);

export default AppRouter;
