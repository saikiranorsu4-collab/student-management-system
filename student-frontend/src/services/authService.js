import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

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