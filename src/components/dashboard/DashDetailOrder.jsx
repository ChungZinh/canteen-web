import { Table, Timeline } from "flowbite-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { formatCreatedAt } from "../../utils/formatDate";

export default function DashDetailOrder() {
  const location = useLocation();
  const { order } = location.state || {};
  const orderTotal = order?.foods.reduce((acc, cur) => acc + cur.total, 0);
  const [orderDiscount, setOrderDiscount] = React.useState(
    orderTotal - order?.amount || 0
  );

  const orderDetail = {
    id: 1,
    orderId: "123456",
    date: "2021-09-20",
    customer: {
      id: 1,
      name: "John Doe",
      phone: "1234567890",
      email: "johndae@gmail.com",
      avatar:
        "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/8.png",
      address: "123 Main St, New York, NY 10001",
    },
    status: "Pending",
    method: "Cash",
    products: [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 2,
        total: 200,
        image:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/products/headphone-1.jpg",
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 1,
        total: 200,
        image:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/products/headphone-2.jpg",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      phone: "1234567890",
      address: "123 Main St, New York, NY 10001",
    },
    timeLine: [
      {
        id: 1,
        title: "Order Placed",
        date: "2021-09-20",
        time: "10:00 AM",
      },
      {
        id: 2,
        title: "Order Confirmed",
        date: "2021-09-20",
        time: "10:30 AM",
      },
      {
        id: 3,
        title: "Order Shipped",
        date: "2021-09-20",
        time: "11:00 AM",
      },
      {
        id: 4,
        title: "Order Delivered",
        date: "2021-09-21",
        time: "10:00 AM",
      },
    ],
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      {/*HEADER*/}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold ">Order #{order?._id}</h1>
            <div className="">
              <span
                className={`${
                  order?.status === "Đã đặt" ||
                  order?.status === "Đã thanh toán"
                    ? "bg-lime-100 text-lime-600"
                    : "bg-red-100 text-red-600"
                } p-1 rounded-md`}
              >
                {order?.status}
              </span>
            </div>
          </div>
          <p className="text-slate-500">{formatCreatedAt(order?.createdAt)}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="">
        <div className="flex gap-4">
          <div className="w-3/4">
            {/* ORDER DETAIL */}
            <div className=" bg-white shadow-md rounded-md p-4 h-fit">
              <h1 className="font-semibold">Order details</h1>
              <div className="">
                <Table striped>
                  <Table.Head>
                    <Table.HeadCell>Product</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                    <Table.HeadCell>Total</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {order?.foods.map((product) => (
                      <Table.Row key={product._id}>
                        <Table.Cell>
                          <div className="flex items-center gap-4">
                            <img
                              src={product.image}
                              alt="product"
                              className="h-12 w-12 rounded-md"
                            />
                            <p>{product.name}</p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          {product.price.toLocaleString()}đ
                        </Table.Cell>
                        <Table.Cell>{product.quantity}</Table.Cell>
                        <Table.Cell>
                          {product.total.toLocaleString()}đ
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <div className="flex justify-end">
                  <div className=" mt-4 w-1/4">
                    {/* SUBTOTAL */}
                    <div className="flex justify-between">
                      <p>Tổng phụ</p>
                      <p>
                        {order?.foods
                          .reduce((acc, cur) => acc + cur.total, 0)
                          .toLocaleString()}
                        đ
                      </p>
                    </div>
                    {/* DISCOUNT */}
                    <div className="flex justify-between">
                      <p>Giảm giá</p>
                      <p>{orderDiscount.toLocaleString()}đ</p>
                    </div>
                    {/* TOTAL */}
                    <div className="flex justify-between">
                      <p>Total</p>
                      <p>{order?.amount.toLocaleString()}đ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-white shadow-md rounded-md p-4 h-fit mt-4">
              <h1 className="font-semibold">Order timeline</h1>
              <div className="space-y-4 mt-4">
                <Timeline>
                  {orderDetail.timeLine.map((time) => (
                    <Timeline.Item
                      key={time.id}
                      className="flex items-center gap-4"
                    >
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>
                          {time.date} at {time.time}
                        </Timeline.Time>
                        <Timeline.Body>{time.title}</Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </div>
          </div>
          <div className="w-1/4 ">
            {/* CUSTOMER DETAIL */}
            <div className="bg-white shadow-md rounded-md p-4 h-fit space-y-4">
              <h1 className="font-semibold">Chi tiết khách hàng</h1>
              <div className="flex items-center gap-4">
                <img
                  src={order?.user.avatar}
                  alt="avatar"
                  className="h-14 w-14 rounded-full"
                />
                <div className="">
                  <p className="font-semibold">{order?.user.name}</p>
                  <p className="text-xs">Customer ID: #{order?.user._id}</p>
                </div>
              </div>
              <div className="*:text-sm space-y-2 mt-4">
                <p className="font-semibold">Thông tin liên hệ</p>
                <p>Email: {order?.user.email}</p>
                <p>Phone: {order?.user.phone}</p>
              </div>
            </div>

            {/* SHIPPING ADDRESS */}
            {/* <div className="bg-white shadow-md rounded-md p-4 h-fit mt-4">
              <h1 className="font-semibold">Shipping address</h1>
              <div className="space-y-2 mt-4">
                <p className="font-semibold">
                  {orderDetail.shippingAddress.name}
                </p>
                <p>{orderDetail.shippingAddress.address}</p>
                <p>{orderDetail.shippingAddress.phone}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
