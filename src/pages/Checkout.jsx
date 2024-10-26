import React, { useState } from "react";
import bg2 from "../assets/imgs/bg4.png";
import { Button, FloatingLabel, Spinner, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi2";
import ProductCart from "../components/ProductCart";
import { useLocation, useNavigate } from "react-router-dom";
import discountApi from "../api/discountApi";
import { toast } from "react-toastify";

export default function Checkout() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("step");
  const { cart, totalItems, totalPrice } = location.state || {};
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyDiscount = async () => {
    try {
      setLoading(true);
      const response = await discountApi.use(
        {
          code: discountCode,
          cartItems: cart,
        },
        currentUser,
        accessToken
      );
      if (response.data) {
        setDiscountAmount(response.data.discountAmount);
        setFinalTotal(response.data.finalTotal);
        setLoading(false);
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
        <div className="flex mb-8">
          <div className="w-1/2 pr-12 border-r">
            {tabFromUrl === "2" ? (
              <>
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
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold">Thông tin khách hàng</h1>
                <div className="mt-4 space-y-4 mb">
                  <FloatingLabel
                    variant="outlined"
                    label="Họ và tên"
                    onChange={handleChange}
                  />
                  <FloatingLabel
                    variant="outlined"
                    label="Số điện thoại"
                    onChange={handleChange}
                  />
                  <FloatingLabel
                    variant="outlined"
                    label="Email"
                    onChange={handleChange}
                  />
                  <div className="flex justify-between items-center">
                    <Button color="light">
                      <div className="flex items-center gap-2">
                        <HiArrowLeft className="h-4 w-4" />
                        <span>Giỏ hàng</span>
                      </div>
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/checkout-step-2", {
                          state: {
                            cart,
                            finalTotal,
                            discountAmount,
                            totalPrice,
                          },
                        });
                      }}
                      className="bg-slate-500"
                    >
                      Tiếp tục đến phương thức thanh toán
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-1/2 pl-12">
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
