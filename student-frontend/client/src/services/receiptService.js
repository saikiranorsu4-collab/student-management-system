// src/services/receiptService.js

import api from "./api";

export const downloadReceipt =
  async (paymentId) => {
    try {
      const response =
        await api.get(
          `/receipts/${paymentId}`,
          {
            responseType:
              "blob",
          }
        );

      const url =
        window.URL.createObjectURL(
          new Blob([
            response.data,
          ])
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        `receipt-${paymentId}.pdf`;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();
    } catch (error) {
      console.log(error);
    }
  };