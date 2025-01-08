import { configureStore } from "@reduxjs/toolkit"; 
import authReducer from "./authSlice";
import authMiddleware from "../../authMiddleware"; // Ajusta la ruta según tu estructura de carpetas

export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer para el estado de autenticación
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware), // Agrega el middleware personalizado
});

// Tipos para el estado global y el despacho
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
