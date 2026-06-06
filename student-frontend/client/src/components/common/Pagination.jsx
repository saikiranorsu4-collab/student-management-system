function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {

  const pages = [];

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {

    pages.push(i);

  }

  return (

    <div
      className="
        flex items-center
        justify-center
        gap-3
        mt-8
      "
    >

      {/* PREV */}
      <button
        onClick={() =>
          setCurrentPage(
            currentPage - 1
          )
        }
        disabled={currentPage === 1}
        className="
          px-4 py-2
          rounded-lg
          bg-[#1F2937]
          disabled:opacity-50
        "
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((page) => (

        <button
          key={page}
          onClick={() =>
            setCurrentPage(page)
          }
          className={`
            px-4 py-2
            rounded-lg
            transition-all

            ${
              currentPage === page
                ? "bg-purple-600"
                : "bg-[#1F2937]"
            }
          `}
        >
          {page}
        </button>

      ))}

      {/* NEXT */}
      <button
        onClick={() =>
          setCurrentPage(
            currentPage + 1
          )
        }
        disabled={
          currentPage === totalPages
        }
        className="
          px-4 py-2
          rounded-lg
          bg-[#1F2937]
          disabled:opacity-50
        "
      >
        Next
      </button>

    </div>

  );

}

export default Pagination;