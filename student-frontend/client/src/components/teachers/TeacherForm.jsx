import { useState } from "react";

function TeacherForm({
  onSubmit,
  onClose,
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      qualification: "",
      experience: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({
      ...formData,
      experience:
        Number(
          formData.experience
        ) || 0,
    });

  };

  return (

    <div
      className="
      fixed inset-0
      bg-black/60
      flex items-center
      justify-center
      z-50
    "
    >

      <div
        className="
        bg-[#0F172A]
        p-6
        rounded-3xl
        w-[550px]
        border
        border-gray-800
      "
      >

        <h2
          className="
          text-3xl
          font-bold
          mb-6
        "
        >
          Add Teacher
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Teacher Name"
            value={formData.name}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-[#111827]
              border
              border-gray-700
            "
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-[#111827]
              border
              border-gray-700
            "
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-[#111827]
              border
              border-gray-700
            "
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-[#111827]
              border
              border-gray-700
            "
            required
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-[#111827]
              border
              border-gray-700
            "
            required
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            value={formData.experience}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-[#111827]
              border
              border-gray-700
            "
          />

          <div
            className="
            flex
            gap-3
            pt-2
          "
          >

            <button
              type="submit"
              className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              font-medium
            "
            >
              Save Teacher
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
              px-6
              py-3
              rounded-xl
              bg-gray-700
              font-medium
            "
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default TeacherForm;