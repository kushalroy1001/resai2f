// src/services/pdfService.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generate a PDF from a DOM element
 * @param {HTMLElement} element - The DOM element to convert to PDF
 * @param {string} fileName - The name of the PDF file
 * @param {Object} options - Additional options for PDF generation
 * @returns {Promise<void>}
 */
export const generatePDF = async (element, fileName = 'resume.pdf', options = {}) => {
  if (!element) {
    throw new Error('Element to convert to PDF is required');
  }

  try {
    // Set default options
    const defaultOptions = {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff'
    };

    // Merge options
    const canvasOptions = { ...defaultOptions, ...options };
    
    // Create canvas from the element
    const canvas = await html2canvas(element, canvasOptions);
    
    // Calculate PDF dimensions (A4 format)
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Initialize PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    
    // Add image to PDF (handling multi-page if needed)
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    
    // If the resume is longer than one page, create additional pages
    const heightLeft = imgHeight - pageHeight;
    
    if (heightLeft > 0) {
      let heightRemaining = heightLeft;
      let currentPosition = -pageHeight;
      
      while (heightRemaining > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, currentPosition, imgWidth, imgHeight);
        heightRemaining -= pageHeight;
        currentPosition -= pageHeight;
      }
    }
    
    // Save the PDF
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Generate a PDF from a resume template
 * @param {string} templateId - The ID of the template container
 * @param {string} fileName - The name of the PDF file
 * @returns {Promise<boolean>} - Whether the PDF was generated successfully
 */
export const downloadResumePDF = async (templateId, fileName = 'resume.pdf') => {
  try {
    // Get the template element
    const element = document.getElementById(templateId);
    
    if (!element) {
      throw new Error(`Template element with ID "${templateId}" not found`);
    }
    
    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Apply print-specific styling
    clone.style.width = '210mm'; // A4 width
    clone.style.margin = '0';
    clone.style.padding = '0';
    
    // Temporarily append to body but hide it
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    // Generate PDF from the clone
    await generatePDF(clone, fileName);
    
    // Remove the clone
    document.body.removeChild(clone);
    
    return true;
  } catch (error) {
    console.error('Error downloading resume PDF:', error);
    return false;
  }
};

export default {
  generatePDF,
  downloadResumePDF
};
