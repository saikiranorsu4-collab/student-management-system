import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  // CHECK TOKEN
  const token = localStorage.getItem("token");

  // IF NO TOKEN → REDIRECT TO LOGIN
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // IF TOKEN EXISTS → SHOW PAGE
  return children;
};

export default ProtectedRoute;