import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../services/studentService";

function Dashboard() {

  const navigate = useNavigate();

  // GET USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // STATES
  const [students, setStudents] = useState([]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
  });

  const [editStudent, setEditStudent] =
    useState(null);

  // FETCH STUDENTS
  const fetchStudents = async () => {

    try {

      const response =
        await getStudents();

      setStudents(response.data);

    } catch (error) {

      alert("Unauthorized");

      navigate("/");
    }
  };

  // LOAD STUDENTS
  useEffect(() => {

    fetchStudents();

    // eslint-disable-next-line
  }, []);

  // LOGOUT
  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  // ADD STUDENT
  const handleAddStudent = async (e) => {

    e.preventDefault();

    try {

      await addStudent(newStudent);

      alert("Student Added");

      setNewStudent({
        name: "",
        email: "",
        course: "",
        age: "",
      });

      fetchStudents();

    } catch (error) {

      alert("Failed To Add Student");
    }
  };

  // DELETE STUDENT
  const handleDelete = async (id) => {

    try {

      await deleteStudent(id);

      alert("Student Deleted");

      fetchStudents();

    } catch (error) {

      alert("Delete Failed");
    }
  };

  // EDIT CLICK
  const handleEditClick = (student) => {

    setEditStudent(student);
  };

  // UPDATE STUDENT
  const handleUpdateStudent = async (e) => {

    e.preventDefault();

    try {

      await updateStudent(
        editStudent._id,
        editStudent
      );

      alert("Student Updated");

      setEditStudent(null);

      fetchStudents();

    } catch (error) {

      alert("Update Failed");
    }
  };

  return (
    <div className="container">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h1>Dashboard 🚀</h1>

          <p>
            Welcome {user?.name}
          </p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

      {/* ADD STUDENT */}

      <div className="form-card">

        <h2>Add Student</h2>

        <form onSubmit={handleAddStudent}>

          <input
            type="text"
            placeholder="Enter Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Enter Course"
            value={newStudent.course}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                course: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Enter Age"
            value={newStudent.age}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                age: e.target.value,
              })
            }
            required
          />

          <button type="submit">
            Add Student
          </button>

        </form>

      </div>

      {/* UPDATE STUDENT */}

      {editStudent && (

        <div className="form-card">

          <h2>Update Student</h2>

          <form onSubmit={handleUpdateStudent}>

            <input
              type="text"
              value={editStudent.name}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  name: e.target.value,
                })
              }
              required
            />

            <input
              type="email"
              value={editStudent.email}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  email: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              value={editStudent.course}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  course: e.target.value,
                })
              }
              required
            />

            <input
              type="number"
              value={editStudent.age}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  age: e.target.value,
                })
              }
              required
            />

            <button type="submit">
              Update Student
            </button>

          </form>

        </div>
      )}

      {/* STUDENT LIST */}

      <h2>Student List</h2>

      <div className="student-grid">

        {students.length === 0 ? (

          <p>No Students Found</p>

        ) : (

          students.map((student) => (

            <div
              key={student._id}
              className="student-card"
            >

              <h2>{student.name}</h2>

              <p>
                Email: {student.email}
              </p>

              <p>
                Course: {student.course}
              </p>

              <p>
                Age: {student.age}
              </p>

              <div className="card-buttons">

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEditClick(student)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(student._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;