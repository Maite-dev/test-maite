import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // Si no hay token, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Validar el token en el backend (opcional)
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Rutas protegidas
};
