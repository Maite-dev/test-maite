import Image from "next/image";
import Link from "next/link";

const ForgotPasswordCard = () => {
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
          <h1 className="text-2xl font-bold mb-6">Recuperar Contraseña</h1>
          <p className="text-sm text-gray-400 mb-6">
            Ingresa tu correo electrónico para restablecer tu contraseña.
          </p>
          <form className="flex flex-col gap-4">
            {/* Correo Electrónico */}
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
                required
              />
            </div>
            {/* Botón para Recuperar Contraseña */}
            <button
              type="submit"
              className="w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Recuperar Contraseña
            </button>
          </form>
          {/* Footer */}
          <footer className="mt-6">
            <p className="text-sm text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="text-customGreen">
                Inicia sesión aquí
              </Link>
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;
