'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Importar useState para manejar los inputs
import { useDispatch } from "react-redux"; // Hook de Redux
import { login } from "@/store/features/auth/authSlice"; // Acción de autenticación
import { useRouter } from "next/navigation"; // Hook para navegación

const LoginCard = () => {
  const dispatch = useDispatch(); // Inicializar el dispatch de Redux
  const router = useRouter(); // Hook para redirección
  const [email, setEmail] = useState(""); // Estado del email
  const [password, setPassword] = useState(""); // Estado de la contraseña
  const [loading, setLoading] = useState(false); // Estado del botón de carga
  const [error, setError] = useState(""); // Estado para errores

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario se recargue
    setLoading(true);
    setError("");

    try {
      // Despacha la acción de login
      const result = await dispatch(login({ email, password })).unwrap();
      if (result) {
        router.push("/dashboard"); // Redirige al dashboard
      }
    } catch (err) {
      setError("Credenciales incorrectas o error del servidor.");
    } finally {
      setLoading(false); // Restablece el estado de carga
    }
  };

  return (
    <div className="base relative w-full h-screen">
      <img
        src="/images/edificios.svg"
        alt="edificios"
        className="lg:block hidden absolute w-full z-4 bottom-0 left-0 object-contain"
      />
      <div className="relative h-32 md:h-48 w-full bg-customOrange">
        <div className="absolute top-3 md:top-8 left-1/2 transform -translate-x-1/2 ">
          <Image
            src="/images/logo-grupo-hs.png"
            alt="logo grupo HS"
            width={90}
            height={90}
            priority
          />
        </div>
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full max-w-[340px] p-8 text-center bg-grey-900 text-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-2 bg-grey-700 text-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-customGreen"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full p-2 bg-grey-700 text-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-customGreen"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p> // Mensaje de error
            )}
            <button
              type="submit"
              className="w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
          <footer className="mt-6">
            <p className="text-sm text-gray-400">
              <Link href="/auth/recover-password" className="text-customGreen">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
            <p className="text-sm text-gray-400 mt-4">
              ¿No tienes cuenta?{" "}
              <Link href="/auth/register" className="text-customGreen">
                Regístrate aquí
              </Link>
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default LoginCard;
