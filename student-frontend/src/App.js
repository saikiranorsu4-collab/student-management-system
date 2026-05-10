import React, { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
  });

  // FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD STUDENT
  const addStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Student Added Successfully!");

        setFormData({
          name: "",
          email: "",
          course: "",
          age: "",
        });

        fetchStudents();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });

      alert("🗑 Student Deleted Successfully!");

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(to right, #0f172a, #1e3a5f)",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1
          style={{
            fontSize: "65px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          🎓 Student Management System
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#d1d5db",
          }}
        >
          MERN Stack Internship Project
        </p>
      </div>

      {/* FORM */}
      <div
        style={{
          background: "#334155",
          padding: "40px",
          borderRadius: "25px",
          maxWidth: "900px",
          margin: "auto",
          marginBottom: "60px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontSize: "45px",
          }}
        >
          ➕ Add Student
        </h2>

        <form onSubmit={addStudent}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="course"
            placeholder="Enter Course"
            value={formData.course}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Add Student
          </button>
        </form>
      </div>

      {/* STUDENT LIST */}
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "45px",
        }}
      >
        📚 Student List
      </h2>

      {students.length === 0 ? (
        <p>No Students Found</p>
      ) : (
        students.map((student) => (
          <div
            key={student._id}
            style={{
              background: "#334155",
              padding: "30px",
              borderRadius: "25px",
              marginBottom: "30px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              style={{
                color: "#60a5fa",
                fontSize: "35px",
              }}
            >
              {student.name}
            </h3>

            <p style={textStyle}>
              📧 <b>Email:</b> {student.email}
            </p>

            <p style={textStyle}>
              📘 <b>Course:</b> {student.course}
            </p>

            <p style={textStyle}>
              🎂 <b>Age:</b> {student.age}
            </p>

            <div style={{ marginTop: "20px" }}>
              <button style={buttonStyle}>Edit</button>

              <button
                onClick={() => deleteStudent(student._id)}
                style={{
                  ...buttonStyle,
                  background: "#dc2626",
                  marginLeft: "15px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// INPUT STYLE
const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "none",
  fontSize: "18px",
};

// BUTTON STYLE
const buttonStyle = {
  padding: "15px 30px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold",
};

// TEXT STYLE
const textStyle = {
  fontSize: "24px",
  marginBottom: "15px",
};

export default App;