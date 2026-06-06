import Button from "../common/Button";

function StudentToolbar({
  search,
  setSearch,
  setOpenModal,
}) {

  return (

    <div
      className="
        flex items-center
        justify-between
        mb-6
      "
    >

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          bg-[#1F2937]
          border border-gray-700
          px-5 py-3
          rounded-xl
          outline-none
          w-[320px]
          text-white
        "
      />

      {/* BUTTON */}
      <Button
        onClick={() =>
          setOpenModal(true)
        }
      >
        + Add Student
      </Button>

    </div>

  );

}

export default StudentToolbar;