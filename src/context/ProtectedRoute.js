import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tokens from sessionStorage
    const adminToken = sessionStorage.getItem("adminToken");
    const userToken = sessionStorage.getItem("userToken");
    const securityToken = sessionStorage.getItem("securityToken");

    // Validate tokens
    const tokens = [adminToken, userToken, securityToken];
    const isTokenMissing = tokens.some((token) => !token); // Check if any token is missing or null

    // Redirect if any token is missing
    if (!isTokenMissing) {
      navigate("/login");
      return;
    }

    // Get role and validate access
    const role = sessionStorage.getItem("role") || "";
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      navigate("/login");
      return;
    }
  }, [allowedRoles, navigate]);

  return children;
};

export default ProtectedRoute;
