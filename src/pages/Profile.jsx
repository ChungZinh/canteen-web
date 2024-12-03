import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Card,
  Pagination,
  Table,
} from "flowbite-react";
import { TbCoin } from "react-icons/tb";
import { useSelector } from "react-redux";
import { formatCreatedAt } from "../utils/formatDate";
import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { buildQueryString } from "../utils/buildQueryString";
import { useNavigate } from "react-router-dom";
import { CgEditBlackPoint } from "react-icons/cg";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [ordersCompleted, setOrdersCompleted] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();
  const onPageChange = (pageN) => {
    if (pageN < 1 || pageN > totalPages) return;
    setCurrentPage(pageN);
    setQuery((prev) => ({ ...prev, page: pageN }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const queryB = buildQueryString(query);
      const response = await userApi.getUserById(
        currentUser._id,
        queryB,
        currentUser,
        accessToken
      );
      setUser(response.data.user);
      setTransaction(response.data.user?.wallet?.transactions);
      setOrders(response.data.ordersInProgress);
      setOrdersCompleted(response.data.ordersCompleted);
      setTotalPages(response.data.totalPages);
    };
    fetchUser();
  }, [currentUser, accessToken, page, query]);

console.log(user)

  return (
    <div className="overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto mt-[120px]  justify-center items-center  bg-opacity-70 backdrop-blur-sm">
        <Card className="h-[320px]  w-full">
          <div
            className="h-2/3 "
            style={{
              backgroundImage: `url("https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?t=st=1729518083~exp=1729521683~hmac=11b1b6d17cd6293835c9388053f266792eeb1e5a076a16e3a37a32668f13c693&w=1380")`,
              // backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="h-1/3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar
                  alt="User settings"
                  img={currentUser?.avatar}
                  className="border h-[100px] w-[100px]"
                />
                <div className="">
                  <h1 className="text-2xl font-bold">
                    {currentUser?.fullName}
                  </h1>
                  <p className="text-lg">
                    MSSV: {currentUser?.studentId || "Chưa cập nhật"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* POINT */}
                <div className="flex items-center gap-2 mr-4">
                  <CgEditBlackPoint className="h-6 w-6" />
                  <span className="text-lg font-bold">
                  Điểm: {user?.points || 0}
                  </span>
                </div>  
                <div className="flex items-center gap-4 bg-slate-200 p-2 rounded-md border">
                  <div className="flex items-center gap-2">
                    <TbCoin className="h-6 w-6" />
                    <span className="text-lg font-bold">
                      {user?.wallet?.balance.toLocaleString()}đ
                    </span>
                  </div>
                  <Button
                    className="bg-slate-600"
                    onClick={() => navigate("/deposit")}
                  >
                    Nạp Tiền
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex xl:flex-row lg:flex-row flex-col gap-8">
          <Card className="lg:w-1/3 xl:w-1/3 w-full">
            <h1 className="text-2xl font-bold border-b pb-4">
              Thông tin cá nhân
            </h1>
            <div className="">
              <div className="space-y-2">
                <div className="">
                  <h2 className="text-lg font-semibold">Họ và tên:</h2>
                  <p>{currentUser?.fullName}</p>
                </div>
                <div className="">
                  <h2 className="text-lg font-semibold">Email:</h2>
                  <p>{currentUser?.email}</p>
                </div>
                <div className="">
                  <h2 className="text-lg font-semibold">Số điện thoại:</h2>
                  <p>{currentUser?.phone}</p>
                </div>
                <div className="border-t pt-4">
                  <Button className="bg-slate-600 w-full border-t">
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="lg:w-2/3 xl:w-2/3 w-full">
            <h1 className="text-2xl font-bold border-b pb-4">
              Lịch sử giao dịch
            </h1>
            {transaction?.length === 0 || transaction === null ? (
              <div className="flex justify-center items-center h-[200px]">
                <p>Không có dữ liệu</p>
              </div>
            ) : (
              <div className="">
                <Table striped>
                  <Table.Head>
                    <Table.HeadCell>STT</Table.HeadCell>
                    <Table.HeadCell>Số tiền</Table.HeadCell>
                    <Table.HeadCell>Phương thức thanh toán</Table.HeadCell>
                    <Table.HeadCell>Trạng thái</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {transaction?.map((item, index) => (
                      <Table.Row key={item._id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>
                          {item.amount > 0 ? (
                            <Badge color="success">
                              {item.amount.toLocaleString()}đ
                            </Badge>
                          ) : (
                            <Badge color="failure">
                              {item?.amount?.toLocaleString()}đ
                            </Badge>
                          )}
                        </Table.Cell>
                        <Table.Cell>{item.payMethod}</Table.Cell>
                        <Table.Cell>{item.transactionStatus}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-8 mb-8 overflow-x-auto">
          {orders?.length === 0 ? (
            <Card className="w-full">
              <h1 className="text-2xl font-bold border-b pb-4">
                Đơn hàng đang xử lý
              </h1>
              <div className="flex justify-center items-center h-[200px]">
                <p>Không có dữ liệu</p>
              </div>
            </Card>
          ) : (
            <Card className="w-full">
              <h1 className="text-2xl font-bold border-b pb-4">
                Đơn hàng đang xử lý
              </h1>
              <div className="">
                <div className="">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>STT</Table.HeadCell>
                      <Table.HeadCell>Ngày</Table.HeadCell>
                      <Table.HeadCell style={{ width: "20%" }}>
                        Trạng thái
                      </Table.HeadCell>
                      <Table.HeadCell>Chi tiết đơn hàng</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {orders?.map((order, index) => (
                        <Table.Row key={order._id}>
                          <Table.Cell>{index + 1}</Table.Cell>
                          <Table.Cell>
                            {formatCreatedAt(order.createdAt)}
                          </Table.Cell>
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
                              {order?.status}
                            </span>
                          </Table.Cell>

                          <Table.Cell colSpan={3} style={{ width: "80%" }}>
                            <Accordion style={{ width: "100%" }}>
                              <Accordion.Panel>
                                <Accordion.Title>
                                  Chi tiết đơn hàng
                                </Accordion.Title>
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
                                              <p className="text-slate-600">
                                                {food.quantity}
                                              </p>
                                            </div>
                                          </div>
                                          <h1>
                                            <p className="font-semibold">
                                              {food.name}
                                            </p>
                                          </h1>
                                        </div>

                                        <div className="">
                                          <p>
                                            {(
                                              food.quantity * food.price
                                            ).toLocaleString()}
                                            ₫
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </Accordion.Content>
                              </Accordion.Panel>
                            </Accordion>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
                <div className="mt-8 ">
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                    />
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="mt-8 mb-8 overflow-x-auto">
          {ordersCompleted?.length === 0 ? (
            <Card className="w-full">
              <h1 className="text-2xl font-bold border-b pb-4">
                Lịch sử mua hàng
              </h1>
              <div className="flex justify-center items-center h-[200px]">
                <p>Không có dữ liệu</p>
              </div>
            </Card>
          ) : (
            <Card className="w-full">
              <h1 className="text-2xl font-bold border-b pb-4">
                Lịch sử mua hàng
              </h1>
              <div className="">
                <div className="">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>STT</Table.HeadCell>
                      <Table.HeadCell>Ngày</Table.HeadCell>
                      <Table.HeadCell style={{ width: "20%" }}>
                        Trạng thái
                      </Table.HeadCell>
                      <Table.HeadCell>Chi tiết đơn hàng</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {ordersCompleted?.map((order, index) => (
                        <Table.Row key={order._id}>
                          <Table.Cell>{index + 1}</Table.Cell>
                          <Table.Cell>
                            {formatCreatedAt(order.createdAt)}
                          </Table.Cell>
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
                              {order?.status}
                            </span>
                          </Table.Cell>

                          <Table.Cell colSpan={3} style={{ width: "80%" }}>
                            <Accordion style={{ width: "100%" }}>
                              <Accordion.Panel>
                                <Accordion.Title>
                                  Chi tiết đơn hàng
                                </Accordion.Title>
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
                                              <p className="text-slate-600">
                                                {food.quantity}
                                              </p>
                                            </div>
                                          </div>
                                          <h1>
                                            <p className="font-semibold">
                                              {food.name}
                                            </p>
                                          </h1>
                                        </div>

                                        <div className="">
                                          <p>
                                            {(
                                              food.quantity * food.price
                                            ).toLocaleString()}
                                            ₫
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </Accordion.Content>
                              </Accordion.Panel>
                            </Accordion>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
                <div className="mt-8 ">
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                    />
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
