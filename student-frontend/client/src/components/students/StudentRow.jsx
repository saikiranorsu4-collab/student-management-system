import Button from "../common/Button";

function StudentRow({
  student,
  onEdit,
  onDelete,
}) {

  return (

    <tr
      className="
        border-b
        border-gray-800
        hover:bg-[#1F2937]
        transition-all
      "
    >

      <td className="py-5">
        {student.name}
      </td>

      <td>
        {student.email}
      </td>

      <td>
        {student.course}
      </td>

      <td>
        {student.age}
      </td>

      <td>

        <span
          className="
            bg-green-500/20
            text-green-400
            px-3 py-1
            rounded-full
            text-sm
          "
        >
          Active
        </span>

      </td>

      <td>

        <div className="flex gap-3">

          <Button
            variant="secondary"
            className="
              px-4 py-2
              text-sm
            "
            onClick={() =>
              onEdit(student)
            }
          >
            Edit
          </Button>

          <Button
            variant="danger"
            className="
              px-4 py-2
              text-sm
            "
            onClick={() =>
              onDelete(student._id)
            }
          >
            Delete
          </Button>

        </div>

      </td>

    </tr>

  );

}

export default StudentRow;