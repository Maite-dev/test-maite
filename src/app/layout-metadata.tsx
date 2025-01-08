import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grupo HS",
  description: "Administración de Comerciales",
};

export default function LayoutMetadata({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
