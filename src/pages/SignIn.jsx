import { Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import authApi from "../api/authApi";
import { toast, ToastContainer } from "react-toastify";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await authApi.signIn(formData);
      if (response.data) {
        toast.success("Đăng nhập thành công!");
        // Lưu token vào localStorage
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("refreshToken", response.data.token.refreshToken);
        dispatch(signInSuccess(response.data.user));

        // Kiểm tra vai trò người dùng, nếu là admin thì điều hướng tới /dashboard
        if (response.data.user.role.name === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/"); // Điều hướng tới trang khác nếu không phải admin
        }
      }
    } catch (error) {
      console.error("Failed to sign in: ", error);
      toast.error("Đăng nhập thất bại!");
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <h1 className="text-center text-4xl font-playwrite mb-[80px]">
          Đăng Nhập
        </h1>
        <form
          className="space-y-8 w-[400px] border p-6 py-12 rounded-md"
          onSubmit={handleSignIn}
        >
          {/* Email Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <TextInput
              id="email"
              name="email"
              placeholder="Nhập email của bạn"
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <TextInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập password của bạn"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>
          </div>
          {/* Submit Button */}
          <div className="text-center ">
            <button
              type="submit"
              className="w-full bg-slate-600 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white  hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-slate-600 duration-300"
            >
              {loading ? (
                <div className="">
                  <Spinner size={"sm"} />
                  <span className="pl-3">Đang xử lý...</span>
                </div>
              ) : (
                "Đăng Nhập"
              )}
            </button>

            <div className="mt-4 text-sm">
              <span className="text-slate-400">Bạn chưa có tài khoản?</span>
              <a href="/sign-up" className="text-slate-600">
                Đăng ký
              </a>
            </div>
          </div>
        </form>
        {/* ToastContainer để hiển thị thông báo */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}
