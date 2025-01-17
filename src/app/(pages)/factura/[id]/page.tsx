"use client";

import Image from "next/image";
import { useRef } from "react";
import html2pdf from "html2pdf.js";

const InvoicePage = () => {
  const invoiceRef = useRef<HTMLDivElement | null>(null); // Inicialización correcta con tipo.

  const handleViewPDF = () => {
    const element = invoiceRef.current;
    if (!element) return; // Validación para evitar errores si el elemento no existe.

    const options = {
      margin: [0.01, 0.01, 0.01, 0.01], // Márgenes reducidos en pulgadas
      filename: "factura.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: [8.5, 5.5], orientation: "portrait" }, // Media carta
    };
    
    
    html2pdf()
      .set(options)
      .from(element)
      .toPdf()
      .get("pdf")
      .then((pdf: any) => {
        window.open(pdf.output("bloburl"));
      });
  };

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    if (!element) return; // Validación para evitar errores si el elemento no existe.

    const options = {
      margin: 0.5,
      filename: "factura.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="bg-gray-100 p-8">
      {/* Botones de acción */}
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={handleViewPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Visualizar PDF
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Descargar PDF
        </button>
      </div>

      {/* Contenido de la factura */}
      <div ref={invoiceRef} className="bg-white p-8 rounded shadow">
        {/* Encabezado */}
        <header className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Image
                src="/logo-hs-horizontal.png"
                alt="Logo"
                width={130}
                height={40}
                priority
              />
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold">HERMANOS FRIDEGOTTO Y CÍA</h1>
              <p className="text-sm">
                DOMICILIO FISCAL: CALLE CAMPESINA LOCAL NRO. S-N ZONA INDUSTRIAL
                SAN VICENTE II, MARACAY, EDO. ARAGUA
              </p>
              <p className="text-sm">EMAIL: servicio@ferinca.com</p>
            </div>
          </div>
        </header>

        {/* Detalles de Factura */}
        <section className="bg-white mt-4 p-4 rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-bold">Facturado a:</h2>
              <p className="text-sm">
                Nombre o Razón Social: TOYO KS C.A.
                <br />
                Domicilio Fiscal: Av. Miranda Este, C.C. Las Palmas, Nro. 148,
                Local N-5, Maracay, Edo. Aragua
                <br />
                C.I. o RIF: J-40550865-5
                <br />
                Teléfono: 04143449257
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                Factura N°: <strong>5401</strong>
              </p>
              <p className="text-sm">
                Fecha de Emisión: <strong>27/09/2024</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Detalle de Artículos */}
        <section className="bg-white mt-4 p-4 rounded shadow">
          <table className="w-full text-sm text-left border-collapse border border-gray-200">
            <thead className="bg-primaryGreen text-white">
              <tr>
                <th className="border border-gray-300 px-2 py-1">Código</th>
                <th className="border border-gray-300 px-2 py-1">Descripción</th>
                <th className="border border-gray-300 px-2 py-1 text-center">
                  Cant. Und
                </th>
                <th className="border border-gray-300 px-2 py-1 text-right">
                  Precio
                </th>
                <th className="border border-gray-300 px-2 py-1 text-right">
                  IVA
                </th>
                <th className="border border-gray-300 px-2 py-1 text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1">1</td>
                <td className="border border-gray-300 px-2 py-1">
                  Canon de Arrendamiento mes de Septiembre 2024
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">1</td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  8,111.40
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  1,297.82
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  9,409.22
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1">2</td>
                <td className="border border-gray-300 px-2 py-1">
                  Canon de Arrendamiento mes de Septiembre 2024 (Local
                  J-40550865-51)
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">1</td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  9,217.50
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  1,474.80
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  10,692.30
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Forma de Pago y Totales */}
        <section className="bg-white mt-4 p-4 rounded shadow">
          <div className="grid grid-cols-3 gap-4">
            {/* Forma de Pago */}
            <div>
              <h2 className="text-lg font-bold">FORMA DE PAGO</h2>
              <table className="w-full text-sm border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">DIVISAS</td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      $470
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      17,328.90
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">CHEQUE</td>
                    <td className="border border-gray-300 px-2 py-1 text-right"></td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      0.00
                    </td>
                    </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">TDC</td>
                    <td className="border border-gray-300 px-2 py-1 text-right"></td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      0.00
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">TDD</td>
                    <td className="border border-gray-300 px-2 py-1 text-right"></td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      0.00
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      TRANSFERENCIA
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right"></td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      346.58
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notas */}
            <div className="text-sm flex flex-col justify-center gap-4">
              <p className="font-bold">
                Según dispone el Art. 25 de la ley del IVA y el Art. 38 del
                Régimen de la Ley Tasa de cambio de referencia BCV de 15 equivale
                a Bs. 36.87.
              </p>
              <p>
                Cumpliendo lo establecido en Gaceta Oficial N° 6.687 del 25 de
                febrero de 2022 y Providencia Administrativa SENIAT N° 42.393 del
                17 de marzo de 2022. Se detalla el monto correspondiente a IGTF
                3%.
              </p>
            </div>

            {/* Totales */}
            <div>
              <table className="w-full text-sm border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      Base Imponible Bs:
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      17,328.90
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      IVA (16%) Bs:
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      2,772.62
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      Total Factura Bs:
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      20,101.52
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      IGTF (3%) Bs:
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      518.07
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      Retención ISLR (6%) Bs:
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      868.96
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">
                      Retención IVA (75%) Bs:
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      2,079.47
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1 font-bold">
                      Total a Pagar:
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right font-bold">
                      17,675.45
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <footer className="text-center text-sm mt-4">
          <p>Términos y Condiciones</p>
        </footer>
      </div>
    </div>
  );
};

export default InvoicePage;
