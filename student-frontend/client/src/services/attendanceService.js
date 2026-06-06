import api from "./api";

// ====================================
// GET ALL ATTENDANCE
// ====================================

export const getAttendance = async () => {
  try {
    const response = await api.get(
      "/attendance"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get Attendance Error:",
      error
    );

    throw error;
  }
};

// ====================================
// GET TODAY ATTENDANCE
// ====================================

export const getTodayAttendance =
  async () => {
    try {
      const response =
        await api.get(
          "/attendance/today"
        );

      return response.data;
    } catch (error) {
      console.error(
        "Get Today Attendance Error:",
        error
      );

      throw error;
    }
  };

// ====================================
// SAVE ATTENDANCE
// ====================================

export const saveAttendance =
  async (attendanceData) => {
    try {
      const response =
        await api.post(
          "/attendance",
          attendanceData
        );

      return response.data;
    } catch (error) {
      console.error(
        "Save Attendance Error:",
        error
      );

      throw error;
    }
  };

// ====================================
// GET ATTENDANCE STATS
// ====================================

export const getAttendanceStats =
  async () => {
    try {
      const response =
        await api.get(
          "/attendance/stats"
        );

      return response.data;
    } catch (error) {
      console.error(
        "Attendance Stats Error:",
        error
      );

      throw error;
    }
  };

// ====================================
// GET STUDENT ATTENDANCE
// ====================================

export const getStudentAttendance =
  async (studentId) => {
    try {
      const response =
        await api.get(
          `/attendance/student/${studentId}`
        );

      return response.data;
    } catch (error) {
      console.error(
        "Student Attendance Error:",
        error
      );

      throw error;
    }
  };