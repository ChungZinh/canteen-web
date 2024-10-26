import { HiPlus } from "react-icons/hi2";
import food from "../assets/imgs/img1.png";
import { addToCart } from "../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function FoodCard({ size, cart, product }) {
  const dispatch = useDispatch(); // Hook dùng để dispatch actions
  const navigate = useNavigate(); // Hook to navigate to the checkout page
  const handleAddToCart = (product) => {
    try {
      dispatch(addToCart({ ...product, quantity: 1 })); // Dispatch action addToCart kèm với sản phẩm và số lượng
    } catch (error) {
      console.log("Error adding to cart: ", error);
    }
  };

  const handleBuyNow = (product) => {
    try {
      dispatch(addToCart({ ...product, quantity: 1 })); // Dispatch action addToCart kèm với sản phẩm và số lượng
      navigate("/cart"); // Navigate
    } catch (error) {
      console.log("Error adding to cart: ", error);
    }
  };

  return (
    <div className="">
      {size === "small" ? (
        <div className="w-[280px] h-[380px] bg-white shadow-md   flex flex-col border shadow-neutral-400 rounded-2xl">
          <div className=" h-4/6 flex justify-center items-center border-b">
            <div className="w-56 h-56 rounded-md overflow-hidden ">
              <img src={product?.image} className="w-56 h-56 object-contain" />
            </div>
          </div>
          <div className="h-1/6 p-4 mt-6">
            <p className="text-center inria-sans-bold-italic font-semibold  text-md">
              {product?.name}
            </p>
            <div className="flex justify-between items-center ">
              <p className="text-center inria-sans-light-italic text-md">
                Giá: {product?.price.toLocaleString()}đ
              </p>
              <button
                onClick={
                  cart
                    ? () => handleAddToCart(product)
                    : () => handleBuyNow(product)
                }
                className=" bg-primary-500 text-slate-500 hover:bg-slate-200 duration-200 border font-semibold rounded-lg p-2 mt-2"
              >
                {cart ? (
                  <div className="flex items-center">
                    <HiPlus className="h-6 w-6" />
                  </div>
                ) : (
                  "Mua ngay"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[380px] border h-[500px] bg-white shadow-md flex flex-col shadow-neutral-400 rounded-2xl">
          <div className=" h-4/5  flex justify-center items-center border-b">
            <div className="w-64 h-64 rounded-md overflow-hidden ">
              <img src={product?.image} className="w-64 h-64 object-contain" />
            </div>
          </div>
          <div className="h-1/6 p-4">
            <p className="text-center inria-sans-bold-italic font-semibold text-lg">
              {product?.name}
            </p>
            <div className="flex justify-between items-center ">
              <p className="text-center inria-sans-light-italic text-md">
                Giá: {product?.price.toLocaleString()}đ
              </p>
              <button
                onClick={() => handleBuyNow(product)}
                className=" bg-primary-500 hover:bg-slate-200 duration-200 text-slate-500 border font-semibold rounded-lg p-2 mt-2"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
