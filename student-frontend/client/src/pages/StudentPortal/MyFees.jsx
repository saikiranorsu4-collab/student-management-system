import {
  useEffect,
  useState,
} from "react";

import {
  IndianRupee,
  Clock,
  CheckCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getMyFees,
} from "../../services/feeService";

import {
  createOrder,
  verifyPayment,
  loadRazorpayScript,
} from "../../services/paymentService";

import Loader from "../../components/common/Loader";

function MyFees() {
  const navigate =
    useNavigate();

  const [fees, setFees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [processingFeeId,
    setProcessingFeeId] =
    useState(null);

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees =
    async () => {
      try {
        const response =
          await getMyFees();

        setFees(
          response.fees || []
        );
      } catch (error) {
        console.log(
          "Fee Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const handlePayment =
    async (fee) => {

      try {

        setProcessingFeeId(
          fee._id
        );

        const razorpayLoaded =
          await loadRazorpayScript();

        if (
          !razorpayLoaded
        ) {
          alert(
            "Failed to load Razorpay"
          );
          return;
        }

        const orderData =
          await createOrder(
            fee._id,
            fee.remainingAmount
          );

        const order =
          orderData.order;

        const options = {

          key:
            import.meta.env
              .VITE_RAZORPAY_KEY_ID,

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
                    fee._id,

                  amount:
                    fee.remainingAmount,

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                });

                alert(
                  "Payment Successful"
                );

                await loadFees();

                navigate(
                  "/payment-history"
                );

              } catch (
                error
              ) {

                console.log(
                  error
                );

                alert(
                  "Payment Verification Failed"
                );

              }

            },

          theme: {
            color:
              "#7C3AED",
          },

          modal: {

            ondismiss:
              () => {

                setProcessingFeeId(
                  null
                );

              },

          },

        };

        const paymentObject =
          new window.Razorpay(
            options
          );

        paymentObject.open();

      } catch (error) {

        console.log(
          error
        );

        alert(
          error?.response
            ?.data
            ?.message ||
            "Payment Failed"
        );

      } finally {

        setProcessingFeeId(
          null
        );

      }

    };

  if (loading) {
    return <Loader />;
  }

  const totalFees =
    fees.reduce(
      (total, fee) =>
        total +
        (fee.totalAmount || 0),
      0
    );

  const paidFees =
    fees.reduce(
      (total, fee) =>
        total +
        (fee.paidAmount || 0),
      0
    );

  const dueFees =
    fees.reduce(
      (total, fee) =>
        total +
        (fee.remainingAmount || 0),
      0
    );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold">
          My Fees
        </h1>

        <p className="text-gray-400 mt-2">
          View your fee records
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-[#0F172A] p-6 rounded-3xl">
          <IndianRupee
            size={30}
            className="text-blue-500 mb-3"
          />

          <h2 className="text-3xl font-bold">
            ₹{totalFees}
          </h2>

          <p className="text-gray-400">
            Total Fees
          </p>
        </div>

        <div className="bg-[#0F172A] p-6 rounded-3xl">
          <CheckCircle
            size={30}
            className="text-green-500 mb-3"
          />

          <h2 className="text-3xl font-bold text-green-500">
            ₹{paidFees}
          </h2>

          <p className="text-gray-400">
            Paid Amount
          </p>
        </div>

        <div className="bg-[#0F172A] p-6 rounded-3xl">
          <Clock
            size={30}
            className="text-red-500 mb-3"
          />

          <h2 className="text-3xl font-bold text-red-500">
            ₹{dueFees}
          </h2>

          <p className="text-gray-400">
            Remaining Amount
          </p>
        </div>

      </div>

      <div className="bg-[#0F172A] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="p-4 text-left">
                Total Fee
              </th>

              <th className="p-4 text-left">
                Paid
              </th>

              <th className="p-4 text-left">
                Remaining
              </th>

              <th className="p-4 text-left">
                Due Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

            </tr>

          </thead>

          <tbody>

            {fees.length > 0 ? (

              fees.map(
                (fee) => (

                  <tr
                    key={fee._id}
                    className="border-b border-white/5"
                  >

                    <td className="p-4">
                      ₹{fee.totalAmount}
                    </td>

                    <td className="p-4 text-green-400">
                      ₹{fee.paidAmount}
                    </td>

                    <td className="p-4 text-red-400">
                      ₹{fee.remainingAmount}
                    </td>

                    <td className="p-4">
                      {new Date(
                        fee.dueDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-lg
                          ${
                            fee.status === "Paid"
                              ? "bg-green-500/20 text-green-400"
                              : fee.status === "Partially Paid"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        `}
                      >
                        {fee.status}
                      </span>

                    </td>

                    <td className="p-4">

                      {fee.status !== "Paid" ? (

                        <button
                          onClick={() =>
                            handlePayment(
                              fee
                            )
                          }
                          disabled={
                            processingFeeId ===
                            fee._id
                          }
                          className="
                            px-4
                            py-2
                            rounded-lg
                            bg-green-600
                            hover:bg-green-700
                            disabled:opacity-50
                          "
                        >
                          {processingFeeId ===
                          fee._id
                            ? "Processing..."
                            : "Pay Now"}
                        </button>

                      ) : (

                        <span className="text-green-400">
                          Completed
                        </span>

                      )}

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="
                    p-8
                    text-center
                    text-gray-400
                  "
                >
                  No fee records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MyFees;