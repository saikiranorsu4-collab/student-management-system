import api from "./api";

export const getDashboardStats =
  async () => {

    const students =
      await api.get("/students");

    return {
      totalStudents:
        students.data.length,
    };

  };