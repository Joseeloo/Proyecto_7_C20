import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import UserState from "./contexts/User/UserState";
import GuitarState from "./contexts/Guitar/GuitarState";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import GuitarList from "./components/Guitar/List";
import SingleGuitar from "./components/Guitar/Single";
import AuthRoute from "./routes/Auth";
import PrivateRoute from "./routes/Private";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/ErrorPage';

const Router = () => {
  return (
    <UserState>
      <GuitarState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/guitarras" element={<GuitarList />} />
              <Route path="/guitarras/:slug" element={<SingleGuitar />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/pago-exitoso" element={<SuccessPage />} />
              <Route path="/pago-cancelado" element={<CancelPage />} />

              <Route
                path="/iniciar-sesion"
                element={<AuthRoute component={Login} />}
              />
              
              <Route
                path="/carrito"
                element={<PrivateRoute component={Checkout} />} 
              />

              <Route 
                path="/perfil"
                element={<PrivateRoute component={Profile} />}
              />

            </Route>
          </Routes>
        </BrowserRouter>
      </GuitarState>
    </UserState>
  );
};

export default Router;
