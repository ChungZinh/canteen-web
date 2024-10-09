import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function UserRoute() {
  const { currentUser } = useSelector((state) => state.user);



  if (currentUser) {
    // Redirect to home if the user is already logged in
    return <Navigate to="/" />;
  }

  // Allow access to the route for non-authenticated users
  return <Outlet />;
}
