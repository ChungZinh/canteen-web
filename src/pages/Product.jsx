import { FloatingLabel } from "flowbite-react";
import bg2 from "../assets/imgs/bg4.png";
import { HiSearch } from "react-icons/hi";
import FoodCard from "../components/FoodCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import foodApi from "../api/foodApi";
import { buildQueryString } from "../utils/buildQueryString";
import { categories } from "../constants/categories";
import categoryApi from "../api/categoryApi";

export default function Product() {
  const [query, setQuery] = useState({ all: true });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("Tất cả");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchFoods = async () => {
      const queryB = buildQueryString(query);
      const response = await foodApi.getAllFoods(queryB);
      if (response.data) {
        setProducts(response.data.foods);
        setLoading(false);
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
        toast.error("Failed to fetch top foods");
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      const response = await categoryApi.getAll();
      if (response.data) {
        setCategories(response.data);
        setLoading(false);
      } else {
        toast.error("Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
    fetchFoodsTop();
    fetchFoods();
  }, [currentUser?._id, query]);

  const handleFilter = (category) => {
    setSelectCategory(category.name);
    if (category === "Tất cả") {
      setQuery({ all: true });
    } else {
      setQuery({ category: category._id });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    console.log("search", search);
    if (search) {
      setQuery({ searchTerm: search });
    } else {
      setQuery({ all: true });
    }
  };

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
              onChange={handleSearch}
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
              <button
                onClick={() => {
                  handleFilter("Tất cả");
                  setSelectCategory("Tất cả");
                }}
                className={`w-full p-4 text-slate-600 hover:bg-slate-200 duration-300 border rounded-md text-center ${
                  selectCategory === "Tất cả" ? "bg-slate-200" : ""
                }`}
              >
                Tất cả
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleFilter(category)}
                  className={`w-full p-4 text-slate-600 hover:bg-slate-200 duration-300 border rounded-md text-center ${
                    selectCategory === category.name ? "bg-slate-200" : ""
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Food Cards */}
          <div className="w-full lg:w-3/4 flex justify-center items-center ">
            <div className="w-full flex flex-col items-center justify-center md:grid lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-4">
              {products.map((product) => (
                <FoodCard
                  key={product._id}
                  product={product}
                  size={"small"}
                  cart
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
