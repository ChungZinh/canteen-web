import {
  Button,
  Dropdown,
  Pagination,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { buildQueryString } from "../../utils/buildQueryString";
import orderApi from "../../api/orderApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { formatCreatedAt } from "../../utils/formatDate";

export default function DashListOrders() {
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({ limit: 10, all: true });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const onPageChange = (pageN) => {
    if (pageN < 1 || pageN > totalPages) return;
    setCurrentPage(pageN);
    setQuery((prev) => ({ ...prev, page: pageN }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search) {
      setQuery({ searchTerm: search });
    } else {
      setQuery({ limit: 10, all: true });
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      const queryB = buildQueryString(query);
      const response = await orderApi.getAll(queryB, currentUser, accessToken);
      if (response.data) {
        setOrders(response.data.orders);
        setLoading(false);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser?._id, query, isUpdate]);

  const handleDetail = (order) => {
    navigate(`/dashboard?tab=detailOrders`, { state: { order } });
  };

  const handleDelete = async (order) => {
    try {
      const response = await orderApi.delete(
        order._id,
        currentUser,
        accessToken
      );
      if (response.message) {
        toast.success("Delete order successfully");
        setIsUpdate(!isUpdate);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-4 overflow-y-scroll">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold ">Danh sách đơn hàng</h1>
          <p className="text-slate-500">Quản lý đơn hàng của khách hàng</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-md shadow-md mt-4">
        <div className="flex py-2 px-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <TextInput
              placeholder="Search ID"
              onChange={handleSearch}
              className="mr-2"
            />
            <Select
              id="status"
              onChange={(e) => {
                setQuery((prev) => ({ ...prev, status: e.target.value }));
              }}
              className="mr-2"
            >
              <option value={""}>Tất cả</option>
              <option value="Đã đặt">Đã đặt</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Đang chuẩn bị">Đang chuẩn bị</option>
              <option value="Đã chuẩn bị">Đã chuẩn bị</option>
              <option value="Đã hoàn tất">Đã hoàn tất</option>
              <option value="Đã hủy">Đã hủy</option>
            </Select>
          </div>
          <Button className="flex items-center ">
            <BiExport size={20} />
            <span className="ml-2">Export</span>
          </Button>
        </div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Khách hàng</Table.HeadCell>
            <Table.HeadCell>Ngày đặt</Table.HeadCell>
            <Table.HeadCell>Tổng tiền</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>Phương thức thanh toán</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map((order) => (
              <Table.Row key={order._id}>
                <Table.Cell>{order.encodeOrderID || order._id}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <img
                      src={
                        order?.user?.avatar ||
                        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png"
                      }
                      alt="avatar"
                      className="h-10 w-10 rounded-full border"
                    />
                    <div className="ml-2 space-y-1">
                      <p className="font-semibold">
                        {order?.user?.fullName || "GUEST"}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {order?.user?.email}
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{formatCreatedAt(order.createdAt)}</Table.Cell>
                <Table.Cell>{order.amount.toLocaleString()} VND</Table.Cell>

                <Table.Cell>
                  <span
                    className={`${
                      order.status === "Đã đặt" ||
                      order.status === "Đã thanh toán" ||
                      order.status === "Đang chuẩn bị" ||
                      order.status === "Đã chuẩn bị" ||
                      order.status === "Đã hoàn tất"
                        ? "bg-lime-100 text-lime-600"
                        : "bg-red-100 text-red-600"
                    } p-1 rounded-md`}
                  >
                    {order.status}
                  </span>
                </Table.Cell>
                <Table.Cell>{order.payMethod}</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={<MdMoreVert size={20} className="text-slate-500" />}
                  >
                    <Dropdown.Item>
                      <div
                        onClick={() => handleDetail(order)}
                        className="flex items-center"
                      >
                        <LuEye size={20} />
                        <span className="ml-2">View</span>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div
                        onClick={() => handleDelete(order)}
                        className="flex items-center"
                      >
                        <IoIosRemoveCircleOutline size={20} />
                        <span className="ml-2">Delete</span>
                      </div>
                    </Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {/* PAGINATION */}
      </div>
      <div className=" p-2 flex justify-between">
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
    </div>
  );
}
