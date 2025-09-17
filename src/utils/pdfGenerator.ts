import jsPDF from 'jspdf';
import { sanitizeFormData } from './inputSanitizer';

interface PDFData {
  title: string;
  content: { [key: string]: string };
}

export const generatePDF = (data: PDFData) => {
  // Sanitize all input data before processing
  const sanitizedData = sanitizeFormData(data, { maxLength: 5000 });
  const doc = new jsPDF();
  
  // Configuración inicial
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = 30;

  // Título principal
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(sanitizedData.title, margin, yPosition);
  yPosition += 20;

  // Línea separadora
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;

  // Contenido
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  Object.entries(sanitizedData.content).forEach(([key, value]) => {
    // Título de la sección
    doc.setFont('helvetica', 'bold');
    doc.text(key + ':', margin, yPosition);
    yPosition += 8;

    // Contenido de la sección
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(value, maxWidth);
    
    lines.forEach((line: string) => {
      if (yPosition > 270) { // Nueva página si es necesario
        doc.addPage();
        yPosition = 30;
      }
      doc.text(line, margin, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10; // Espacio entre secciones
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Design Thinking Toolkit - Página ${i} de ${pageCount}`,
      margin,
      doc.internal.pageSize.height - 15
    );
    doc.text(
      new Date().toLocaleDateString('es-ES'),
      pageWidth - margin - 30,
      doc.internal.pageSize.height - 15
    );
  }

  return doc;
};