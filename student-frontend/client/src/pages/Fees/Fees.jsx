import {
  IndianRupee,
  Clock,
  CheckCircle,
  Plus,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getFees,
  createFee,
  deleteFee,
} from "../../services/feeService";

import {
  createOrder,
  verifyPayment,
} from "../../services/paymentService";

import FeeTable from "../../components/fees/FeeTable";
import FeeForm from "../../components/fees/FeeForm";

function Fees() {

  const [fees, setFees] =
    useState([]);

  const [isOpen, setIsOpen] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [selectedFee, setSelectedFee] =
    useState(null);

  const [paymentAmount, setPaymentAmount] =
    useState("");

  const feesPerPage = 5;

  useEffect(() => {

    loadFees();

  }, []);

  const loadFees =
    async () => {

      try {

        setLoading(true);

        const response =
          await getFees();

        setFees(
          response.fees || []
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load fees"
        );

      } finally {

        setLoading(false);

      }

    };

  // ==========================
  // ADD FEE
  // ==========================

  const handleAddFee =
    async (feeData) => {

      try {

        await createFee(
          feeData
        );

        toast.success(
          "Fee Added Successfully"
        );

        setIsOpen(false);

        loadFees();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add fee"
        );

      }

    };

  // ==========================
  // DELETE FEE
  // ==========================

  const handleDeleteFee =
    async (id) => {

      try {

        await deleteFee(id);

        toast.success(
          "Fee Deleted Successfully"
        );

        loadFees();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to delete fee"
        );

      }

    };

  // ==========================
  // RAZORPAY PAYMENT
  // ==========================

  const handleCollectPayment =
    async () => {

      try {

        const amount =
          Number(
            paymentAmount
          );

        if (
          !amount ||
          amount <= 0
        ) {

          return toast.error(
            "Enter valid amount"
          );

        }

        const orderResponse =
          await createOrder(

            selectedFee._id,

            amount

          );
          console.log(
  "ORDER RESPONSE",
  orderResponse
);

        const order =
          orderResponse.order;

       const options = {

  key:
    orderResponse.key,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "EduManage",

          description:
            "Student Fee Payment",

          order_id:
            order.id,

          handler:
            async (
              response
            ) => {

              try {

                await verifyPayment({

                  feeId:
                    selectedFee._id,

                  amount,

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                });

                toast.success(
                  "Payment Successful"
                );

                setSelectedFee(
                  null
                );

                setPaymentAmount(
                  ""
                );

                await loadFees();

              } catch (
                error
              ) {

                console.log(
                  error
                );

                toast.error(
                  "Payment verification failed"
                );

              }

            },

          prefill: {

            name:
              selectedFee
                ?.studentId
                ?.name || "",

          },

          theme: {

            color:
              "#7C3AED",

          },

        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {

        console.log(
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Payment failed"
        );

      }

    };

  // ==========================
  // STATS
  // ==========================

  const totalCollected =
    fees.reduce(
      (total, fee) =>
        total +
        (fee.paidAmount || 0),
      0
    );

  const paidStudents =
    fees.filter(
      (fee) =>
        fee.status ===
        "Paid"
    ).length;

  const pendingStudents =
    fees.filter(
      (fee) =>
        fee.status !==
        "Paid"
    ).length;

  // ==========================
  // PAGINATION
  // ==========================

  const indexOfLastFee =
    currentPage *
    feesPerPage;

  const indexOfFirstFee =
    indexOfLastFee -
    feesPerPage;

  const currentFees =
    fees.slice(
      indexOfFirstFee,
      indexOfLastFee
    );

  const totalPages =
    Math.ceil(
      fees.length /
      feesPerPage
    );

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div
        className="
        flex
        justify-between
        items-center
      "
      >

        <div>

          <h1
            className="
            text-4xl
            font-bold
          "
          >
            Fee Management
          </h1>

          <p
            className="
            text-gray-400
            mt-2
          "
          >
            Manage student fee payments
          </p>

        </div>

        <button
          onClick={() =>
            setIsOpen(true)
          }
          className="
          flex
          items-center
          gap-2
          px-5
          py-3
          rounded-xl
          bg-gradient-to-r
          from-purple-600
          to-pink-500
        "
        >

          <Plus size={18} />

          Add Fee

        </button>

      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
      "
      >

        <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
          <IndianRupee
            size={34}
            className="text-green-500 mb-3"
          />
          <h2 className="text-3xl font-bold">
            ₹{totalCollected}
          </h2>
          <p className="text-gray-400">
            Total Collected
          </p>
        </div>

        <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
          <CheckCircle
            size={34}
            className="text-blue-500 mb-3"
          />
          <h2 className="text-3xl font-bold">
            {paidStudents}
          </h2>
          <p className="text-gray-400">
            Fully Paid
          </p>
        </div>

        <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
          <Clock
            size={34}
            className="text-red-500 mb-3"
          />
          <h2 className="text-3xl font-bold">
            {pendingStudents}
          </h2>
          <p className="text-gray-400">
            Pending Fees
          </p>
        </div>

      </div>

      <FeeTable
        fees={currentFees}
        onDelete={handleDeleteFee}
        onCollectPayment={(fee) =>
          setSelectedFee(fee)
        }
      />

      {isOpen && (
        <FeeForm
          onSubmit={handleAddFee}
          onClose={() =>
            setIsOpen(false)
          }
        />
      )}

      {selectedFee && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#0F172A] p-6 rounded-3xl w-[450px]">

            <h2 className="text-2xl font-bold mb-5">
              Pay Fee Using Razorpay
            </h2>

            <div className="space-y-4">

              <p>
                Student :
                {" "}
                {selectedFee.studentId?.name}
              </p>

              <p>
                Remaining :
                ₹
                {selectedFee.remainingAmount}
              </p>

              <input
                type="number"
                placeholder="Enter Amount"
                value={paymentAmount}
                onChange={(e) =>
                  setPaymentAmount(
                    e.target.value
                  )
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

              <div className="flex gap-3 pt-3">

                <button
                  onClick={
                    handleCollectPayment
                  }
                  className="
                  px-5 py-3
                  bg-green-600
                  rounded-xl
                  "
                >
                  Pay Now
                </button>

                <button
                  onClick={() =>
                    setSelectedFee(null)
                  }
                  className="
                  px-5 py-3
                  bg-gray-700
                  rounded-xl
                  "
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Fees;

