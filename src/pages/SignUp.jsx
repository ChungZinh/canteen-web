import { Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import authApi from "../api/authApi";
import { HiCheck, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; // Validation schema
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    studentId: "",
    phone: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Họ và tên là bắt buộc."),
    // studentId: Yup.string().required("Mã sinh viên là bắt buộc."),
    phone: Yup.string()
      .matches(/^\d+$/, "Số điện thoại chỉ được chứa số.")
      .required("Số điện thoại là bắt buộc."),
    email: Yup.string()
      .email("Email không hợp lệ.")
      .required("Email là bắt buộc."),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
      .required("Mật khẩu là bắt buộc."),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp.")
      .required("Nhập lại mật khẩu là bắt buộc."),
  });

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await authApi.signUp(values);
      if (response.data) {
        setLoading(false);
        toast.success("Đăng ký thành công!", {
          icon: <HiCheck />,
        });
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Failed to sign up: ", error);
      toast.error("Đăng ký thất bại!", {
        icon: <HiX />,
      });
      setLoading(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-4xl font-playwrite mb-12">Đăng Ký</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 border p-6 py-12 rounded-md">
              {/* Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và Tên
                </label>
                <Field
                  as={TextInput}
                  id="fullName"
                  name="fullName"
                  placeholder="Nhập họ và tên của bạn"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Student ID Input */}
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                  Mã sinh viên
                </label>
                <Field
                  as={TextInput}
                  id="studentId"
                  name="studentId"
                  placeholder="Nhập mã sinh viên của bạn"
                />
                <ErrorMessage name="studentId" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex flex-col gap-6 md:flex-row">
                {/* Phone Input */}
                <div className="md:w-1/2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <Field
                    as={TextInput}
                    id="phone"
                    name="phone"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Email Input */}
                <div className="md:w-1/2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Field
                    as={TextInput}
                    id="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Field
                    as={TextInput}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập password của bạn"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <LuEyeOff /> : <LuEye />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Re-Password Input */}
              <div>
                <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Re-Password
                </label>
                <div className="relative">
                  <Field
                    as={TextInput}
                    id="rePassword"
                    name="rePassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập lại password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <LuEyeOff /> : <LuEye />}
                  </button>
                </div>
                <ErrorMessage name="rePassword" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-slate-600 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-slate-500 duration-300"
                  disabled={isSubmitting || loading}
                >
                  {loading ? (
                    <div>
                      <Spinner size={"sm"} />
                      <span className="pl-3">Đang xử lý...</span>
                    </div>
                  ) : (
                    "Đăng Ký"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
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
