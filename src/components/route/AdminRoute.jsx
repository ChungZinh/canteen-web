import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function AdminRoute() {
  const navigate = useNavigate();
  // check isAdmin
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    if (currentUser?.role?.name === "admin") {
      navigate("/dashboard"); // Chuyển hướng đến /dashboard nếu role là admin
    }
  }, [currentUser, navigate]);

  // Nếu user không phải admin, bạn có thể điều hướng họ đến một trang khác
  return currentUser?.role?.name === "admin" ? <Outlet /> : <Navigate to="/" />;
  
}
