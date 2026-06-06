import { create } from "zustand";

import {

  getFees,

  createFee,

  updateFee,

  deleteFee,

  collectPayment,

} from "../services/feeService";

const useFeeStore =
  create((set) => ({

    fees: [],

    loading: false,

    error: null,

    // ==========================
    // FETCH FEES
    // ==========================

    fetchFees:
      async () => {

        try {

          set({

            loading: true,

            error: null,

          });

          const response =
            await getFees();

          set({

            fees:
              response.fees || [],

            loading:
              false,

          });

        } catch (error) {

          console.log(error);

          set({

            loading:
              false,

            error:
              error.message,

          });

        }

      },

    // ==========================
    // ADD FEE
    // ==========================

    addFee:
      async (feeData) => {

        try {

          set({
            loading: true,
          });

          await createFee(
            feeData
          );

          const response =
            await getFees();

          set({

            fees:
              response.fees || [],

            loading:
              false,

          });

        } catch (error) {

          console.log(error);

          set({

            loading:
              false,

            error:
              error.message,

          });

        }

      },

    // ==========================
    // UPDATE FEE
    // ==========================

    editFee:
      async (
        id,
        feeData
      ) => {

        try {

          set({
            loading: true,
          });

          await updateFee(
            id,
            feeData
          );

          const response =
            await getFees();

          set({

            fees:
              response.fees || [],

            loading:
              false,

          });

        } catch (error) {

          console.log(error);

          set({

            loading:
              false,

            error:
              error.message,

          });

        }

      },

    // ==========================
    // COLLECT PAYMENT
    // ==========================

    collectFeePayment:
      async (
        feeId,
        amount
      ) => {

        try {

          set({
            loading: true,
          });

          await collectPayment(
            feeId,
            amount
          );

          const response =
            await getFees();

          set({

            fees:
              response.fees || [],

            loading:
              false,

          });

        } catch (error) {

          console.log(error);

          set({

            loading:
              false,

            error:
              error.message,

          });

        }

      },

    // ==========================
    // DELETE FEE
    // ==========================

    removeFee:
      async (id) => {

        try {

          set({
            loading: true,
          });

          await deleteFee(
            id
          );

          const response =
            await getFees();

          set({

            fees:
              response.fees || [],

            loading:
              false,

          });

        } catch (error) {

          console.log(error);

          set({

            loading:
              false,

            error:
              error.message,

          });

        }

      },

  }));

export default useFeeStore;