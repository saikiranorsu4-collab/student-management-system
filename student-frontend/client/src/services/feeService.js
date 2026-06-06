import api from "./api";

// ====================================
// GET ALL FEES
// ====================================

export const getFees = async () => {
  try {
    const response = await api.get(
      "/fees"
    );

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
          `/fees/student/${studentId}`
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
          "/fees/my-fees"
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
          "/fees",
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
          `/fees/${id}`,
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
          `/fees/pay/${feeId}`,
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
          `/fees/${id}`
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
          `/fees/${id}`
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