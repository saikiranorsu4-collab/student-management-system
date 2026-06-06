import { useForm } from "react-hook-form";

function StudentForm({
  onSubmit,
  defaultValues,
}) {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
  });

  const submitHandler = (data) => {

    onSubmit(data);

    reset();

  };

  return (

    <form
      onSubmit={handleSubmit(submitHandler)}
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-4
    "
    >

      <input
        {...register("rollNumber")}
        placeholder="Roll Number"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("name")}
        placeholder="Student Name"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("email")}
        placeholder="Email"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("phone")}
        placeholder="Phone"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("course")}
        placeholder="Course"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("department")}
        placeholder="Department"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("year")}
        placeholder="Year"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("section")}
        placeholder="Section"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("age")}
        type="number"
        placeholder="Age"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <select
        {...register("gender")}
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      >
        <option value="">
          Select Gender
        </option>

        <option value="Male">
          Male
        </option>

        <option value="Female">
          Female
        </option>

        <option value="Other">
          Other
        </option>

      </select>

      <input
        {...register("parentName")}
        placeholder="Parent Name"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <input
        {...register("parentPhone")}
        placeholder="Parent Phone"
        className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
      />

      <textarea
        {...register("address")}
        placeholder="Address"
        className="
        md:col-span-2
        bg-[#111827]
        border
        border-gray-800
        p-4
        rounded-2xl
      "
      />

      <button
        type="submit"
        className="
        md:col-span-2
        bg-gradient-to-r
        from-purple-600
        to-pink-500
        py-4
        rounded-2xl
      "
      >
        Save Student
      </button>

    </form>

  );

}

export default StudentForm;