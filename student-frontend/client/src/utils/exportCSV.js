export const exportToCSV = (
  data,
  filename = "report"
) => {
  if (!data || data.length === 0) {
    return;
  }

  const headers = Object.keys(data[0]);

  const csvRows = [];

  csvRows.push(headers.join(","));

  data.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header] ?? "";
      return `"${value}"`;
    });

    csvRows.push(values.join(","));
  });

  const csvString = csvRows.join("\n");

  const blob = new Blob(
    [csvString],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `${filename}.csv`;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  window.URL.revokeObjectURL(
    url
  );
};

/* STUDENTS */
export const exportStudentsCSV = (
  data
) => {
  exportToCSV(
    data,
    "Students_Report"
  );
};

/* TEACHERS */
export const exportTeachersCSV = (
  data
) => {
  exportToCSV(
    data,
    "Teachers_Report"
  );
};

/* FEES */
export const exportFeesCSV = (
  data
) => {
  exportToCSV(
    data,
    "Fees_Report"
  );
};