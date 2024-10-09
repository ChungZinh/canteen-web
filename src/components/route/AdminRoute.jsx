import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  // check isAdmin
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.role.name === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
