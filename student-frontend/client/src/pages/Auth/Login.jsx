import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
     const response = await api.post(
  "/auth/login",
  formData
);

      const { user, token } =
        response.data;

      login(user, token);

      toast.success(
        `Welcome ${user.name}`
      );

      switch (user.role) {
        case "admin":
          navigate("/dashboard");
          break;

        case "teacher":
          navigate("/dashboard");
          break;

        case "student":
          navigate(
            "/student-dashboard"
          );
          break;

        default:
          navigate("/dashboard");
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#020817]
      px-4
    "
    >
      <div
        className="
        w-full
        max-w-md
        bg-[#0F172A]
        border
        border-gray-800
        rounded-3xl
        p-8
        shadow-2xl
      "
      >

        <div className="mb-8">

          <h1
            className="
            text-4xl
            font-bold
            text-white
          "
          >
            Welcome Back 👋
          </h1>

          <p
            className="
            text-gray-400
            mt-2
          "
          >
            Login to continue
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label
              className="
              block
              text-sm
              text-gray-400
              mb-2
            "
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#111C33]
              border
              border-gray-700
              text-white
              outline-none
              focus:border-purple-500
            "
            />

          </div>

          <div>

            <label
              className="
              block
              text-sm
              text-gray-400
              mb-2
            "
            >
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="
                w-full
                px-5
                py-4
                rounded-2xl
                bg-[#111C33]
                border
                border-gray-700
                text-white
                outline-none
                focus:border-purple-500
              "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
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
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-purple-600
            to-pink-500
            text-white
            font-semibold
            disabled:opacity-50
          "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;