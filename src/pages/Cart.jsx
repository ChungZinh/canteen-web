import bg2 from "../assets/imgs/bg4.png";
import ProductCart from "../components/ProductCart";
import { Button, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  // Lấy dữ liệu giỏ hàng từ Redux store
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate(); // Hook to navigate to the checkout page
  // Tính toán tổng số sản phẩm và tổng tiền
  const [note, setNote] = useState("");
  const totalItems = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity({ _id: productId }));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity({ _id: productId }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ _id: productId }));
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Navigate to checkout page and pass the cart data
      navigate("/checkout", { state: { cart, totalItems, totalPrice, note } });
    } else {
      alert("Giỏ hàng của bạn đang trống!");
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
          Giỏ hàng
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-2 justify-center items-center mb-6">
          <h1 className="text-2xl font-semibold">Giỏ hàng của bạn</h1>
          <p>Có {totalItems} sản phẩm trong giỏ hàng</p>
          <div className="w-[200px] h-[2px] bg-slate-600"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-3/4">
            {/* LIST PRODUCT */}
            <div className="border-r pr-4">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <ProductCart
                    key={product.id}
                    product={product}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))
              ) : (
                <p>Giỏ hàng của bạn đang trống.</p>
              )}
            </div>
            {/* NOTE */}
            <div className="mt-4 mb-8 space-y-2">
              <p>Ghi chú đơn hàng</p>
              <Textarea
                placeholder="Nhập ghi chú"
                rows={6}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/4">
            <div className="border px-4">
              <div className="border-b py-4">
                <h1 className="text-xl font-semibold">Thông tin đơn hàng</h1>
              </div>
              <div className="border-b py-4 flex justify-between items-center">
                <p>Tổng tiền: </p>
                <p>{totalPrice.toLocaleString()}đ</p>
              </div>
              <div className="my-6">
                <Button
                  onClick={handleCheckout}
                  className="bg-slate-500 w-full"
                  href="/checkout"
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
