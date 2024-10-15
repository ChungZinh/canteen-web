import bg2 from "../assets/imgs/bg4.png";
import ProductCart from "../components/ProductCart";
import { Button, Textarea } from "flowbite-react";

export default function Cart() {
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
          Giỏ hàng
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-2 justify-center items-center mb-6">
          <h1 className="text-2xl font-semibold">Giỏ hàng của bạn</h1>
          <p>Có 2 sản phẩm trong giỏ hàng</p>
          <div className="w-[200px] h-[2px] bg-slate-600"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-3/4 ">
            {/* LIST PRODUCT */}
            <div className="border-r pr-4">
              {data.map((product) => (
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
            {/* NOTE */}
            <div className=" mt-4 mb-8 space-y-2">
              <p>Ghi chú đơn hàng</p>
              <Textarea placeholder="Nhập ghi chú" rows={6} />
            </div>
          </div>
          <div className="w-1/4">
            <div className="border px-4">
              <div className="border-b py-4">
                <h1 className="text-xl font-semibold">Thông tin đơn hàng</h1>
              </div>
              <div className="border-b py-4 flex justify-between items-center">
                <p>Tổng tiền: </p>
                <p>
                  {data
                    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                    .toLocaleString()}
                  đ
                </p>
              </div>
              <div className=" my-6 ">
                <Button className="bg-slate-500 w-full" href="/checkout">
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
