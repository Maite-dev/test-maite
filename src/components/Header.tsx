"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { logout } from "@/store/authSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user); // Verifica si hay un usuario

  const handleLogout = () => {
    dispatch(logout()); // Cierra sesión y limpia el estado
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Grupo HS</h1>
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          {/* Mostrar el botón de Logout solo si hay un usuario autenticado */}
          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Cerrar Sesión
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
