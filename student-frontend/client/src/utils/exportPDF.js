import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (
  columns,
  data,
  title = "Report"
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(
    title,
    14,
    20
  );

  autoTable(doc, {
    head: [columns],
    body: data,
    startY: 30,
  });

  doc.save(
    `${title}.pdf`
  );
};

export const exportStudentsPDF = (
  columns,
  data
) => {
  exportToPDF(
    columns,
    data,
    "Students_Report"
  );
};

export const exportTeachersPDF = (
  columns,
  data
) => {
  exportToPDF(
    columns,
    data,
    "Teachers_Report"
  );
};

export const exportFeesPDF = (
  columns,
  data
) => {
  exportToPDF(
    columns,
    data,
    "Fees_Report"
  );
};