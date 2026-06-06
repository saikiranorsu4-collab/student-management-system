import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Download,
  IndianRupee,
  CheckCircle,
  Clock,
} from "lucide-react";

import {
  getPaymentHistory,
} from "../../services/paymentService";

import {
  downloadReceipt,
} from "../../services/receiptService";

function PaymentHistory() {
  const [
    payments,
    setPayments,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments =
    async () => {
      try {
        setLoading(true);

        const data =
          await getPaymentHistory();

        setPayments(
          data.payments || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const filteredPayments =
    payments.filter(
      (payment) =>
        payment?.status
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        payment?.razorpayPaymentId
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalPaid =
    payments.reduce(
      (sum, payment) =>
        sum +
        Number(
          payment.amount || 0
        ),
      0
    );

  const successfulPayments =
    payments.filter(
      (payment) =>
        payment.status ===
        "Paid"
    ).length;

  const pendingPayments =
    payments.filter(
      (payment) =>
        payment.status ===
        "Pending"
    ).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1
          className="
          text-4xl
          font-bold
          mb-2
        "
        >
          Payment History
        </h1>

        <p className="text-gray-400">
          View and download your
          payment receipts
        </p>
      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
      >
        <div
          className="
          bg-[#0F172A]
          rounded-3xl
          p-6
          border
          border-gray-800
        "
        >
          <IndianRupee
            className="
            text-green-400
            mb-3
          "
            size={40}
          />

          <h2
            className="
            text-3xl
            font-bold
          "
          >
            ₹{totalPaid}
          </h2>

          <p className="text-gray-400">
            Total Paid
          </p>
        </div>

        <div
          className="
          bg-[#0F172A]
          rounded-3xl
          p-6
          border
          border-gray-800
        "
        >
          <CheckCircle
            className="
            text-green-400
            mb-3
          "
            size={40}
          />

          <h2
            className="
            text-3xl
            font-bold
          "
          >
            {successfulPayments}
          </h2>

          <p className="text-gray-400">
            Successful Payments
          </p>
        </div>

        <div
          className="
          bg-[#0F172A]
          rounded-3xl
          p-6
          border
          border-gray-800
        "
        >
          <Clock
            className="
            text-yellow-400
            mb-3
          "
            size={40}
          />

          <h2
            className="
            text-3xl
            font-bold
          "
          >
            {pendingPayments}
          </h2>

          <p className="text-gray-400">
            Pending Payments
          </p>
        </div>
      </div>

      {/* SEARCH */}

      <div
        className="
        relative
        max-w-md
      "
      >
        <Search
          size={20}
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
        />

        <input
          type="text"
          placeholder="Search payment..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          w-full
          pl-12
          pr-4
          py-3
          rounded-2xl
          bg-[#0F172A]
          border
          border-gray-800
          outline-none
        "
        />
      </div>

      {/* TABLE */}

      <div
        className="
        bg-[#0F172A]
        rounded-3xl
        overflow-hidden
        border
        border-gray-800
      "
      >
        {loading ? (
          <div className="p-10 text-center">
            Loading Payments...
          </div>
        ) : (
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
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Payment ID
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>

                  <th className="p-4 text-left">
                    Receipt
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map(
                  (payment) => (
                    <tr
                      key={
                        payment._id
                      }
                      className="
                      border-b
                      border-gray-800
                      hover:bg-white/5
                    "
                    >
                      <td className="p-4 font-semibold text-green-400">
                        ₹
                        {
                          payment.amount
                        }
                      </td>

                      <td className="p-4 text-sm">
                        {
                          payment.razorpayPaymentId
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            payment.status ===
                            "Paid"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {
                            payment.status
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        {new Date(
                          payment.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            downloadReceipt(
                              payment._id
                            )
                          }
                          className="
                          flex
                          items-center
                          gap-2
                          px-3
                          py-2
                          bg-blue-600
                          hover:bg-blue-700
                          rounded-lg
                          text-sm
                        "
                        >
                          <Download
                            size={16}
                          />
                          Receipt
                        </button>
                      </td>
                    </tr>
                  )
                )}

                {filteredPayments.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="
                      p-8
                      text-center
                      text-gray-400
                    "
                    >
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;