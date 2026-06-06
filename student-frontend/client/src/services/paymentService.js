import api from "./api";

// ====================================
// CREATE ORDER
// ====================================

export const createOrder =
  async (
    feeId,
    amount
  ) => {

    const response =
      await api.post(

        "/payments/create-order",

        {
          feeId,
          amount,
        }

      );

    return response.data;
  };

// ====================================
// VERIFY PAYMENT
// ====================================

export const verifyPayment =
  async (
    paymentData
  ) => {

    const response =
      await api.post(

        "/payments/verify-payment",

        paymentData

      );

    return response.data;
  };
  
// ====================================
// PAYMENT HISTORY
// ====================================

export const getPaymentHistory =
  async () => {
    const response =
      await api.get(
        "/payments/history"
      );

    return response.data;
  };

// ====================================
// DOWNLOAD RECEIPT
// ====================================

export const downloadReceipt =
  (paymentId) => {
    window.open(
      `http://localhost:5000/api/payments/receipt/${paymentId}`,
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