import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function AdminRoute() {
  const navigate = useNavigate();
  // Kiểm tra currentUser từ Redux
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.role?.name === "admin") {
      navigate("/dashboard"); // Chuyển hướng đến /dashboard nếu role là admin
    } else if (currentUser?.role?.name === "chef") {
      navigate("/chef-dashboard"); // Chuyển hướng đến /chef-dashboard nếu role là chef
    }
  }, [currentUser, navigate]);

  // Nếu người dùng có role admin hoặc chef, hiển thị Outlet (component con)
  // Nếu không phải admin hay chef, chuyển hướng về trang chủ hoặc trang đăng nhập
  return currentUser?.role?.name === "admin" ||
    currentUser?.role?.name === "chef" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
