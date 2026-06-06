import api from "./api";

// LOGIN

export const loginUser =
  async (formData) => {

    const response =
      await api.post(
        "/auth/login",
        formData
      );

    return response.data;
  };

// CHANGE PASSWORD

export const changePassword =
  async (
    currentPassword,
    newPassword
  ) => {

    const response =
      await api.put(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
        }
      );

    return response.data;
  };