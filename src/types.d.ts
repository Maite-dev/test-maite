// Declaración para 'jspdf'
declare module "jspdf" {
    interface jsPDF {
      lastAutoTable?: {
        finalY: number;
      };
    }
  }
  
  // Declaración para 'html2pdf.js'
  declare module "html2pdf.js" {
    const html2pdf: any;
    export default html2pdf;
  }
  