import { Button, Card, Checkbox, Modal, Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { buildQueryString } from "../../utils/buildQueryString";
import foodApi from "../../api/foodApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import menuApi from "../../api/menuApi";

export default function DashCalendarFood() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState({ all: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const [foodsForDay, setFoodsForDay] = useState([]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const daysOfWeek_VI = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ Nhật",
  ];

  useEffect(() => {
    setLoading(true);
    const fetchFoods = async () => {
      const queryB = buildQueryString(query);
      const response = await foodApi.getAllFoods(queryB);
      if (response.data) {
        setProducts(response.data.foods); 
        setLoading(false);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error("Failed to fetch foods");
        setLoading(false);
      }
    };
    fetchFoods();

    const fetchMenuForDay = async () => {
      const response = await menuApi.getMenuForDay(daysOfWeek[selectedDay], "");
      if (response.data.foods) {
        setFoodsForDay(response.data.foods);
        setSelectedFoods(response.data.foods.map((food) => food._id));
      }
    };
    fetchMenuForDay();
  }, [currentUser?._id, isUpdate, query, selectedDay]);

  // Xử lý khi nhấn nút "Lưu" sau khi chọn món ăn
  const handleSaveMenu = async () => {
    try {
      // Gửi yêu cầu để cập nhật menu cho ngày đã chọn
      const response = await menuApi.addMenuForDay(
        {
          day: daysOfWeek[selectedDay],
          foodIds: selectedFoods,
        },
        currentUser,
        accessToken
      );
      if (response.data) {
        toast.success(response.message);
        setIsUpdate(!isUpdate);
        setOpenModal(false);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lưu menu!");
      console.log(error);
    }
  };

  const handleCheckAll = () => {
    const allFoodIds = products.map((food) => food._id);
    setSelectedFoods(allFoodIds);
  };

  // Uncheck all checkboxes
  const handleUncheckAll = () => {
    setSelectedFoods([]);
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-hidden">
      <Card className="w-full">
        <Tabs
          aria-label="Pills"
          className="w-full"
          variant="pills"
          onActiveTabChange={(tab) => setSelectedDay(tab)}
        >
          {daysOfWeek_VI.map((day) => (
            <Tabs.Item
              className=" h-fit overflow-y-auto"
              key={day}
              active={selectedDay === day}
              title={day}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Danh sách món ăn</h1>
                <Button onClick={() => setOpenModal(true)}>
                  Cập nhật menu
                </Button>
              </div>
              <div className="overflow-y-scroll h-[760px] mt-4">
                {foodsForDay.map((food) => (
                  <CardForMenu
                    key={food._id}
                    food={food}
                    isSelected={selectedFoods.includes(food._id)}
                    onSelect={(id) => {
                      if (selectedFoods.includes(id)) {
                        setSelectedFoods(
                          selectedFoods.filter((item) => item !== id)
                        );
                      } else {
                        setSelectedFoods([...selectedFoods, id]);
                      }
                    }}
                  />
                ))}
              </div>
            </Tabs.Item>
            
          ))}
        </Tabs>
      </Card>

      {/* Modal Thêm món ăn */}
      <Modal size={"4xl"} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thêm món ăn</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            {products.map((food) => (
              <CardFood
                key={food._id}
                food={food}
                isSelected={selectedFoods.includes(food._id)}
                onSelect={(id) => {
                  if (selectedFoods.includes(id)) {
                    setSelectedFoods(
                      selectedFoods.filter((item) => item !== id)
                    );
                  } else {
                    setSelectedFoods([...selectedFoods, id]);
                  }
                }}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Buttons to check/uncheck all checkboxes */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Button color="gray" onClick={handleCheckAll}>
                Chọn tất cả
              </Button>
              <Button color="gray" onClick={handleUncheckAll}>
                Bỏ chọn tất cả
              </Button>
            </div>

            {/* Save and cancel buttons */}
            <div className="flex items-center gap-2">
              <Button onClick={handleSaveMenu}>Lưu</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const CardFood = ({ food, isSelected, onSelect }) => {
  return (
    <div className="border-b pb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-20 h-20 border p-2 rounded-md object-contain">
          <img src={food.image} className="object-contain h-full w-full" />
        </div>
        <div className="space-y-2">
          <p className="font-semibold">{food.name}</p>
          <p className="text-sm ">{food.price.toLocaleString()}₫</p>
        </div>
      </div>

      <div className="">
        <Checkbox checked={isSelected} onChange={() => onSelect(food._id)} />
      </div>
    </div>
  );
};

const CardForMenu = ({ food, isSelected, onSelect }) => {
  return (
    <div className="border-b pb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-20 h-20 border p-2 rounded-md object-contain">
          <img src={food.image} className="object-contain h-full w-full" />
        </div>
        <div className="space-y-2">
          <p className="font-semibold">{food.name}</p>
          <p className="text-sm ">{food.price.toLocaleString()}₫</p>
        </div>
      </div>

      <div className="mr-8">
        <Checkbox checked={isSelected} onChange={() => onSelect(food._id)} />
      </div>
    </div>
  );
};
