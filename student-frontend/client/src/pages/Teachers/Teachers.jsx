import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  GraduationCap,
  Plus,
} from "lucide-react";

import TeacherTable from "../../components/teachers/TeacherTable";
import TeacherForm from "../../components/teachers/TeacherForm";




import {
  getTeachers,
  addTeacher,
  deleteTeacher,
} from "../../services/teacherService";

function Teachers() {
  
  
  
  const [teachers, setTeachers] =
    useState([]);

  const [openModal, setOpenModal] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const teachersPerPage = 5;

  useEffect(() => {

    loadTeachers();

  }, []);

  const loadTeachers =
    async () => {

      try {

        const data =
          await getTeachers();

        setTeachers(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load teachers"
        );

      }

    };

  const handleAddTeacher =
    async (teacherData) => {

      try {

        await addTeacher(
          teacherData
        );

        toast.success(
          "Teacher Added Successfully"
        );

      
        setOpenModal(false);

        loadTeachers();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add teacher"
        );

      }

    };

  const handleDeleteTeacher =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this teacher?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteTeacher(id);

        toast.success(
          "Teacher Deleted"
        );

       

        loadTeachers();

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete Failed"
        );

      }

    };

  const totalTeachers =
    teachers.length;

  const activeTeachers =
    teachers.filter(
      (teacher) =>
        teacher.status ===
        "Active"
    ).length;

    
  // PAGINATION

  const indexOfLastTeacher =
    currentPage *
    teachersPerPage;

  const indexOfFirstTeacher =
    indexOfLastTeacher -
    teachersPerPage;

  const currentTeachers =
  teachers.slice(
      indexOfFirstTeacher,
      indexOfLastTeacher
    );

  const totalPages =
  Math.ceil(
    teachers.length /
    teachersPerPage
  );

  return (

    <div className="space-y-6">

      <div
        className="
        flex justify-between items-center
      "
      >

        <div>

          <h1 className="text-4xl font-bold">
            Teachers
          </h1>

          <p className="text-gray-400 mt-2">
            Manage teachers
          </p>

        </div>

        <button
          onClick={() =>
            setOpenModal(true)
          }
          className="
          flex items-center gap-2
          px-5 py-3
          rounded-xl
          bg-gradient-to-r
          from-purple-600
          to-pink-500
        "
        >
          <Plus size={18} />
          Add Teacher
        </button>

      </div>

      <div
        className="
        grid md:grid-cols-2 gap-5
      "
      >

        <div
          className="
          bg-[#0F172A]
          border border-gray-800
          rounded-3xl
          p-6
        "
        >

          <GraduationCap
            size={34}
            className="
            text-purple-500 mb-3
          "
          />

          <h2 className="text-3xl font-bold">
            {totalTeachers}
          </h2>

          <p className="text-gray-400">
            Total Teachers
          </p>

        </div>

        <div
          className="
          bg-[#0F172A]
          border border-gray-800
          rounded-3xl
          p-6
        "
        >

          <GraduationCap
            size={34}
            className="
            text-green-500 mb-3
          "
          />

          <h2 className="text-3xl font-bold">
            {activeTeachers}
          </h2>

          <p className="text-gray-400">
            Active Teachers
          </p>

        </div>

      </div>

      <TeacherTable
        teachers={currentTeachers}
        onDelete={
          handleDeleteTeacher
        }
      />

      {/* PAGINATION */}

      <div
        className="
        flex justify-center gap-2 mt-6
      "
      >

        {[...Array(totalPages)].map(
          (_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrentPage(
                  index + 1
                )
              }
              className={`
                px-4 py-2 rounded-lg

                ${
                  currentPage ===
                  index + 1
                    ? "bg-purple-600"
                    : "bg-[#0F172A]"
                }
              `}
            >
              {index + 1}
            </button>

          )
        )}

      </div>

      {openModal && (

        <TeacherForm
          onSubmit={
            handleAddTeacher
          }
          onClose={() =>
            setOpenModal(false)
          }
        />

      )}

    </div>

  );

}

export default Teachers;