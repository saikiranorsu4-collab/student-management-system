import {
  Search,
  Sun,
  Moon,
  LogOut,
  Settings,
  User,
  ChevronDown,
  Menu,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  useSearch,
} from "../../context/SearchContext";

import {
  useNavigate,
} from "react-router-dom";

const Navbar = ({
  setSidebarOpen,
}) => {
  const { darkMode, toggleTheme } =
    useTheme();

  const { user, logout } =
    useAuth();

  const {
    searchTerm,
    setSearchTerm,
  } = useSearch();

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handler
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="
      h-[80px]
      border-b
      border-slate-800
      px-4
      md:px-6
      flex
      items-center
      justify-between
      bg-slate-950
      sticky
      top-0
      z-50
    "
    >
      {/* LEFT SIDE */}

      <div
        className="
        flex
        items-center
        gap-3
      "
      >
        {/* MOBILE MENU */}

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
          lg:hidden
          w-11
          h-11
          rounded-xl
          bg-slate-900
          border
          border-slate-800
          flex
          items-center
          justify-center
        "
        >
          <Menu size={22} />
        </button>

        {/* SEARCH */}

        {user?.role !==
        "student" ? (
          <div
            className="
            relative
            w-[180px]
            sm:w-[250px]
            md:w-[350px]
          "
          >
            <Search
              size={18}
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
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder="Search Students..."
              className="
              w-full
              h-11
              pl-12
              pr-4
              rounded-xl
              bg-slate-900
              border
              border-slate-800
              outline-none
              text-white
            "
            />
          </div>
        ) : (
          <div />
        )}
      </div>

      {/* RIGHT SIDE */}

      <div
        className="
        flex
        items-center
        gap-2
      "
      >
        <button
          onClick={toggleTheme}
          className="
          w-11
          h-11
          rounded-xl
          bg-slate-900
          border
          border-slate-800
          flex
          items-center
          justify-center
        "
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <div
          ref={menuRef}
          className="relative"
        >
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
            flex
            items-center
            gap-2
          "
          >
            <div
              className="
              w-11
              h-11
              rounded-full
              bg-gradient-to-r
              from-purple-500
              to-pink-500
              flex
              items-center
              justify-center
              font-bold
            "
            >
              {user?.name?.charAt(0)}
            </div>

            <div
              className="
              hidden
              md:block
              text-left
            "
            >
              <h3
                className="
                font-medium
                text-sm
              "
              >
                {user?.name}
              </h3>

              <p
                className="
                text-xs
                text-gray-400
              "
              >
                {user?.role}
              </p>
            </div>

            <ChevronDown
              size={16}
            />
          </button>

          {open && (
            <div
              className="
              absolute
              right-0
              top-16
              w-56
              rounded-xl
              bg-slate-900
              border
              border-slate-800
              overflow-hidden
            "
            >
              <button
                onClick={() => {
                  navigate(
                    "/settings"
                  );
                  setOpen(false);
                }}
                className="
                w-full
                px-4
                py-3
                flex
                items-center
                gap-3
                hover:bg-slate-800
              "
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={() => {
                  navigate(
                    "/settings"
                  );
                  setOpen(false);
                }}
                className="
                w-full
                px-4
                py-3
                flex
                items-center
                gap-3
                hover:bg-slate-800
              "
              >
                <Settings
                  size={18}
                />
                Settings
              </button>

              <button
                onClick={
                  handleLogout
                }
                className="
                w-full
                px-4
                py-3
                flex
                items-center
                gap-3
                text-red-400
                hover:bg-red-500/10
              "
              >
                <LogOut
                  size={18}
                />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;