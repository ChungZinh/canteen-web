import { Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  const { loading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(signInStart());
        const response = await authApi.signIn(values);
        if (response.data) {
          toast.success("Đăng nhập thành công!");
          localStorage.setItem("accessToken", response.data.token.accessToken);
          localStorage.setItem("refreshToken", response.data.token.refreshToken);
          dispatch(signInSuccess(response.data.user));

          // Navigate based on user role
          if (response.data.user.role.name === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Failed to sign in: ", error);
        toast.error("Đăng nhập thất bại!");
        dispatch(signInFailure(error.message));
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-center text-4xl font-playwrite mb-[80px]">
          Đăng Nhập
        </h1>
        <form
          className="space-y-8 w-[400px] border p-6 py-12 rounded-md"
          onSubmit={formik.handleSubmit}
        >
          {/* Email Input */}
          <div>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              color={formik.errors.email && formik.touched.email ? "failure" : ""}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                color={
                  formik.errors.password && formik.touched.password
                    ? "failure"
                    : ""
                }
                helperText={formik.touched.password && formik.errors.password}
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
              className="w-full bg-slate-600 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-slate-600 duration-300"
            >
              {loading ? (
                <div>
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
        {/* ToastContainer for notifications */}
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
