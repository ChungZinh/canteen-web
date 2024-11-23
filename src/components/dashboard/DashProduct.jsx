import { Button, Dropdown, Pagination, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCalendar, HiPlus } from "react-icons/hi";
import foodApi from "../../api/foodApi";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { buildQueryString } from "../../utils/buildQueryString";
import {
  MdCancel,
  MdCheckCircle,
  MdModeEdit,
  MdMoreVert,
} from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";

export default function DashProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (pageN) => {
    if (pageN < 1 || pageN > totalPages) return;
    setCurrentPage(pageN);
    setQuery((prev) => ({ ...prev, page: pageN }));
  };

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
        setTotalPages(response.data.totalPages);
      } else {
        toast.error("Failed to fetch foods");
        setLoading(false);
      }
    };
    fetchFoods();
  }, [currentUser?._id, isUpdate, query]);

  const handleSetSoldOut = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await foodApi.soldOut(id, currentUser, accessToken);
    if (response.data) {
      toast.success("Product is sold out");
      setIsUpdate(!isUpdate);
    } else {
      toast.error("Failed to sold out");
    }
  };

  const handleAvailable = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await foodApi.available(id, currentUser, accessToken);
    if (response.data) {
      toast.success("Product is available");
      setIsUpdate(!isUpdate);
    } else {
      toast.error("Failed to available");
    }
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-3xl font-semibold ">Danh sách món ăn</h1>
          <p className="text-slate-500">Danh sách món ăn hiện có</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button className="mt-4 bg-slate-600">
            <Link to={`/dashboard?tab=calendar`} className="flex">
              <HiCalendar size={20} />
              <span className="ml-2">Lịch theo ngày</span>
            </Link>
          </Button>
          <Button className="mt-4 bg-slate-600">
            <Link to={`/dashboard?tab=addProducts`} className="flex">
              <HiPlus size={20} />
              <span className="ml-2">Thêm món ăn</span>
            </Link>
          </Button>

          <Button className="mt-4 bg-slate-600">
            <Link to={`/dashboard?tab=addCategory`} className="flex">
              <HiPlus size={20} />
              <span className="ml-2">Thêm loại món ăn</span>
            </Link>
          </Button>
        </div>
      </div>
      <>
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spinner className="text-primary" size="xl" />
          </div>
        ) : (
          <div className="mt-8">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Tên món ăn</Table.HeadCell>
                <Table.HeadCell>Hình ảnh</Table.HeadCell>
                <Table.HeadCell>Loại món ăn</Table.HeadCell>
                <Table.HeadCell>Giá</Table.HeadCell>
                <Table.HeadCell>Số lượng</Table.HeadCell>
                <Table.HeadCell>isSoldOut</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {products.map((product) => (
                  <Table.Row key={product._id}>
                    <Table.Cell className="font-semibold">
                      {product.name}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </Table.Cell>
                    <Table.Cell>{product.category.name}</Table.Cell>
                    <Table.Cell>{product.price}</Table.Cell>
                    <Table.Cell>{product.stock}</Table.Cell>
                    <Table.Cell>
                      <span
                        className={`${
                          product.isSoldOut
                            ? "bg-red-100 text-red-600"
                            : "bg-lime-100 text-lime-600"
                        } p-1 rounded-md`}
                      >
                        {product.isSoldOut ? "Đã hết" : "Còn"}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                          <MdMoreVert size={20} className="text-slate-500" />
                        }
                      >
                        <Dropdown.Item>
                          <div
                            onClick={() => {
                              navigate(`/dashboard?tab=addProducts`, {
                                state: { product },
                              });
                            }}
                            className="flex items-center"
                          >
                            <MdModeEdit size={20} />
                            <span className="ml-2">Chỉnh sửa</span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div
                            onClick={
                              product.isSoldOut
                                ? () => handleAvailable(product._id)
                                : () => handleSetSoldOut(product._id)
                            }
                            className="flex items-center"
                          >
                            {product.isSoldOut ? (
                              <MdCheckCircle size={20} />
                            ) : (
                              <MdCancel size={20} />
                            )}
                            <span className="ml-2">
                              {product.isSoldOut ? "Còn" : "Hết"}
                            </span>
                          </div>
                        </Dropdown.Item>
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="">
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </div>
        )}
      </>
      {/* ToastContainer để hiển thị thông báo */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
