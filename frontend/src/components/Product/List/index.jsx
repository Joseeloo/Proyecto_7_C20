import { useContext, useEffect, useState } from "react";
import ProductContext from "../../../contexts/Product/ProductContext";
import ProductCard from "../ProductCard";

const ProductList = () => {
  const { products, loading, error, getProducts } =
    useContext(ProductContext);

  // 👉 categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <p className="p-6">Cargando productos…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // 👉 obtener categorías únicas desde los productos
  const categories = [
    "Todas",
    ...new Set(products.map((p) => p.category)),
  ];

  // 👉 filtrar productos según categoría
  const filteredProducts =
    selectedCategory === "Todas"
      ? products
      : products.filter(
          (p) => p.category === selectedCategory
        );

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      {/* Filtro por categoría */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded border transition
              ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      {filteredProducts.length === 0 ? (
        <p className="text-slate-600">
          No hay productos en esta categoría.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;

