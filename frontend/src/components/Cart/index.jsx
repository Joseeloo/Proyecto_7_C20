import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/Cart/CartContext";
import formatCLP from "../../utils/formatCLP";

const Cart = () => {
  const {
    cart,
    loading,
    error,
    loadCart,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useContext(CartContext);

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <p className="p-6">Cargando carrito…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  if (!cart || cart.items.length === 0) {
    return (
      <section className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Carrito</h1>
        <p className="mb-4">Tu carrito está vacío.</p>
        <Link to="/products" className="btn-outline">
          Ver productos
        </Link>
      </section>
    );
  }

  const total = cart.items.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0
  );

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Carrito</h1>

      <ul className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <li
            key={item.product._id}
            className="card p-4 flex gap-4 items-center"
          >
            <img
              src={item.product.img}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <p className="font-medium">{item.product.name}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQty(item.product._id)}
                  className="px-3 py-1 border rounded hover:bg-slate-100"
                >
                  −
                </button>

                <span className="font-medium w-6 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.product._id)}
                  className="px-3 py-1 border rounded hover:bg-slate-100"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="ml-4 text-sm text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="font-semibold min-w-[100px] text-right">
              {formatCLP(item.product.price * item.quantity)}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <Link to="/products" className="btn-outline">
          Seguir comprando
        </Link>

        <div className="flex items-center gap-6">
          <div className="text-xl font-bold">
            Total: {formatCLP(total)}
          </div>

          <Link to="/checkout" className="btn-primary">
            Ir a pagar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
