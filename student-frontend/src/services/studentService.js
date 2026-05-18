import axios from "axios";

const API_URL =
  "https://student-backend-2dnf.onrender.com/api/students";

// GET TOKEN
const getToken = () => {
  return localStorage.getItem("token");
};

// GET ALL STUDENTS
export const getStudents = async () => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// ADD STUDENT
export const addStudent = async (studentData) => {
  return await axios.post(
    API_URL,
    studentData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

// DELETE STUDENT
export const deleteStudent = async (id) => {
  return await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};