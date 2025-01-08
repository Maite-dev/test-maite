"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../store/providers"; // Asegúrate de la ruta correcta
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { renewToken } from "../store/authSlice";
import type { AppDispatch } from "../store/store";
import Header from "@/components/Header"; // Importa el encabezado
import LayoutMetadata from "./layout-metadata"; // Importa el componente de metadata

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutMetadata>
      <Providers>
        <Content>{children}</Content>
      </Providers>
    </LayoutMetadata>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(renewToken());
    }
  }, [dispatch]);

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
