import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ isAdmin = false }) {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  if (isAdmin && currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
