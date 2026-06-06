import {
  Trash2,
  Wallet,
} from "lucide-react";

function FeeTable({

  fees,

  onDelete,

  onCollectPayment,

}) {

  if (

    !fees ||

    fees.length === 0

  ) {

    return (

      <div
        className="
        bg-[#0F172A]
        p-10
        rounded-3xl
        text-center
      "
      >

        No Fees Found

      </div>

    );

  }

  return (

    <div
      className="
      bg-[#0F172A]
      rounded-3xl
      overflow-hidden
      border
      border-gray-800
    "
    >

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
              border-b
              border-gray-800
            "
            >

              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Total Fee
              </th>

              <th className="p-4 text-left">
                Paid Amount
              </th>

              <th className="p-4 text-left">
                Remaining Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Due Date
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {fees.map(

              (fee) => (

                <tr
                  key={fee._id}
                  className="
                  border-b
                  border-gray-800
                  hover:bg-white/5
                "
                >

                  <td className="p-4 font-medium">

                    {
                      fee.studentId?.name ||
                      "Unknown Student"
                    }

                  </td>

                  <td className="p-4">

                    ₹
                    {fee.totalAmount}

                  </td>

                  <td className="p-4 text-green-400 font-semibold">

                    ₹
                    {fee.paidAmount}

                  </td>

                  <td className="p-4 text-red-400 font-semibold">

                    ₹
                    {fee.remainingAmount}

                  </td>

                  <td className="p-4">

                    <span
                      className={`

                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium

                        ${
                          fee.status ===
                          "Paid"

                            ? "bg-green-500/20 text-green-400"

                            : fee.status ===
                              "Partially Paid"

                            ? "bg-yellow-500/20 text-yellow-400"

                            : "bg-red-500/20 text-red-400"
                        }

                      `}
                    >

                      {fee.status}

                    </span>

                  </td>

                  <td className="p-4">

                    {new Date(

                      fee.dueDate

                    ).toLocaleDateString()}

                  </td>

                  <td className="p-4">

                    <div
                      className="
                      flex
                      gap-2
                      flex-wrap
                    "
                    >

                      {fee.status !==
                        "Paid" && (

                        <button
                          onClick={() =>
                            onCollectPayment(
                              fee
                            )
                          }
                          className="
                          flex
                          items-center
                          gap-2

                          px-3
                          py-2

                          bg-green-600
                          hover:bg-green-700

                          rounded-lg
                        "
                        >

                          <Wallet
                            size={16}
                          />

                          Collect

                        </button>

                      )}

                      <button
                        onClick={() =>
                          onDelete(
                            fee._id
                          )
                        }
                        className="
                        flex
                        items-center
                        gap-2

                        px-3
                        py-2

                        bg-red-600
                        hover:bg-red-700

                        rounded-lg
                      "
                      >

                        <Trash2
                          size={16}
                        />

                        Delete

                      </button>

                    </div>

                  </td>

                </tr>

              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default FeeTable;