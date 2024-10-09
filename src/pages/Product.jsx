import { FloatingLabel } from "flowbite-react";
import bg2 from "../assets/imgs/bg4.png";
import { HiSearch } from "react-icons/hi";
import FoodCard from "../components/FoodCard";
export default function Product() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="w-screen h-[400px] mt-[80px] flex justify-center items-center bg-opacity-70 backdrop-blur-sm"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-center text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-playwrite mb-[80px] text-black">
          Tất cả sản phẩm
        </h1>
      </div>

      {/* Search and Products */}
      <div className="max-w-screen-xl mx-auto mb-[80px] px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-screen-md mx-auto mb-8">
          <div className="relative">
            <FloatingLabel
              variant="filled"
              label="Tìm kiếm"
              className="w-full"
            />
            <button className="absolute right-0 top-0 h-full w-[60px] flex justify-center items-center rounded-tr-md bg-slate-600 text-white">
              <HiSearch className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Products Layout */}
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Categories */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <div className="flex flex-wrap gap-4">
              <button className="w-full p-4 text-slate-600 hover:bg-slate-200 duration-300 border rounded-md text-center">
                Món phụ
              </button>
              <button className="w-full p-4 text-slate-600 hover:bg-slate-200 duration-300 border rounded-md text-center">
                Món chính
              </button>
              <button className="w-full p-4 text-slate-600 hover:bg-slate-200 duration-300 border rounded-md text-center">
                Thức uống
              </button>
            </div>
          </div>

          {/* Food Cards */}
          <div className="w-full  lg:w-3/4  flex justify-center items-center ">
            <div className="w-full flex flex-col items-center justify-center md:grid lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-4">
              <FoodCard size="small" />
              <FoodCard size="small" />
              <FoodCard size="small" />
              <FoodCard size="small" />
              <FoodCard size="small" />
              <FoodCard size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}