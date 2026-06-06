import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function StudentTable({
  students,
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin =
    user?.role === "admin";

  return (
    <div
      className="
      bg-[#0F172A]
      border border-gray-800
      rounded-3xl
      overflow-hidden
    "
    >
      <div
        className="
        overflow-x-auto
      "
      >
        <table
          className="
          w-full
          min-w-[1000px]
        "
        >
          {/* HEADER */}

          <thead
            className="
            bg-[#111C33]
            border-b
            border-gray-800
          "
          >
            <tr>
              <th className="px-5 py-4 text-left">
                Roll No
              </th>

              <th className="px-5 py-4 text-left min-w-[260px]">
                Student
              </th>

              <th className="px-5 py-4 text-left">
                Department
              </th>

              <th className="px-5 py-4 text-left">
                Year
              </th>

              <th className="px-5 py-4 text-left">
                Section
              </th>

              <th className="px-5 py-4 text-left">
                Phone
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              {isAdmin && (
                <th
                  className="
                  px-5 py-4
                  text-left
                  min-w-[200px]
                "
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* BODY */}

          <tbody>
            {students?.map(
              (
                student,
                index
              ) => (
                <motion.tr
                  key={student._id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  className="
                  border-b
                  border-gray-800
                  hover:bg-[#111C33]
                "
                >
                  {/* ROLL NUMBER */}

                  <td className="px-5 py-4">
                    <span
                      className="
                      text-purple-400
                      font-medium
                    "
                    >
                      {
                        student.rollNumber
                      }
                    </span>
                  </td>

                  {/* STUDENT */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                        w-12 h-12
                        rounded-full
                        bg-gradient-to-r
                        from-purple-500
                        to-pink-500
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-white
                      "
                      >
                        {student.name?.charAt(
                          0
                        )}
                      </div>

                      <div>
                        <h3 className="font-medium text-white">
                          {student.name}
                        </h3>

                        <p
                          className="
                          text-xs
                          text-gray-400
                          break-all
                        "
                        >
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DEPARTMENT */}

                  <td className="px-5 py-4">
                    {
                      student.department
                    }
                  </td>

                  {/* YEAR */}

                  <td className="px-5 py-4">
                    {student.year}
                  </td>

                  {/* SECTION */}

                  <td className="px-5 py-4">
                    {
                      student.section
                    }
                  </td>

                  {/* PHONE */}

                  <td className="px-5 py-4">
                    {student.phone}
                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium

                        ${
                          student.status ===
                          "Active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }
                      `}
                    >
                      {
                        student.status
                      }
                    </span>
                  </td>

                  {/* ACTIONS */}

                  {isAdmin && (
                    <td
                      className="
                      px-5 py-4
                      min-w-[200px]
                    "
                    >
                      <div
                        className="
                        flex
                        gap-2
                        flex-wrap
                      "
                      >
                        <button
                          onClick={() =>
                            onEdit(
                              student
                            )
                          }
                          className="
                          px-4
                          py-2
                          rounded-xl
                          bg-blue-500/20
                          text-blue-400
                          hover:bg-blue-500
                          hover:text-white
                          transition
                        "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            onDelete(
                              student._id
                            )
                          }
                          className="
                          px-4
                          py-2
                          rounded-xl
                          bg-red-500/20
                          text-red-400
                          hover:bg-red-500
                          hover:text-white
                          transition
                        "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;