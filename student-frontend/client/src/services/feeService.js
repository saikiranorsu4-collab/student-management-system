import axios from "axios";

// ====================================
// API BASE URL
// ====================================

const API_URL =
  "http://localhost:5000/api/fees";

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
// GET ALL FEES
// ====================================

export const getFees =
  async () => {

    try {

      const response =
        await api.get("/");

      return response.data;

    } catch (error) {

      console.error(
        "Get Fees Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// GET STUDENT FEES
// ====================================

export const getStudentFees =
  async (studentId) => {

    try {

      const response =
        await api.get(
          `/student/${studentId}`
        );

      return response.data;

    } catch (error) {

      console.error(
        "Get Student Fees Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// GET MY FEES
// ====================================

export const getMyFees =
  async () => {

    try {

      const response =
        await api.get(
          "/my-fees"
        );

      return response.data;

    } catch (error) {

      console.error(
        "Get My Fees Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// CREATE FEE
// ====================================

export const createFee =
  async (feeData) => {

    try {

      const response =
        await api.post(
          "/",
          feeData
        );

      return response.data;

    } catch (error) {

      console.error(
        "Create Fee Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// UPDATE FEE
// ====================================

export const updateFee =
  async (
    id,
    feeData
  ) => {

    try {

      const response =
        await api.put(
          `/${id}`,
          feeData
        );

      return response.data;

    } catch (error) {

      console.error(
        "Update Fee Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// COLLECT PAYMENT
// ====================================

export const collectPayment =
  async (
    feeId,
    amount
  ) => {

    try {

      const response =
        await api.put(

          `/pay/${feeId}`,

          {
            amount,
          }

        );

      return response.data;

    } catch (error) {

      console.error(
        "Collect Payment Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// DELETE FEE
// ====================================

export const deleteFee =
  async (id) => {

    try {

      const response =
        await api.delete(
          `/${id}`
        );

      return response.data;

    } catch (error) {

      console.error(
        "Delete Fee Error:",
        error
      );

      throw error;

    }

  };

// ====================================
// GET SINGLE FEE
// ====================================

export const getFeeById =
  async (id) => {

    try {

      const response =
        await api.get(
          `/${id}`
        );

      return response.data;

    } catch (error) {

      console.error(
        "Get Fee By ID Error:",
        error
      );

      throw error;

    }

  };