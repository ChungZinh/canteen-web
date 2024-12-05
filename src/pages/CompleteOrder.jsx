// src/pages/CompleteOrder.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderApi from "../api/orderApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { formatCreatedAt } from "../utils/formatDate";

const CompleteOrder = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  //order is  object
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      const response = await orderApi.getById(id, currentUser, accessToken);
      if (response.data) {
        setOrder(response.data);
        setLoading(false);
      } else {
        toast.error("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser?._id, id]);

  const handleCompleteOrder = async (id) => {
    const response = await orderApi.completedOrder(id, {
      status: "Đã hoàn tất",
    });
    if (response.data) {
      toast.success(response.message);
      navigate("/dashboard?tab=listOrders");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="w-screen  my-[100px] flex justify-center items-center bg-opacity-70 backdrop-blur-sm">
        <div className="">
          <h1 className="text-4xl text-center font-bold text-gray-800">
            Đơn hàng cần xác nhận
          </h1>
          <div className="mt-6">
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold text-gray-800">
                  Đơn hàng của bạn đã chuẩn bị xong
                </h1>
                <p className="text-xl text-gray-800">
                  Mã đơn hàng: {order?._id}
                </p>
                <p className="text-xl text-gray-800">
                  Ngày đặt hàng: {formatCreatedAt(order.createdAt)}{" "}
                </p>
                <p className="text-xl text-gray-800">
                  Tổng tiền: {order?.amount}₫
                </p>
                <p className="text-xl text-gray-800">
                  Trạng thái: {order?.status}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p>Chi tiết đơn hàng</p>
            <div className="mt-4">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>STT</Table.HeadCell>
                  <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
                  <Table.HeadCell>Số lượng</Table.HeadCell>
                  <Table.HeadCell>Giá</Table.HeadCell>
                  <Table.HeadCell>Thành tiền</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {order?.foods?.map((product, index) => (
                    <Table.Row key={product._id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-center rounded-full"
                          />
                          <p className="font-semibold">{product.name}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>{product.quantity}</Table.Cell>
                      <Table.Cell>
                        {product?.price.toLocaleString()}₫
                      </Table.Cell>
                      <Table.Cell>
                        {(product.price * product.quantity).toLocaleString()}₫
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            <div className="">
              <Button
                onClick={() => handleCompleteOrder(order._id)}
                className="w-full mt-4"
              >
                Hoàn tất đơn hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
