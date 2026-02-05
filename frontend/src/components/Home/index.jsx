import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">
            Bienvenido a <span className="text-blue-600">DailyMarket</span>
          </h1>

          <p className="text-slate-600 mb-8">
            En DailyMarket encuentras tecnología, moda y accesorios 
            seleccionados para tu día a día, con una experiencia de compra simple y segura.
          </p>

          <Link to="/products" className="btn-primary">
            Ver productos
          </Link>
        </div>

        <div className="hidden lg:block">
          <img
            src="https://cdn-images-1.medium.com/v2/resize:fit:600/1*2DZh55QRYVRlQfQ9El72Xg.jpeg"
            alt="E-commerce"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
