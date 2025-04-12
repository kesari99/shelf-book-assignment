// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, requiredRoles }) => {
  const token = Cookies.get('token');
  const { role } = useSelector(state => state.user);

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;