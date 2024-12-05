// import { Navigate } from "react-router-dom";
// import { AdminToken, SecurityToken, UserToken } from "../apis/api";


// const ProtectedRoute = ({ children, allowedRoles }) => {
//   // Fetch all tokens
//   const adminToken = AdminToken();
//   const userToken = UserToken();
//   const securityToken = SecurityToken();

//   // Ensure at least one valid token exists
//   if (
//     adminToken === "Token is Missing" &&
//     userToken === "Token is Missing" &&
//     securityToken === "Token is Missing"
//   ) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check role against allowed roles
//   const role = sessionStorage.getItem("role");
//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/login" replace />;
//   }

//   // If everything is fine, render the route
//   return children;
// };

// export default ProtectedRoute;
