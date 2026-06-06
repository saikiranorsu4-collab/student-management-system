import { Navigate } from "react-router-dom";

import { useAuth }
  from "../context/AuthContext";

const RoleProtected = ({
  children,
  allowedRoles,
}) => {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {

    return (
      <div
        className="
        h-screen
        flex
        items-center
        justify-center
        bg-[#020817]
        text-white
        text-2xl
      "
      >
        Loading...
      </div>
    );

  }

  if (!user) {

    return (
      <Navigate
        to="/login"
      />
    );

  }

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {

    return (
      <Navigate
        to="/dashboard"
      />
    );

  }

  return children;

};

export default RoleProtected;