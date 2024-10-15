import { HiOutlineX } from "react-icons/hi";
import { HiMinus, HiPlus } from "react-icons/hi2";

export default function ProductCart({ product, isCheckout }) {
  return (
    <>
      {isCheckout ? (
        <div className="">
          <div className="flex justify-between items-center">
            <div className="w-20 h-20 border p-2 rounded-md relative">
              <img src={product.image} className=" object-cover " />
              <div className="h-[30px] w-[30px] -top-2 -right-3 flex justify-center items-center font-semibold bg-slate-200 absolute rounded-full text-sm ">
                <p className="text-slate-600">{product.quantity}</p>
              </div>
            </div>

            <div className="">
              <p>
                {/* TOTAL */}
                {(product.quantity * product.price).toLocaleString()}₫
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-b px-4 py-2 relative">
          <div className="flex items-center  gap-6 ">
            <img src={product.image} className="w-28 h-28 object-cover" />
            <div className="space-y-1 w-full">
              <p className="font-semibold">{product.name}</p>
              {/* 20,000₫ */}
              <p className="text-sm">{product.price.toLocaleString()}₫</p>
              <div className="flex ">
                <button className="w-[26px] h-[26px] border flex justify-center items-center">
                  <HiMinus className="h-4 w-4" />
                </button>
                <input
                  className="w-[32px] h-[26px] border text-center text-sm font-semibold bg-slate-200"
                  value={product.quantity}
                />
                <div className="flex justify-between w-full items-center">
                  <button className="w-[26px] h-[26px] border flex justify-center items-center">
                    <HiPlus className="h-4 w-4" />
                  </button>
                  <p>
                    {/* TOTAL */}
                    {(product.quantity * product.price).toLocaleString()}₫
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button className="absolute top-2 right-2">
            {/* Xóa */}
            <HiOutlineX className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
