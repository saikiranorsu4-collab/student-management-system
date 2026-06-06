import * as XLSX from "xlsx";

export const exportToExcel = (
  data,
  fileName = "report"
) => {
  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Sheet1"
  );

  XLSX.writeFile(
    workbook,
    `${fileName}.xlsx`
  );
};

export const exportStudentsExcel = (
  data
) => {
  exportToExcel(
    data,
    "Students_Report"
  );
};

export const exportTeachersExcel = (
  data
) => {
  exportToExcel(
    data,
    "Teachers_Report"
  );
};

export const exportFeesExcel = (
  data
) => {
  exportToExcel(
    data,
    "Fees_Report"
  );
};