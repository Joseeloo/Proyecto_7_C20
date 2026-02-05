import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/Cart/CartContext";

const SuccessPage = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <section className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Pago exitoso 🎉</h1>
      <p className="text-slate-600 mb-6">
        Gracias por tu compra. ¿Deseas seguir comprando?
      </p>

      <div className="flex justify-center gap-4">
        <Link to="/products" className="btn-secondary">
          Seguir comprando
        </Link>

        <Link to="/profile" className="btn-outline">
          Ir a mi perfil
        </Link>
      </div>
    </section>
  );
};

export default SuccessPage;
