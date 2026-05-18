import axios from "axios";

const API_URL =
  "https://student-backend-2dnf.onrender.com/api/students";

// GET TOKEN
const getToken = () => {
  return localStorage.getItem("token");
};

// COMMON AUTH HEADER
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// GET ALL STUDENTS
export const getStudents = async () => {
  return await axios.get(
    API_URL,
    authHeader()
  );
};

// ADD STUDENT
export const addStudent = async (studentData) => {
  return await axios.post(
    API_URL,
    studentData,
    authHeader()
  );
};

// DELETE STUDENT
export const deleteStudent = async (id) => {
  return await axios.delete(
    `${API_URL}/${id}`,
    authHeader()
  );
};

// UPDATE STUDENT
export const updateStudent = async (
  id,
  studentData
) => {
  return await axios.put(
    `${API_URL}/${id}`,
    studentData,
    authHeader()
  );
};