import axios from "axios";

// LIVE BACKEND URL
const API_URL = "https://student-backend-2dnf.onrender.com/api/auth";

// REGISTER USER
export const registerUser = async (userData) => {
  return await axios.post(
    `${API_URL}/register`,
    userData
  );
};

// LOGIN USER
export const loginUser = async (userData) => {
  return await axios.post(
    `${API_URL}/login`,
    userData
  );
};