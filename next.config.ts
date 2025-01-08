import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Todas las rutas que comiencen con "/api"
        destination: "http://localhost:5000/:path*", // Cambia el puerto o dominio por el de tu backend
      },
    ];
  },
};

export default nextConfig;
