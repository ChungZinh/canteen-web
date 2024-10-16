import { Button, Carousel } from "flowbite-react";
import logo from "../assets/imgs/logo.png";
import { GiForkKnifeSpoon } from "react-icons/gi";
import bg from "../assets/imgs/bg1.jpg";
import FoodCard from "../components/FoodCard";
import { HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";
import { useRef } from "react";
export default function Home() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -410, // Cuộn sang trái 300px
      behavior: "smooth", // Cuộn mượt
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 410, // Cuộn sang phải 300px
      behavior: "smooth", // Cuộn mượt
    });
  };

  const mainFood = [
    {
      id: 1,
      component: <FoodCard />,
    },
    {
      id: 2,
      component: <FoodCard />,
    },
    {
      id: 3,
      component: <FoodCard />,
    },
    {
      id: 4,
      component: <FoodCard />,
    },

    {
      id: 5,
      component: <FoodCard />,
    },
  ];
  return (
    <div className="mt-[80px]">
      {/* SLIDER */}

      <div className="w-full h-[300px] md:h-[600px]">
        <Carousel leftControl=" " rightControl=" ">
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
            className="rounded-none"
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>

      {/* GIOI THIEU */}

      <div className="w-full h-auto md:h-[400px] flex flex-col md:flex-row justify-center items-center gap-8 md:gap-[150px] p-4">
        <div className="p-12 w-[200px] h-[200px] md:w-[250px] md:h-[250px] flex justify-center items-center rounded-xl shadow-md shadow-neutral-400 bg-slate-400">
          <img src={logo} alt="" className="w-[120px] md:w-[150px]" />
        </div>
        <div className="space-y-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl">
            Chào mừng bạn đến với canteen IUH
          </h1>
          <div className="flex justify-center md:justify-start gap-6">
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-slate-200 flex justify-center items-center border border-slate-600">
              <GiForkKnifeSpoon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            {/* other icons */}
          </div>
          <p className="text-sm md:text-lg">
            Canteen IUH là nơi cung cấp các món ăn ngon...
          </p>
          <button className="bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-slate-500">
            Đặt món ngay
          </button>
        </div>
      </div>

      {/* MENU */}
      <div className="">
        <div className="mt-[100px]">
          <h1 className="text-center text-6xl font-playwrite mb-[50px]">
            Menu
          </h1>
        </div>
        <div
          className="w-full h-auto mt-[20px] bg-opacity-70 backdrop-blur-sm pb-12"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="p-4 md:p-8">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="w-[150px] h-[40px] md:w-[200px] bg-slate-400 font-semibold text-white shadow-md flex justify-center items-center rounded-lg">
                <p>Món phụ</p>
              </div>
              <div className="w-[200px] h-[40px] bg-slate-400 font-semibold text-white shadow-md shadow-neutral-400 flex justify-center items-center rounded-lg">
                <p>Món chính</p>
              </div>
              <div className="w-[200px] h-[40px] bg-slate-400 font-semibold text-white shadow-md shadow-neutral-400 flex justify-center items-center rounded-lg">
                <p>Thức uống</p>
              </div>
            </div>

            {/* Slider container */}
            <div className="flex justify-center relative ">
              <div
                className="overflow-x-hidden whitespace-nowrap flex lg:space-x-12 space-x-8 md:space-x-8 mt-8 lg:max-w-screen-xl sm:max-w-screen-sm md:max-w-screen-md lg:mx-auto md:mx-auto sm:mx-auto"
                ref={sliderRef}
              >
                {mainFood.map((food) => (
                  <div className="" key={food.id}>
                    {food.component}
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="absolute inset-y-0 left-0 flex items-center ">
                <button
                  className="bg-slate-500 text-white p-2 rounded-full"
                  onClick={scrollLeft}
                >
                  <HiArrowLeftCircle className="w-10 h-10 md:w-12 md:h-12" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  className="bg-slate-500 text-white p-2 rounded-full"
                  onClick={scrollRight}
                >
                  <HiArrowRightCircle className="w-10 h-10 md:w-12 md:h-12" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button href="/products" className="bg-slate-400 px-3 md:px-4 rounded-md">
              Xem thêm
            </Button>
          </div>
        </div>
      </div>

      {/* SAN PHAM BAN CHAY */}
      <div className="mt-[100px] mb-[100px]">
        <h1 className="text-center text-3xl md:text-6xl font-playwrite mb-[50px]">
          Sản phẩm bán chạy
        </h1>
        <div className="max-w-screen-xl mx-auto flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-[50px]">
            <FoodCard size="small" />
            <FoodCard size="small" />
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
  );
}
