import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/Auth/AuthContext";
import api from "../../config/axios";

const Profile = () => {
  const { user, logout, setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    country: "",
    address: "",
    zipcode: "",
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        country: user.country || "",
        address: user.address || "",
        zipcode: user.zipcode || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...form };

      if (!form.newPassword) {
        delete payload.currentPassword;
        delete payload.newPassword;
      }

      const res = await api.put("/auth/me", payload);

      if (res?.data?.data?.user) {
        setUser(res.data.data.user);
      }

      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } catch (error) {
      console.warn("Perfil actualizado con warning silencioso",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mi perfil</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Información personal</h2>

          <input
            className="form-input"
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
          />

          <input
            className="form-input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="form-input"
            name="country"
            placeholder="País"
            value={form.country}
            onChange={handleChange}
          />

          <input
            className="form-input"
            name="address"
            placeholder="Dirección"
            value={form.address}
            onChange={handleChange}
          />

          <input
            className="form-input"
            name="zipcode"
            placeholder="Código postal"
            value={form.zipcode}
            onChange={handleChange}
          />
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Seguridad</h2>
          <p className="text-sm text-slate-500">
            Completa solo si deseas cambiar tu contraseña
          </p>

          <input
            className="form-input"
            type="password"
            name="currentPassword"
            placeholder="Contraseña actual"
            value={form.currentPassword}
            onChange={handleChange}
          />

          <input
            className="form-input"
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          type="button"
          onClick={logout}
          className="btn-outline w-full"
        >
          Cerrar sesión
        </button>
      </form>
    </section>
  );
};

export default Profile;
