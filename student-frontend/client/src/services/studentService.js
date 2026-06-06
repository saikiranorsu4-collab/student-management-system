import api from "./api";

// ======================================
// GET ALL STUDENTS
// ======================================

export const getStudents =
  async () => {

    const response =
      await api.get(
        "/students"
      );

    return response.data;
  };

// ======================================
// GET STUDENT BY ID
// ======================================

export const getStudentById =
  async (id) => {

    const response =
      await api.get(
        `/students/${id}`
      );

    return response.data;
  };

// ======================================
// CREATE STUDENT
// ======================================

export const createStudent =
  async (studentData) => {

    const response =
      await api.post(
        "/students",
        studentData
      );

    return response.data;
  };

// ======================================
// UPDATE STUDENT
// ======================================

export const updateStudent =
  async (
    id,
    studentData
  ) => {

    const response =
      await api.put(
        `/students/${id}`,
        studentData
      );

    return response.data;
  };

// ======================================
// DELETE STUDENT
// ======================================

export const deleteStudent =
  async (id) => {

    const response =
      await api.delete(
        `/students/${id}`
      );

    return response.data;
  };

// ======================================
// MY PROFILE
// ======================================

export const getMyProfile =
  async () => {

    const response =
      await api.get(
        "/students/profile/me"
      );

    return response.data;
  };

// ======================================
// UPDATE MY PROFILE
// ======================================

export const updateMyProfile =
  async (data) => {

    const response =
      await api.put(
        "/students/profile/update",
        data
      );

    return response.data;
  };