import api from "./api";

export const createOrder = async (
  feeId,
  amount
) => {
  const response = await api.post(
    "/payments/create-order",
    {
      feeId,
      amount,
    }
  );

  return response.data;
};

export const verifyPayment = async (
  paymentData
) => {
  const response = await api.post(
    "/payments/verify-payment",
    paymentData
  );

  return response.data;
};

export const getPaymentHistory =
  async () => {
    const response = await api.get(
      "/payments/history"
    );

    return response.data;
  };

export const downloadReceipt = (
  paymentId
) => {
  const API_URL =
    import.meta.env.VITE_API_URL;

  window.open(
    `${API_URL}/payments/receipt/${paymentId}`,
    "_blank"
  );
};

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

        script.onload = () =>
          resolve(true);

        script.onerror = () =>
          resolve(false);

        document.body.appendChild(
          script
        );
      }
    );
  };