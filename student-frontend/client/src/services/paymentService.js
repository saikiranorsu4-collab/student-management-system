import api from "./api";

// ====================================
// CREATE ORDER
// ====================================

export const createOrder = async (
  feeId,
  amount
) => {
  try {
    const response =
      await api.post(
        "/payments/create-order",
        {
          feeId,
          amount,
        }
      );

    return response.data;
  } catch (error) {
    console.error(
      "Create Order Error:",
      error
    );

    throw error;
  }
};

// ====================================
// VERIFY PAYMENT
// ====================================

export const verifyPayment =
  async (paymentData) => {
    try {
      const response =
        await api.post(
          "/payments/verify-payment",
          paymentData
        );

      return response.data;
    } catch (error) {
      console.error(
        "Verify Payment Error:",
        error
      );

      throw error;
    }
  };

// ====================================
// PAYMENT HISTORY
// ====================================

export const getPaymentHistory =
  async () => {
    try {
      const response =
        await api.get(
          "/payments/history"
        );

      return response.data;
    } catch (error) {
      console.error(
        "Payment History Error:",
        error
      );

      throw error;
    }
  };

// ====================================
// DOWNLOAD RECEIPT
// ====================================

export const downloadReceipt =
  (paymentId) => {
    const baseURL =
      import.meta.env.VITE_API_URL;

    window.open(
      `${baseURL}/payments/receipt/${paymentId}`,
      "_blank"
    );
  };

// ====================================
// LOAD RAZORPAY
// ====================================

export const loadRazorpayScript =
  () => {
    return new Promise(
      (resolve) => {
        const script =
          document.createElement(
            "script"
          );

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.onload =
          () => resolve(true);

        script.onerror =
          () => resolve(false);

        document.body.appendChild(
          script
        );
      }
    );
  };