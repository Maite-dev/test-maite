import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configuración global para axios
axios.defaults.baseURL = "http://localhost:8000/api"; // Cambia "/api" si tu backend usa otro prefijo

// Define los tipos para las respuestas del servidor
interface LoginResponse {
  user: any; // Cambia 'any' al tipo exacto del usuario si lo tienes
  token: string;
}

interface RegisterResponse {
  user: any; // Cambia 'any' al tipo exacto del usuario si lo tienes
  token: string;
}

interface RenewTokenResponse {
  token: string;
}

// Define la estructura del estado de autenticación
interface AuthState {
  user: any | null; // Cambia 'any' al tipo exacto del usuario
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Login
export const login = createAsyncThunk<LoginResponse, { email: string; password: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", credentials); // Base URL ya configurada
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error en el login");
    }
  }
);

// Registrar usuario
export const register = createAsyncThunk<RegisterResponse, { name: string; email: string; password: string }>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", userData); // Base URL ya configurada
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al registrar");
    }
  }
);

// Renovar token
export const renewToken = createAsyncThunk<RenewTokenResponse>(
  "auth/renewToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/renew"); // Base URL ya configurada
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al renovar el token");
    }
  }
);

// Slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(renewToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(renewToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(renewToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Exporta las acciones y el reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
