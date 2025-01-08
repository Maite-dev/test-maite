import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice"; // Ajusta la ruta según tu proyecto

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log("Sesión cerrada.");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
