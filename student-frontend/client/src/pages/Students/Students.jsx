import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Search,
  Plus,
  Users,
  UserCheck,
  Building2,
} from "lucide-react";

import {
  exportStudentsExcel,
} from "../../utils/exportExcel";

import {
  exportStudentsPDF,
} from "../../utils/exportPDF";

import {
  exportStudentsCSV,
} from "../../utils/exportCSV";

import { useAuth } from "../../context/AuthContext";

import StudentTable from "../../components/students/StudentTable";

import AddStudentModal from "../../components/students/AddStudentModal";

import EditStudentModal from "../../components/students/EditStudentModal";

import Loader from "../../components/common/Loader";


import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/studentService";

function Students() {



  const { user } =
    useAuth();

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [isAddOpen, setIsAddOpen] =
    useState(false);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const studentsPerPage = 5;

  const fetchStudents =
    async () => {

      try {

        setLoading(true);

        const data =
          await getStudents();

        setStudents(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to fetch students"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchStudents();

  }, []);

  const handleAddStudent =
    async (studentData) => {

      try {

        await createStudent(
          studentData
        );

        toast.success(
          "Student Added Successfully"
        );

      

        fetchStudents();

        setIsAddOpen(false);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add student"
        );

      }

    };

  const handleDelete =
    async (id) => {

      try {

        await deleteStudent(id);

        toast.success(
          "Student Deleted"
        );

      
        fetchStudents();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to delete student"
        );

      }

    };

  const handleEditClick =
    (student) => {

      setSelectedStudent(
        student
      );

      setIsEditOpen(true);

    };

  const handleUpdateStudent =
    async (
      id,
      studentData
    ) => {

      try {

        await updateStudent(
          id,
          studentData
        );

        toast.success(
          "Student Updated Successfully"
        );

        fetchStudents();

        setIsEditOpen(false);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update student"
        );

      }

    };

 const filteredStudents =
  students.filter((student) => {

    const query =
      search.toLowerCase();

      return (

        student.rollNumber
          ?.toLowerCase()
          .includes(query) ||

        student.name
          ?.toLowerCase()
          .includes(query) ||

        student.email
          ?.toLowerCase()
          .includes(query) ||

        student.phone
          ?.toLowerCase()
          .includes(query) ||

        student.course
          ?.toLowerCase()
          .includes(query) ||

        student.department
          ?.toLowerCase()
          .includes(query) ||

        student.year
          ?.toLowerCase()
          .includes(query) ||

        student.section
          ?.toLowerCase()
          .includes(query)

      );

    });

  const indexOfLastStudent =
    currentPage *
    studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent -
    studentsPerPage;

  const currentStudents =
    filteredStudents.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );

  const totalPages =
    Math.ceil(
      filteredStudents.length /
      studentsPerPage
    );

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="text-white">

      {/* HEADER */}

      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-5
        mb-8
      "
      >

        <div>

          <h1 className="text-4xl font-bold">
            Students
          </h1>

          <p className="text-gray-400 mt-2">

            {user?.role === "admin"
              ? "Manage student records and operations"
              : "View student records"}

          </p>

        </div>

        {user?.role === "admin" && (

          <button
            onClick={() =>
              setIsAddOpen(true)
            }
            className="
            bg-gradient-to-r
            from-purple-600
            to-pink-500
            px-5
            py-3
            rounded-xl
            flex
            items-center
            gap-2
          "
          >

            <Plus size={18} />

            Add Student

          </button>

        )}

      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        mb-6
      "
      >

        <div
          className="
          bg-[#0F172A]
          border
          border-gray-800
          rounded-2xl
          p-5
        "
        >

          <Users
            size={30}
            className="mb-3 text-purple-500"
          />

          <h2 className="text-3xl font-bold">
            {students.length}
          </h2>

          <p className="text-gray-400 mt-2">
            Total Students
          </p>

        </div>

        <div
          className="
          bg-[#0F172A]
          border
          border-gray-800
          rounded-2xl
          p-5
        "
        >

          <UserCheck
            size={30}
            className="mb-3 text-green-500"
          />

          <h2 className="text-3xl font-bold">

            {
              students.filter(
                (student) =>
                  student.status ===
                  "Active"
              ).length
            }

          </h2>

          <p className="text-gray-400 mt-2">
            Active Students
          </p>

        </div>

        <div
          className="
          bg-[#0F172A]
          border
          border-gray-800
          rounded-2xl
          p-5
        "
        >

          <Building2
            size={30}
            className="mb-3 text-blue-500"
          />

          <h2 className="text-3xl font-bold">

            {
              new Set(
                students.map(
                  (student) =>
                    student.department
                )
              ).size
            }

          </h2>

          <p className="text-gray-400 mt-2">
            Departments
          </p>

        </div>

      </div>

{/* SEARCH + EXPORT */}

<div
  className="
  bg-[#0F172A]
  border
  border-gray-800
  rounded-2xl
  p-4
  mb-6
"
>

  <div
    className="
    flex
    flex-col
    md:flex-row
    md:justify-between
    md:items-center
    gap-4
  "
  >

    

    {/* EXPORT BUTTONS */}

  <div
  className="
  flex
  flex-wrap
  justify-start
  md:justify-end
  gap-3
"
>

      <button
        onClick={() =>
          exportStudentsExcel(
            students
          )
        }
        className="
        px-4
        py-2
        bg-green-600
        rounded-xl
        font-medium
      "
      >
        Export Excel
      </button>

      <button
        onClick={() =>
          exportStudentsPDF(
            students
          )
        }
        className="
        px-4
        py-2
        bg-red-600
        rounded-xl
        font-medium
      "
      >
        Export PDF
      </button>

      <button
        onClick={() =>
          exportStudentsCSV(
            students
          )
        }
        className="
        px-4
        py-2
        bg-blue-600
        rounded-xl
        font-medium
      "
      >
        Export CSV
      </button>

    </div>

  </div>

</div>

      {/* TABLE */}

      <StudentTable
        students={currentStudents}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />

      {/* PAGINATION */}

      <div
        className="
        flex
        justify-center
        gap-2
        mt-6
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

      {/* MODALS */}

      {user?.role === "admin" && (

        <>
          <AddStudentModal
            isOpen={isAddOpen}
            onClose={() =>
              setIsAddOpen(false)
            }
            onAdd={handleAddStudent}
          />

          <EditStudentModal
            isOpen={isEditOpen}
            onClose={() =>
              setIsEditOpen(false)
            }
            student={selectedStudent}
            onUpdate={
              handleUpdateStudent
            }
          />
        </>

      )}

    </div>

  );

}

export default Students;