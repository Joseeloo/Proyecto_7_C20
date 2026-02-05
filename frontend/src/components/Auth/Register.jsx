import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../contexts/Auth/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(form);
      navigate("/login");
    } catch (error){
      setError("Error al crear la cuenta", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Crear cuenta
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Usuario</label>
            <input
              type="text"
              name="username"
              className="form-input"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="form-button"
            disabled={loading}
          >
            {loading ? "Creando cuenta…" : "Registrarse"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-600">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
