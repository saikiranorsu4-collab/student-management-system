import { useState } from "react";

function PaymentForm({
  fee,
  onSubmit,
  onClose,
}) {

  const [amount, setAmount] =
    useState("");

  const handleSubmit =
    (e) => {

      e.preventDefault();

      onSubmit(
        fee._id,
        Number(amount)
      );

    };

  return (

    <div
      className="
      fixed inset-0
      bg-black/70
      flex items-center
      justify-center
      z-50
    "
    >

      <div
        className="
        bg-[#0F172A]
        border border-gray-800
        rounded-3xl
        p-6
        w-[500px]
      "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-6
        "
        >
          Collect Fee Payment
        </h2>

        <div className="space-y-3 mb-6">

          <div>

            Student :

            <span className="ml-2 font-semibold">
              {fee.studentId?.name}
            </span>

          </div>

          <div>

            Total Fee :

            <span className="ml-2 text-blue-400">
              ₹{fee.totalAmount}
            </span>

          </div>

          <div>

            Paid :

            <span className="ml-2 text-green-400">
              ₹{fee.paidAmount}
            </span>

          </div>

          <div>

            Remaining :

            <span className="ml-2 text-red-400">
              ₹{fee.remainingAmount}
            </span>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            max={
              fee.remainingAmount
            }
            required
            className="
            w-full
            p-3
            rounded-xl
            bg-[#111827]
            border border-gray-700
            mb-4
          "
          />

          <div
            className="
            flex gap-3
          "
          >

            <button
              type="submit"
              className="
              px-5 py-3
              bg-green-600
              rounded-xl
            "
            >
              Collect Payment
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
              px-5 py-3
              bg-gray-700
              rounded-xl
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

export default PaymentForm;