import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem(
          "user"
        );

      const storedToken =
        localStorage.getItem(
          "token"
        );

      if (
        storedUser &&
        storedToken
      ) {

        setUser(
          JSON.parse(
            storedUser
          )
        );

        setToken(
          storedToken
        );

      }

    } catch (error) {

      console.error(
        "Auth Restore Error:",
        error
      );

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );

    } finally {

      setLoading(false);

    }

  }, []);

  const login = (
    userData,
    userToken
  ) => {

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );

    localStorage.setItem(
      "token",
      userToken
    );

    setUser(userData);

    setToken(userToken);

  };

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    setToken(null);

  };

  const updateUser = (
  updatedUser
) => {

  const mergedUser = {

    ...user,

    ...updatedUser,

  };

  localStorage.setItem(
    "user",
    JSON.stringify(
      mergedUser
    )
  );

  setUser(
    mergedUser
  );

};

  const value = {

    user,

    token,

    loading,

    login,

    logout,

    updateUser,

    isAuthenticated:
      !!token,

    isAdmin:
      user?.role ===
      "admin",

    isTeacher:
      user?.role ===
      "teacher",

    isStudent:
      user?.role ===
      "student",

  };

  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => {

  const context =
    useContext(
      AuthContext
    );

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;

};