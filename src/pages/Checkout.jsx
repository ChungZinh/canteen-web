import React, { useState } from "react";
import bg2 from "../assets/imgs/bg4.png";
import { Button, FloatingLabel, Spinner, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi2";
import ProductCart from "../components/ProductCart";
import { useLocation, useNavigate } from "react-router-dom";
import discountApi from "../api/discountApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Checkout() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("step");
  const { cart, totalItems, totalPrice, note } = location.state || {};
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Họ và tên không được để trống"),
      phone: Yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
    }),
    onSubmit: (values) => {
      navigate("/checkout-step-2", {
        state: {
          cart,
          finalTotal,
          discountAmount,
          totalPrice,
          note,
          customerInfo: { ...values },
        },
      });
    },
  });

  const handleApplyDiscount = async () => {
    setLoading(true);
    try {
      const response = await discountApi.use(
        {
          code: discountCode,
          cartItems: cart,
        },
        currentUser,
        accessToken
      );

      if (response.code === 500) {
        toast.error(response.message);
        setLoading(false);
      } else {
        setDiscountAmount(response.data.discountAmount);
        setLoading(false);
        setFinalTotal(response.data.finalTotal);
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi áp dụng mã giảm giá!");
      setLoading(false);
    }
  };


  return (
    <div className="overflow-x-hidden">
      <div
        className="w-screen h-[400px] mt-[80px] flex justify-center items-center bg-opacity-70 backdrop-blur-sm"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-center text-4xl lg:text-6xl font-playwrite mb-[80px]">
          Thanh toán
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto">
        <div className="flex mb-8 flex-col lg:flex-row xl:flex-row  justify-center items-center gap-4">
          <div className="lg:w-1/2 xl:w-1/2 w-full lg:pr-12 xl:pr-12 p-2  border-r">
            {tabFromUrl === "2" ? (
              <div>
                <h1 className="text-xl font-semibold">
                  Phương thức thanh toán
                </h1>
                <div className="space-y-1 mt-4">
                  <PaymentOption
                    id="momo"
                    label="Thanh toán qua ZaloPay"
                    imageUrl="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png"
                  />
                  <PaymentOption
                    id="zalo"
                    label="Thanh toán qua MoMo"
                    imageUrl="https://imgs.search.brave.com/KY5s3Gb9IFeHJMoLPyU9n4F_7RNzno1vVHNbgTBN1MY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLm1vbW8u/dm4vdjMvYXNzZXRz/L2ltYWdlcy9wcmlt/YXJ5LW1vbW8tZGRk/NjYyYjA5ZTk0ZDg1/ZmFjNjllMjQ0MzFm/ODczNjUucG5n"
                  />
                  <PaymentOption
                    id="visa"
                    label="Thanh toán bằng thẻ tài khoản sinh viên"
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button color="light">
                    <div className="flex items-center gap-2">
                      <HiArrowLeft className="h-4 w-4" />
                      <span>Giỏ hàng</span>
                    </div>
                  </Button>
                  <Button className="bg-slate-500">Hoàn tất đơn hàng</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <h1 className="text-xl font-semibold text-center">
                  Thông tin khách hàng
                </h1>
                <div className="mt-4 space-y-4">
                  <TextInput
                    placeholder="Họ và tên"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    color={
                      formik.errors.fullName && formik.touched.fullName
                        ? "failure"
                        : undefined
                    }
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.fullName}
                    </p>
                  )}

                  <TextInput
                    placeholder="Số điện thoại"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    color={
                      formik.errors.phone && formik.touched.phone
                        ? "failure"
                        : undefined
                    }
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.phone}
                    </p>
                  )}

                  <TextInput
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    color={
                      formik.errors.email && formik.touched.email
                        ? "failure"
                        : undefined
                    }
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}

                  <div className="flex justify-between gap-2 items-center">
                    <Button color="light">
                      <div className="flex items-center gap-2">
                        <HiArrowLeft className="h-4 w-4" />
                        <span>Giỏ hàng</span>
                      </div>
                    </Button>
                    <Button type="submit" className="bg-slate-500">
                      Tiếp tục đến phương thức thanh toán
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="lg:w-1/2 xl:w-1/2 w-full xl:pl-12 lg:pl-12 p-2">
            {/* LIST PRODUCT */}
            <div className="space-y-4 border-b pb-4">
              {cart.map((product) => (
                <ProductCart key={product._id} product={product} isCheckout />
              ))}
            </div>

            {/* DISCOUNT */}
            <div className="flex w-full gap-2 mt-4 items-center border-b pb-4">
              <div className="w-4/5">
                <TextInput
                  placeholder="Mã giảm giá"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
              </div>
              <Button
                onClick={handleApplyDiscount}
                className="w-1/5 bg-slate-500"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Spinner className="mr-2" />
                    Đang áp dụng
                  </div>
                ) : (
                  "Áp dụng"
                )}
              </Button>
            </div>

            <div className="mt-4 space-y-1 border-b pb-4">
              <div className="flex items-center justify-between">
                <p>Tạm tính</p>
                <p>{totalPrice.toLocaleString()}đ</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Tổng mã giảm giá</p>
                <p>{discountAmount?.toLocaleString()}đ</p>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center rounded-md bg-slate-200 py-4 px-2 mt-4">
              <p className="text-xl font-semibold">Tổng cộng</p>
              <p className="text-xl">
                {discountAmount > 0
                  ? finalTotal?.toLocaleString()
                  : totalPrice.toLocaleString()}
                đ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable PaymentOption component
const PaymentOption = ({ id, label, imageUrl }) => (
  <div className="flex items-center gap-4 border p-4">
    <input type="radio" name="payment" id={id} />
    <div className="flex items-center gap-2">
      {imageUrl && <img src={imageUrl} alt={label} className="w-10 h-10" />}
      <label htmlFor={id}>{label}</label>
    </div>
  </div>
);
