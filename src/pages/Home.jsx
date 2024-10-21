import { Button, Carousel } from "flowbite-react";
import logo from "../assets/imgs/logo.png";
import { GiForkKnifeSpoon } from "react-icons/gi";
import bg from "../assets/imgs/bg1.jpg";
import FoodCard from "../components/FoodCard";
import { HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { buildQueryString } from "../utils/buildQueryString";
import foodApi from "../api/foodApi";
import { toast } from "react-toastify";
import slide from "../assets/imgs/slides/slide1.jpg";
import slide1 from "../assets/imgs/slides/slide2.jpg";
import slide2 from "../assets/imgs/slides/slide1.jpg";
import slide3 from "../assets/imgs/slides/slide2.jpg";
import {
  FOOD_BREAKFAST,
  FOOD_DESSERT,
  FOOD_DINNER,
  FOOD_DRINK,
  FOOD_LUNCH,
} from "../constants/categories";
export default function Home() {
  const [query, setQuery] = useState({ all: true });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Món chính",
    "Món phụ",
    "Thức uống",
  ]);

  const [foodMain, setFoodMain] = useState([]);
  const [foodSide, setFoodSide] = useState([]);
  const [foodDrink, setFoodDrink] = useState([]);

  const [selectCategory, setSelectCategory] = useState("Món chính");

  // Dish dummy data
  useEffect(() => {
    // Fetch
    setLoading(true);
    const fetchFoods = async () => {
      const queryB = buildQueryString(query);
      const response = await foodApi.getAllFoods(queryB);
      if (response.data) {
        setProducts(response.data.foods);
        setLoading(false);

        const foods = response.data.foods;

        // Khởi tạo các danh sách rỗng
        const mainDishes = [];
        const sideDishes = [];
        const drinks = [];

        // Duyệt qua các sản phẩm và phân loại dựa trên category
        foods.forEach((food) => {
          if (
            food.category.name === FOOD_BREAKFAST ||
            food.category.name === FOOD_LUNCH ||
            food.category.name === FOOD_DINNER
          ) {
            mainDishes.push(food);
          } else if (food.category.name === FOOD_DESSERT) {
            sideDishes.push(food);
          } else if (food.category.name === FOOD_DRINK) {
            drinks.push(food);
          }
        });

        // Cập nhật state với dữ liệu đã phân loại
        setFoodMain(mainDishes);
        setFoodSide(sideDishes);
        setFoodDrink(drinks);
      } else {
        toast.error("Failed to fetch foods");
        setLoading(false);
      }
    };

    const fetchFoodsTop = async () => {
      const response = await foodApi.getTop10SellingProducts();
      if (response.data) {
        setTopProducts(response.data);
        setLoading(false);
      } else {
        toast.error("Failed to fetch foods");
        setLoading(false);
      }
    };

    fetchFoodsTop();
    fetchFoods();
  }, [currentUser?._id, query]);

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

  return (
    <div className="mt-[80px]">
      {/* SLIDER */}

      <div className="w-full h-[300px] md:h-[600px] ">
        <Carousel leftControl=" " rightControl=" ">
          <img src={slide} alt="..." />
          <img src={slide1} alt="..." />
          <img src={slide2} alt="..." />
          <img src={slide3} alt="..." />
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
            <div className={`flex flex-wrap justify-center gap-4 md:gap-8`}>
              {categories.map((category) => (
                <>
                  <button
                    onClick={() => setSelectCategory(category)}
                    className={`w-[150px] h-[40px] md:w-[200px] bg-slate-400 font-semibold text-white shadow-md flex justify-center items-center duration-300 rounded-lg 
                    ${
                      selectCategory === category
                        ? "bg-slate-500"
                        : "hover:bg-slate-500"
                    }
                      `}
                  >
                    <p>{category}</p>
                  </button>
                </>
              ))}
            </div>

            {/* Slider container */}
            <div className="flex justify-center relative ">
              <div
                className="overflow-x-hidden whitespace-nowrap flex lg:space-x-12 space-x-8 md:space-x-8 mt-8 lg:max-w-screen-xl sm:max-w-screen-sm md:max-w-screen-md lg:mx-auto md:mx-auto sm:mx-auto"
                ref={sliderRef}
              >
                {
                  {
                    "Món chính": (
                      <>
                        {foodMain.map((food) => (
                          <FoodCard
                            key={food._id}
                            product={food}
                            size={"large"}
                          />
                        ))}
                      </>
                    ),
                    "Món phụ": (
                      <>
                        {foodSide.map((food) => (
                          <FoodCard
                            key={food._id}
                            product={food}
                            size={"large"}
                          />
                        ))}
                      </>
                    ),
                    "Thức uống": (
                      <>
                        {foodDrink.map((food) => (
                          <FoodCard
                            key={food._id}
                            product={food}
                            size={"large"}
                          />
                        ))}
                      </>
                    ),
                  }[selectCategory]
                }
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
            <Button
              href="/products"
              className="bg-slate-400 px-3 md:px-4 rounded-md"
            >
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
            {topProducts.map((product) => (
              <FoodCard key={product._id} product={product} size={"small"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
