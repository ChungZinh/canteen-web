import React, { useState } from "react";
import bg2 from "../assets/imgs/bg4.png";
import { Button, FloatingLabel, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi2";
import ProductCart from "../components/ProductCart";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("step");

  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const data = [
    {
      id: 1,
      name: "Coca Cola",
      price: 20000,
      quantity: 2,
      image:
        "https://product.hstatic.net/200000902933/product/banh_tam_bi_xiu_mai_f2b3b6957c6d4cceab460c93c3a485d4_1024x1024.png",
    },
    {
      id: 2,
      name: "Pepsi",
      price: 25000,
      quantity: 1,
      image:
        "https://product.hstatic.net/200000902933/product/banh_tam_bi_xiu_mai_f2b3b6957c6d4cceab460c93c3a485d4_1024x1024.png",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="overflow-x-hidden">
      <div
        className="w-screen h-[400px] mt-[80px] flex justify-center items-center  bg-opacity-70 backdrop-blur-sm"
        style={{
          backgroundImage: `url(${bg2})`,
          // backgroundSize: "cover",
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
          {tabFromUrl === "2" ? (
            <div className="w-1/2 pr-12 border-r">
              <h1 className="text-xl font-semibold">Phương thức thanh toán</h1>
              <div className="space-y-1 mt-4">
                <div className="flex items-center gap-4 border p-4">
                  <input type="radio" name="payment" id="momo" />
                  <div className="flex  items-center gap-2">
                    <img
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png"
                      alt=""
                      className="w-10 h-10 "
                    />
                    <label htmlFor="momo">Thanh toán qua ZaloPay</label>
                  </div>
                </div>
                <div className="flex items-center gap-4 border  p-4">
                  <input type="radio" name="payment" id="zalo" />
                  <div className="flex  items-center gap-2">
                    <img
                      src="https://imgs.search.brave.com/KY5s3Gb9IFeHJMoLPyU9n4F_7RNzno1vVHNbgTBN1MY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLm1vbW8u/dm4vdjMvYXNzZXRz/L2ltYWdlcy9wcmlt/YXJ5LW1vbW8tZGRk/NjYyYjA5ZTk0ZDg1/ZmFjNjllMjQ0MzFm/ODczNjUucG5n"
                      alt=""
                      className="w-10 h-10 "
                    />
                    <label htmlFor="zalo">Thanh toán qua MoMo</label>
                  </div>
                </div>
                <div className="flex items-center gap-4 border  p-4">
                  <input type="radio" name="payment" id="visa" />
                  <label htmlFor="visa">
                    Thanh toán bằng thẻ tài khoản sinh viên
                  </label>
                </div>
              </div>
              <div className="flex  justify-between items-center mt-4">
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
            <div className="w-1/2 pr-12 border-r">
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
                <div className="flex  justify-between items-center">
                  <Button color="light">
                    <div className="flex items-center gap-2">
                      <HiArrowLeft className="h-4 w-4" />
                      <span>Giỏ hàng</span>
                    </div>
                  </Button>

                  <Button className="bg-slate-500">
                    Tiếp tục đến phương thức thanh toán
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="w-1/2 pl-12 ">
            {/* LIST PRODUCT */}
            <div className="space-y-4 border-b pb-4">
              {data.map((product) => (
                <ProductCart key={product.id} product={product} isCheckout />
              ))}
            </div>

            {/* DISCOUNT */}
            <div className="flex w-full gap-2 mt-4 items-center border-b pb-4">
              <div className="w-4/5">
                <TextInput placeholder="Mã giảm giá" />
              </div>
              <Button className="w-1/5 bg-slate-500">Áp dụng</Button>
            </div>

            <div className="mt-4 space-y-1 border-b pb-4">
              <div className="flex items-center justify-between">
                <p>Tạm tính</p>
                <p>
                  {data
                    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                    .toLocaleString()}
                  đ
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Tổng mã giảm giá</p>
                <p>0đ</p>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center rounded-md bg-slate-200 py-4 px-2 mt-4">
              <p className="text-xl font-semibold">Tổng cộng</p>
              <p className="text-xl">
                {data
                  .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                  .toLocaleString()}
                đ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
