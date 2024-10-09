import { Spinner, TextInput, Toast } from "flowbite-react";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import authApi from "../api/authApi";
import { HiCheck, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    phone: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await authApi.signUp(formData);
      if (response.data) {
        setLoading(false);
        toast.success("Đăng ký thành công!", {
          icon: <HiCheck />,
        });
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Failed to sign in: ", error);
      toast.error("Đăng ký thất bại!", {
        icon: <HiX />,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-4xl font-playwrite mb-12">Đăng Ký</h1>
        <form
          className="space-y-6 border p-6 py-12 rounded-md"
          onSubmit={handleSignIn}
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Họ và Tên
            </label>
            <TextInput
              id="fullName"
              name="fullName"
              placeholder="Nhập họ và tên của bạn"
              onChange={handleChange}
            />
          </div>

          {/* Student ID Input */}
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mã sinh viên
            </label>
            <TextInput
              id="studentId"
              name="studentId"
              placeholder="Nhập mã sinh viên của bạn"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            {/* Phone Input */}
            <div className="md:w-1/2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Số điện thoại
              </label>
              <TextInput
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại của bạn"
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div className="md:w-1/2">
              <label
                htmlFor="email"
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
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
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

          {/* Re-Password Input */}
          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Re-Password
            </label>
            <div className="relative">
              <TextInput
                id="rePassword"
                name="rePassword"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập lại password"
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
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-slate-600 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white  hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-slate-500 duration-300"
            >
              {loading ? (
                <div className="">
                  <Spinner size={"sm"} />
                  <span className="pl-3">Đang xử lý...</span>
                </div>
              ) : (
                "Đăng Ký"
              )}
            </button>

            <div className="mt-4 text-sm">
              <span className="text-slate-400">Bạn đã có tài khoản?</span>
              <a href="/sign-in" className="text-slate-600">
                Đăng nhập
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
