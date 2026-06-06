import api from "./api";


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
// GET ALL TEACHERS
// ====================================

export const getTeachers =
  async () => {

    try {

      const response =
       await api.get("/teachers");
      return response.data;

    } catch (error) {

      console.error(
        "Get Teachers Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// ADD TEACHER
// ====================================

export const addTeacher =
  async (teacherData) => {

    try {

      const response =
        await api.post(
          "/teachers",
          teacherData
        );

      return response.data;

    } catch (error) {

      console.error(
        "Add Teacher Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// UPDATE TEACHER
// ====================================

export const updateTeacher =
  async (
    id,
    teacherData
  ) => {

    try {

      const response =
        await api.put(
          `/${id}`,
          teacherData
        );

      return response.data;

    } catch (error) {

      console.error(
        "Update Teacher Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// DELETE TEACHER
// ====================================

export const deleteTeacher =
  async (id) => {

    try {

      const response =
        await api.delete(
          `/${id}`
        );

      return response.data;

    } catch (error) {

      console.error(
        "Delete Teacher Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// GET SINGLE TEACHER
// ====================================

export const getTeacherById =
  async (id) => {

    try {

      const response =
        await api.get(
          `/${id}`
        );

      return response.data;

    } catch (error) {

      console.error(
        "Get Teacher Error:",
        error
      );

      throw error;

    }

  };