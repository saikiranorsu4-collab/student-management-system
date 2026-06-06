import {
  useEffect,
  useState,
} from "react";

import ReportsCards from "../../components/reports/ReportsCards";
import AttendanceChart from "../../components/reports/AttendanceChart";
import FeeChart from "../../components/reports/FeeChart";
import DepartmentChart from "../../components/reports/DepartmentChart";

import { getReportsData } from "../../services/reportService";

function Reports() {
  const [reportData, setReportData] =
    useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports =
    async () => {
      try {
        const data =
          await getReportsData();

        setReportData(data);
      } catch (error) {
        console.log(error);
      }
    };

  if (!reportData)
    return (
      <div className="text-center py-20">
        Loading Reports...
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-5xl font-bold">
          Reports Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Analytics & Insights
        </p>
      </div>

      <ReportsCards
        reportData={reportData}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <AttendanceChart
          reportData={reportData}
        />

        <FeeChart
          reportData={reportData}
        />
      </div>

      <DepartmentChart
        reportData={reportData}
      />
    </div>
  );
}

export default Reports;