import { Middleware } from "@reduxjs/toolkit";
import { logout } from "@/store/authSlice";

const authMiddleware: Middleware = (store) => (next) => (action: any) => {
  // Manejo de acción: login exitoso
  if (action.type === "auth/login/fulfilled") {
    const { user, token } = action.payload || {};
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }

  // Manejo de acción: logout
  if (action.type === "auth/logout") {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // Manejo de acción: renovación de token fallida
  if (action.type === "auth/renewToken/rejected") {
    console.error("Token inválido o expirado, cerrando sesión.");
    store.dispatch(logout());
  }

  // Continuar con el siguiente middleware o reducer
  return next(action);
};

export default authMiddleware;

