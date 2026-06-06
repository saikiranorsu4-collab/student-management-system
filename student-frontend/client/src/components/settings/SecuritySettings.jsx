import {
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

import { useState } from "react";

import toast from "react-hot-toast";

import {
  changePassword,
} from "../../services/authService";

function SecuritySettings() {

  const [loading, setLoading] =
    useState(false);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [passwords, setPasswords] =
    useState({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

  const handleChange = (e) => {

    setPasswords({

      ...passwords,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSave =
    async () => {

      try {

        if (
          !passwords.currentPassword ||
          !passwords.newPassword ||
          !passwords.confirmPassword
        ) {

          return toast.error(
            "Please fill all fields"
          );

        }

        if (
          passwords.newPassword !==
          passwords.confirmPassword
        ) {

          return toast.error(
            "Passwords do not match"
          );

        }

        if (
          passwords.newPassword.length < 6
        ) {

          return toast.error(
            "Password must be at least 6 characters"
          );

        }

        setLoading(true);

        const response =
          await changePassword(

            passwords.currentPassword,

            passwords.newPassword

          );

        toast.success(
          response.message
        );

        setPasswords({

          currentPassword: "",

          newPassword: "",

          confirmPassword: "",

        });

      } catch (error) {

        toast.error(

          error?.response?.data
            ?.message ||

            "Failed to change password"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
      bg-[#0F172A]
      rounded-3xl
      border
      border-gray-800
      overflow-hidden
      shadow-xl
    "
    >

      {/* HEADER */}

      <div
        className="
        p-6
        border-b
        border-gray-800
      "
      >

        <div
          className="
          flex
          items-center
          gap-4
        "
        >

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-green-500/10
            flex
            items-center
            justify-center
          "
          >

            <ShieldCheck
              size={28}
              className="text-green-400"
            />

          </div>

          <div>

            <h2
              className="
              text-3xl
              font-bold
              text-white
            "
            >
              Security
            </h2>

            <p className="text-gray-400">
              Protect your account
            </p>

          </div>

        </div>

      </div>

      {/* BODY */}

      <div className="p-6 space-y-5">

        {/* CURRENT PASSWORD */}

        <div>

          <label
            className="
            text-sm
            text-gray-400
            mb-2
            block
          "
          >
            Current Password
          </label>

          <div className="relative">

            <input
              type={
                showCurrent
                  ? "text"
                  : "password"
              }
              name="currentPassword"
              value={
                passwords.currentPassword
              }
              onChange={handleChange}
              placeholder="Enter current password"
              className="
              w-full
              p-4
              rounded-2xl
              bg-[#111827]
              border
              border-gray-700
              focus:border-green-500
              outline-none
            "
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(
                  !showCurrent
                )
              }
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
            >

              {showCurrent ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}

            </button>

          </div>

        </div>

        {/* NEW PASSWORD */}

        <div>

          <label
            className="
            text-sm
            text-gray-400
            mb-2
            block
          "
          >
            New Password
          </label>

          <div className="relative">

            <input
              type={
                showNew
                  ? "text"
                  : "password"
              }
              name="newPassword"
              value={
                passwords.newPassword
              }
              onChange={handleChange}
              placeholder="Enter new password"
              className="
              w-full
              p-4
              rounded-2xl
              bg-[#111827]
              border
              border-gray-700
              focus:border-green-500
              outline-none
            "
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
            >

              {showNew ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}

            </button>

          </div>

        </div>

        {/* CONFIRM PASSWORD */}

        <div>

          <label
            className="
            text-sm
            text-gray-400
            mb-2
            block
          "
          >
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={
                passwords.confirmPassword
              }
              onChange={handleChange}
              placeholder="Confirm new password"
              className="
              w-full
              p-4
              rounded-2xl
              bg-[#111827]
              border
              border-gray-700
              focus:border-green-500
              outline-none
            "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(
                  !showConfirm
                )
              }
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
            >

              {showConfirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}

            </button>

          </div>

        </div>

        {/* INFO */}

        <div
          className="
          bg-green-500/10
          border
          border-green-500/20
          rounded-2xl
          p-4
        "
        >

          <div
            className="
            flex
            gap-3
          "
          >

            <Lock
              size={18}
              className="
              text-green-400
              mt-1
            "
            />

            <div>

              <p className="font-medium text-green-400">
                Password Security
              </p>

              <p
                className="
                text-sm
                text-gray-400
                mt-1
              "
              >
                Use at least 8 characters
                with letters and numbers.
              </p>

            </div>

          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={handleSave}
          disabled={loading}
          className="
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-green-500
          to-emerald-600
          hover:opacity-90
          transition
          font-semibold
          text-lg
        "
        >

          {loading
            ? "Updating Password..."
            : "Change Password"}

        </button>

      </div>

    </div>

  );

}

export default SecuritySettings;