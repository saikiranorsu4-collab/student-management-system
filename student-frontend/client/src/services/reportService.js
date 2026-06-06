import { getStudents } from "./studentService";
import { getTeachers } from "./teacherService";
import { getAttendance } from "./attendanceService";
import { getFees } from "./feeService";

export const getReportsData = async () => {
  const [
    students,
    teachers,
    attendance,
    fees,
  ] = await Promise.all([
    getStudents(),
    getTeachers(),
    getAttendance(),
    getFees(),
  ]);

  return {
    students,
    teachers,
    attendance,
    fees,
  };
};