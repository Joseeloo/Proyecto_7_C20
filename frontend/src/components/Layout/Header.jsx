import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/Auth/AuthContext";
import CartContext from "../../contexts/Cart/CartContext";

const Header = () => {
  const { isAuthenticated, logout, loadUser } = useContext(AuthContext);
  const { cart, loadCart } = useContext(CartContext);

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
      loadCart();
    }
  }, [isAuthenticated]);

  const quantity =
    cart?.items?.reduce((acc, i) => acc + i.quantity, 0) || 0;

  return (
    <header className="bg-white border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-slate-900">
          DailyMarket
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/products" className="btn-nav">
            Productos
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="relative btn-nav">
                Carrito
                {quantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {quantity}
                  </span>
                )}
              </Link>

              <Link to="/profile" className="btn-nav">
                Perfil
              </Link>

              <button onClick={logout} className="btn-outline">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-nav">
                Login
              </Link>
              <Link to="/register" className="btn-outline">
                Registro
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
