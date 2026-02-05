import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Pago cancelado</h1>
      <p className="text-slate-600 mb-6">
        El pago no se completó. Puedes intentarlo nuevamente.
      </p>

      <Link to="/cart" className="btn-outline">
        Volver al carrito
      </Link>
    </section>
  );
};

export default ErrorPage;
