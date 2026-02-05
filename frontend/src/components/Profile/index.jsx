import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/Auth/AuthContext";

const Profile = () => {
  const { user, loadUser, logout } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) return <p className="p-6">Cargando perfil…</p>;

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mi perfil</h1>

      <div className="card p-6 space-y-3">
        <p>
          <span className="font-medium">Usuario:</span>{" "}
          {user.username}
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          {user.email}
        </p>
      </div>

      <button
        onClick={logout}
        className="btn-outline w-full mt-6"
      >
        Cerrar sesión
      </button>
    </section>
  );
};

export default Profile;
