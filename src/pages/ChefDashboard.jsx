import {
  Accordion,
  Avatar,
  Button,
  Card,
  Dropdown,
  Modal,
  Tabs,
  TextInput,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../api/authApi";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import orderApi from "../api/orderApi";
import { formatCreatedAt, timeAgo } from "../utils/formatDate";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ChefDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const [selectStatus, setSelectStatus] = useState("Đang chuẩn bị");
  const status = [ "Đã thanh toán", "Đang chuẩn bị"];
  const handleSignOut = async () => {
    // authApi.signOut();
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    const response = await authApi.signOut(
      { refreshToken },
      accessToken,
      currentUser
    );
    console.log(response);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(signOutSuccess());
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await orderApi.getOrderForChef(
        ``,
        currentUser,
        accessToken
      );

      if (response.data) {
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      }
    };
    fetchOrders();
  }, [currentUser, accessToken, isUpdate]);

  const handleUpdateStatus = async (id, status) => {
    const response = await orderApi.chefUpdateStatus(
      id,
      { status },
      currentUser,
      accessToken
    );
    if (response.data) {
      setIsUpdate(!isUpdate);
    }
  };

  return (
    <div className="bg-slate-200 h-screen p-4">
      {/* HEADER */}
      <Card>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chi tiết đơn đặt món ăn</h1>
          <div className="flex justify-center items-center">
            {/* User Avatar Dropdown */}
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={currentUser?.avatar}
                  rounded
                  className="border rounded-full"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser?.fullName}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser?.email}
                </span>
              </Dropdown.Header>
              {currentUser?.role?.name === "admin" && (
                <Dropdown.Item href="/">Trang chủ</Dropdown.Item>
              )}
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Đăng xuất</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </Card>

      {/* MAIN */}
      <Card className="mt-4 ">
        <Tabs
          aria-label="Pills"
          className="w-full"
          variant="pills"
          onActiveTabChange={(tab) => setSelectStatus(tab)}
        > 
          <Tabs.Item
            key={status[0]}
            active={selectStatus === status[0]}
            title={status[0]}
          >
            <div className="overflow-y-scroll h-[710px] mt-4">
              {orders
                .filter((order) => order.status === "Đã thanh toán")
                .map((order) => (
                  <CardOrder
                    key={order._id}
                    order={order}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    setOpenModal={setOpenModal}
                    setIdOrder={setIdOrder}
                  />
                ))}
            </div>
          </Tabs.Item>
          <Tabs.Item
            key={status[1]}
            active={selectStatus === status[1]}
            title={status[1]}
          >
            <div className="overflow-y-scroll h-[710px] mt-4">
              {orders
                .filter((order) => order.status === "Đang chuẩn bị")
                .map((order) => (
                  <CardOrder
                    key={order._id}
                    order={order}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    setOpenModal={setOpenModal}
                    setIdOrder={setIdOrder}
                  />
                ))}
            </div>
          </Tabs.Item>
        </Tabs>
      </Card>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <TextInput
              placeholder="Lý do hủy"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"></h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  handleUpdateStatus(idOrder, "Đã hủy");
                  setOpenModal(false);
                }}
              >
                Vâng, hủy
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Không, quay lại
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
const CardOrder = ({
  order,
  isUpdate,
  setIsUpdate,
  setOpenModal,
  setIdOrder,
}) => {
  const accessToken = localStorage.getItem("accessToken");
  const { currentUser } = useSelector((state) => state.user);
  const handleUpdateStatus = async (id, status) => {
    const response = await orderApi.chefUpdateStatus(
      id,
      { status },
      currentUser,
      accessToken
    );
    if (response.data) {
      setIsUpdate(!isUpdate);
    }
  };
  return (
    <Card className="mb-4">
      <div className="flex items-center gap-4">
        <div className="w-[280px]">
          <div className="flex items-center gap-2">
            <Avatar
              img={order.user.avatar}
              rounded
              className="border rounded-full w-fit"
            />
            <div className="">
              <p className="font-semibold">{order.user.fullName}</p>
              {/* <p className="text-sm text-neutral-400">{order.user.email}</p> */}
              <p className="text-sm text-neutral-400">{order.user.phone}</p>
            </div>
          </div>
        </div>
        <div className="w-full border-x px-4 ">
          <div className="flex  justify-between items-center">
            <p className="font-semibold">Đơn hàng: {order._id}</p>
            <p className="text-neutral-400">{timeAgo(order.createdAt)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-400">
              {order.foods.length} sản phẩm
            </p>
            <p className="text-sm text-neutral-400">
              {order.amount.toLocaleString()} đ
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span> Trạng thái:</span>
              <span className="text-sm text-neutral-600 bg-lime-200  px-2 py-1 rounded-full">
                {order.status}
              </span>
            </div>
            <p className="text-sm text-neutral-600 bg-blue-400  px-2 py-1 rounded-full">
              {order.payMethod}
            </p>
          </div>

          <div className="mt-4">
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title>Chi tiết đơn hàng</Accordion.Title>
                <Accordion.Content>
                  {order.foods.map((food) => (
                    <div className="" key={food._id}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-16 border p-2 rounded-md relative object-contain">
                            <img
                              src={food.image}
                              className=" object-contain h-full w-full"
                            />
                            <div className="h-[20px] w-[20px] -top-2 -right-3 flex justify-center items-center font-semibold bg-slate-200 absolute rounded-full text-sm ">
                              <p className="text-slate-600">{food.quantity}</p>
                            </div>
                          </div>
                          <h1>
                            <p className="font-semibold">{food.name}</p>
                          </h1>
                        </div>

                        <div className="">
                          <p>
                            {/* TOTAL */}
                            {(food.quantity * food.price).toLocaleString()}₫
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
        <div className="border-r w-[250px] ">
          {/* HANDLE UPDATE STATUS */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                if (order.status === "Đã thanh toán") {
                  handleUpdateStatus(order._id, "Đang chuẩn bị");
                } else if (order.status === "Đang chuẩn bị") {
                  handleUpdateStatus(order._id, "Đã chuẩn bị");
                }
              }}
              className={`${
                order.status === "Đã thanh toán" ||
                order.status === "Đang chuẩn bị"
                  ? "bg-lime-200 text-lime-600"
                  : "bg-gray-200 text-gray-600 cursor-not-allowed"
              } px-4 py-2 rounded-md`}
              disabled={
                order.status !== "Đã thanh toán" &&
                order.status !== "Đang chuẩn bị"
              }
            >
              {order.status === "Đã thanh toán"
                ? "Đang chuẩn bị"
                : order.status === "Đang chuẩn bị"
                ? "Đã chuẩn bị"
                : order.status}
            </button>

            {(order.status === "Đã thanh toán" ||
              order.status === "Đang chuẩn bị") && (
              <button
                onClick={() => {
                  setIdOrder(order._id);
                  setOpenModal(true);
                }}
                className="bg-red-200 text-red-600 px-4 py-2 rounded-md"
              >
                Hủy
              </button>
            )}
            {/* <button className="bg-lime-200 text-lime-600 px-4 py-2 rounded-md">
            Đang chuẩn bị 
            </button>
            <button className="bg-red-200 text-red-600 px-4 py-2 rounded-md">
              Hủy
            </button><button className="bg-red-200 text-red-600 px-4 py-2 rounded-md">
              Hủy
            </button> */}
          </div>
        </div>
      </div>
    </Card>
  );
};
