import {
  useEffect,
  useState,
} from "react";

import {
  getStudents,
} from "../../services/studentService";

function FeeForm({
  onSubmit,
  onClose,
}) {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      studentId: "",

      totalAmount: "",

      paidAmount: 0,

      dueDate: "",

    });

  useEffect(() => {

    loadStudents();

  }, []);

  const loadStudents =
    async () => {

      try {

        setLoading(true);

        const response =
          await getStudents();

        // Supports both:
        // response.students
        // response

        const studentList =
          response.students ||
          response ||
          [];

        setStudents(
          studentList
        );

      } catch (error) {

        console.log(
          "Students Load Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  const handleSubmit =
    (e) => {

      e.preventDefault();

      const totalAmount =
        Number(
          formData.totalAmount
        );

      const paidAmount =
        Number(
          formData.paidAmount
        );

      const remainingAmount =
        totalAmount -
        paidAmount;

      let status =
        "Pending";

      if (
        remainingAmount === 0
      ) {

        status = "Paid";

      } else if (
        paidAmount > 0
      ) {

        status =
          "Partially Paid";

      }

      onSubmit({

        studentId:
          formData.studentId,

        totalAmount,

        paidAmount,

        remainingAmount,

        dueDate:
          formData.dueDate,

        status,

      });

    };

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/70
      flex
      items-center
      justify-center
      z-50
    "
    >

      <div
        className="
        bg-[#0F172A]
        border
        border-gray-800
        rounded-3xl
        p-6
        w-[600px]
      "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-5
        "
        >
          Assign Fee
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <select
            name="studentId"
            value={
              formData.studentId
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-3
            rounded-xl
            bg-[#111827]
            border
            border-gray-700
          "
            required
          >

            <option value="">
              Select Student
            </option>

            {students.map(
              (
                student
              ) => (

                <option
                  key={
                    student._id
                  }
                  value={
                    student._id
                  }
                >
                  {student.name}
                  {" - "}
                  {
                    student.rollNumber
                  }
                </option>

              )
            )}

          </select>

          <input
            type="number"
            name="totalAmount"
            placeholder="Total Fee Amount"
            value={
              formData.totalAmount
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-3
            rounded-xl
            bg-[#111827]
            border
            border-gray-700
          "
            required
          />

          <input
            type="number"
            name="paidAmount"
            placeholder="Initial Paid Amount"
            value={
              formData.paidAmount
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-3
            rounded-xl
            bg-[#111827]
            border
            border-gray-700
          "
          />

          <input
            type="date"
            name="dueDate"
            value={
              formData.dueDate
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-3
            rounded-xl
            bg-[#111827]
            border
            border-gray-700
          "
            required
          />

          <div
            className="
            flex
            gap-3
            pt-3
          "
          >

            <button
              type="submit"
              className="
              px-5
              py-3
              bg-green-600
              hover:bg-green-700
              rounded-xl
            "
            >
              Save Fee
            </button>

            <button
              type="button"
              onClick={
                onClose
              }
              className="
              px-5
              py-3
              bg-gray-700
              hover:bg-gray-600
              rounded-xl
            "
            >
              Cancel
            </button>

          </div>

        </form>

        {loading && (

          <p className="mt-4 text-gray-400">
            Loading students...
          </p>

        )}

      </div>

    </div>

  );

}

export default FeeForm;