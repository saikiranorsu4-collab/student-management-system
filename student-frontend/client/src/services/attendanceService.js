import axios from "axios";

// ====================================
// API BASE URL
// ====================================

const API_URL =
  "http://localhost:5000/api/attendance";

// ====================================
// AXIOS INSTANCE
// ====================================

const api = axios.create({

  baseURL: API_URL,

  headers: {
    "Content-Type":
      "application/json",
  },

});

// ====================================
// REQUEST INTERCEPTOR
// ====================================

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) =>
    Promise.reject(error)

);

// ====================================
// GET ALL ATTENDANCE
// ====================================

export const getAttendance =
  async () => {

    try {

      const response =
        await api.get("/");

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
          "/today"
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
          "/",
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
          "/stats"
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
          `/student/${studentId}`
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