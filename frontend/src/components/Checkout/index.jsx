import { useContext, useEffect } from "react";
import CartContext from "../../contexts/Cart/CartContext";
import paymentService from "../../services/payment.service";
import formatCLP from "../../utils/formatCLP";

const Checkout = () => {
  const { cart, loading, error, loadCart } = useContext(CartContext);

  useEffect(() => {
    loadCart();
  }, []);

  const handlePay = async () => {
    try {
      const url = await paymentService.createCheckoutSession();
      window.location.href = url;
    } catch (err) {
      alert("Error iniciando el pago");
    }
  };

  if (loading) return <p className="p-6">Cargando checkout…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!cart || cart.items.length === 0)
    return <p className="p-6">No hay productos en el carrito.</p>;

  const total = cart.items.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0
  );

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <ul className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <li
            key={item.product._id}
            className="card p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-slate-500">
                Cantidad: {item.quantity}
              </p>
            </div>

            <div className="font-semibold">
              {formatCLP(item.product.price * item.quantity)}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold">Total</span>
        <span className="text-xl font-bold">{formatCLP(total)}</span>
      </div>

      <button onClick={handlePay} className="btn-primary w-full">
        Pagar con Stripe
      </button>
    </section>
  );
};

export default Checkout;
