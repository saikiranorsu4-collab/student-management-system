import { create } from "zustand";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

const useStudentStore = create(
  (set) => ({

    students: [],

    loading: false,

    error: null,

    // ==========================
    // FETCH STUDENTS
    // ==========================

    fetchStudents: async () => {

      try {

        set({
          loading: true,
          error: null,
        });

        const data =
          await getStudents();

        set({

          students: data,

          loading: false,

        });

      } catch (error) {

        console.log(error);

        set({

          loading: false,

          error:
            error.message,

        });

      }

    },

    // ==========================
    // ADD STUDENT
    // ==========================

    addStudent: async (
      studentData
    ) => {

      try {

        set({
          loading: true,
        });

        await createStudent(
          studentData
        );

        const data =
          await getStudents();

        set({

          students: data,

          loading: false,

        });

      } catch (error) {

        console.log(error);

        set({

          loading: false,

          error:
            error.message,

        });

      }

    },

    // ==========================
    // UPDATE STUDENT
    // ==========================

    editStudent: async (
      id,
      studentData
    ) => {

      try {

        set({
          loading: true,
        });

        await updateStudent(
          id,
          studentData
        );

        const data =
          await getStudents();

        set({

          students: data,

          loading: false,

        });

      } catch (error) {

        console.log(error);

        set({

          loading: false,

          error:
            error.message,

        });

      }

    },

    // ==========================
    // DELETE STUDENT
    // ==========================

    removeStudent: async (
      id
    ) => {

      try {

        set({
          loading: true,
        });

        await deleteStudent(
          id
        );

        const data =
          await getStudents();

        set({

          students: data,

          loading: false,

        });

      } catch (error) {

        console.log(error);

        set({

          loading: false,

          error:
            error.message,

        });

      }

    },

  })
);

export default useStudentStore;