import { Link } from "react-router-dom";
import formatCLP from "../../utils/formatCLP";

const ProductCard = ({ product }) => {
    return (
        <div className="card p-4 flex flex-col">
            <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
            />

            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-slate-500 mb-2 line-clamp-2">
                {product.description}
            </p>

            <div className="mt-auto flex items-center justify-between">
                <span className="font-semibold">
                    {formatCLP(product.price)}
                </span>

                <Link to={`/products/${product.slug}`} className="btn-outline">
                    Ver
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
