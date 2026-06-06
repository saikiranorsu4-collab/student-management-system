import { useState } from "react";

function AddStudentModal({
  isOpen,
  onClose,
  onAdd,
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      course: "",
      age: "",
    });

  if (!isOpen) return null;

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await onAdd(formData);

      setFormData({
        name: "",
        email: "",
        course: "",
        age: "",
      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      className="
        fixed inset-0
        bg-black/60
        flex items-center justify-center
        z-50
      "
    >

      <div
        className="
          bg-[#111827]
          p-8
          rounded-2xl
          w-[420px]
          border border-gray-800
        "
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <h1 className="text-3xl font-bold text-white">
            Add Student
          </h1>

          <button
            onClick={onClose}
            className="
              text-gray-400
              text-2xl
            "
          >
            ×
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="
              bg-[#1F2937]
              p-4
              rounded-xl
              outline-none
              text-white
            "
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              bg-[#1F2937]
              p-4
              rounded-xl
              outline-none
              text-white
            "
          />

          {/* COURSE */}
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
            className="
              bg-[#1F2937]
              p-4
              rounded-xl
              outline-none
              text-white
            "
          />

          {/* AGE */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            className="
              bg-[#1F2937]
              p-4
              rounded-xl
              outline-none
              text-white
            "
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="
              bg-purple-600
              hover:bg-purple-700
              p-4
              rounded-xl
              font-semibold
              transition-all
            "
          >
            Add Student
          </button>

        </form>

      </div>

    </div>

  );
}

export default AddStudentModal;