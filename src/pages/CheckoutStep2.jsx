import React, { useEffect, useState } from "react";
import bg2 from "../assets/imgs/bg4.png";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi2";
import ProductCart from "../components/ProductCart";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import orderApi from "../api/orderApi";
import { clearCart } from "../redux/cart/cartSlice";
import { buildQueryString } from "../utils/buildQueryString";
import userApi from "../api/userApi";
import discountApi from "../api/discountApi";
import PaymentOption from "../components/PaymentOption";

export default function Checkout() {
  const location = useLocation();
  const { cart, finalTotal, discountAmount, totalPrice, note, customerInfo } =
    location.state || {};
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [discountCode, setDiscountCode] = useState("");
  const [point, setPoint] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("ZaloPay"); // Default payment method
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [user, setUser] = useState(null);
  const [discountAmount1, setDiscountAmount1] = useState(0);
  const [finalTotal1, setFinalTotal1] = useState(0);
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
        setDiscountAmount1(response.data.discountAmount);
        setFinalTotal1(response.data.finalTotal);
        setLoading(false);
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi áp dụng mã giảm giá!");
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading1(true);
    try {
      const orderData = {
        userId: currentUser?._id,
        foods: cart,
        amount: finalTotal1 || finalTotal || totalPrice,
        paymentMethod,
        note,
        point,
        customerInfo,
      };


      if (paymentMethod === "Ví Sinh Viên") {
        if (user.points < point) {
          toast.error("Số điểm bạn nhập lớn hơn số điểm hiện có");
          return;
        }

        if (user?.wallet?.balance < (finalTotal1 || finalTotal || totalPrice)) {
          toast.error("Số tiền trong ví không đủ để thanh toán");
          return;
        }

        const response = await orderApi.create(
          orderData,
          currentUser,
          accessToken
        );

        if (response.data) {
          dispatch(clearCart());
          toast.success("Đã đặt hàng thành công");
          navigate("/profile");
        } else {
          // Handle the case where orderUrl is not present
          setLoading1(false);
          toast.error(
            "Đã tạo đơn hàng, nhưng không tìm thấy liên kết thanh toán!"
          );
        }
      } else if (paymentMethod === "ZaloPay") {

         if (point > user?.points) {
          toast.error("Số điểm bạn nhập lớn hơn số điểm hiện có");
          return;
        }
        const response = await orderApi.create(
          orderData,
          currentUser,
          accessToken
        );

        if (response.data && response.data.orderUrl) {
          dispatch(clearCart());
          // Navigate to the orderUrl
          window.location.replace(response.data.orderUrl);
        } else {
          // Handle the case where orderUrl is not present
          setLoading1(false);
          toast.error(
            "Đã tạo đơn hàng, nhưng không tìm thấy liên kết thanh toán!"
          );
        }
      } else {
        toast.error("Chưa hỗ trợ phương thức thanh toán này!");
      }
    } catch (error) {
      console.log(error);
      setLoading1(false);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng!");
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const queryB = buildQueryString(query);
      const response = await userApi.getUserById(
        currentUser._id,
        queryB,
        currentUser,
        accessToken
      );
      setUser(response.data.user);
    };
    fetchUser();
  }, [currentUser, accessToken, query]);

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
            <h1 className="text-xl font-semibold">Phương thức thanh toán</h1>
            <div className="space-y-1 mt-4">
              <PaymentOption
                id="zalo"
                label="Thanh toán qua ZaloPay"
                imageUrl="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png"
                isSelected={paymentMethod === "ZaloPay"}
                onSelect={() => setPaymentMethod("ZaloPay")}
              />
              <PaymentOption
                id="momo"
                label="Thanh toán qua MoMo"
                imageUrl="https://imgs.search.brave.com/KY5s3Gb9IFeHJMoLPyU9n4F_7RNzno1vVHNbgTBN1MY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLm1vbW8u/dm4vdjMvYXNzZXRz/L2ltYWdlcy9wcmlt/YXJ5LW1vbW8tZGRk/NjYyYjA5ZTk0ZDg1/ZmFjNjllMjQ0MzFm/ODczNjUucG5n"
                isSelected={paymentMethod === "MoMo"}
                onSelect={() => setPaymentMethod("MoMo")}
              />
              <PaymentOption
                id="visa"
                label="Thanh toán bằng ví sinh viên"
                isSelected={paymentMethod === "Ví Sinh Viên"}
                onSelect={() => setPaymentMethod("Ví Sinh Viên")}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button color="light" onClick={() => navigate("/cart")}>
                <div className="flex items-center gap-2">
                  <HiArrowLeft className="h-4 w-4" />
                  <span>Giỏ hàng</span>
                </div>
              </Button>
              <Button className="bg-slate-500" onClick={handleCheckout}>
                {loading1 ? (
                  <div className="flex items-center">
                    <Spinner className="mr-2" />
                    Hoàn tất đơn hàng
                  </div>
                ) : (
                  "Hoàn tất đơn hàng"
                )}
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 xl:w-1/2 w-full xl:pl-12 lg:pl-12 p-2">
            {/* LIST PRODUCT */}
            <div className="space-y-4 border-b pb-4">
              {cart.map((product) => (
                <ProductCart key={product._id} product={product} isCheckout />
              ))}
            </div>

            <div className="border-b pb-4">
              {/* POINTS */}
              {currentUser && (
                <div className="mt-4">
                  <span className="text-sm font-semibold">
                    Điểm tích lũy hiện có: {user?.points} điểm
                  </span>
                  <div className="flex w-full gap-2  items-center   ">
                    <div className="w-4/5">
                      <TextInput
                        disabled={currentUser ? false : true}
                        placeholder="Dùng điểm tích lũy"
                        value={point}
                        onChange={(e) => setPoint(e.target.value)}
                        type="number"
                        min={0}
                        max={user?.points}
                      />
                    </div>
                    <Button
                      className="w-1/5 bg-slate-500"
                      disabled={currentUser ? false : true}
                      onClick={() => setPoint(user?.points)}
                    >
                      Tất cả
                    </Button>
                  </div>
                </div>
              )}

              {/* DISCOUNT */}
              <div className="flex w-full gap-2 mt-4 items-center ">
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
            </div>

            <div className="mt-4 space-y-1 border-b pb-4">
              <div className="flex items-center justify-between">
                <p>Tạm tính</p>
                <p>{totalPrice.toLocaleString()}đ</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Tổng mã giảm giá</p>
                <p>
                  {discountAmount?.toLocaleString() ||
                    discountAmount1?.toLocaleString()}
                  đ
                </p>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center rounded-md bg-slate-200 py-4 px-2 mt-4">
              <p className="text-xl font-semibold">Tổng cộng</p>
              <p className="text-xl">
                {discountAmount > 0 || discountAmount1 > 0
                  ? finalTotal1?.toLocaleString()
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
