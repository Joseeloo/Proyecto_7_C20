import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProductContext from "../../../contexts/Product/ProductContext";
import CartContext from "../../../contexts/Cart/CartContext";
import formatCLP from "../../../utils/formatCLP";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { current, loading, error, getProductBySlug } =
    useContext(ProductContext);

  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductBySlug(slug);
  }, [slug]);

  if (loading) return <p className="p-6">Cargando producto…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!current) return null;

  const handleAddToCart = async () => {
    await addToCart(current._id, quantity);
    navigate("/cart");
  };

  return (
    <section className="p-6 max-w-6xl mx-auto grid gap-10 lg:grid-cols-2">
      <img
        src={current.img}
        alt={current.name}
        className="w-full h-[420px] object-cover rounded-lg shadow"
      />

      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">
          {current.name}
        </h1>

        <p className="text-slate-600 mb-4">
          {current.description}
        </p>

        <div className="text-2xl font-semibold mb-6">
          {formatCLP(current.price)}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <label className="font-medium">Cantidad</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value)))
            }
            className="w-24 form-input"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-secondary w-full md:w-auto"
        >
          Agregar al carrito
        </button>
      </div>
    </section>
  );
};

export default SingleProduct;
