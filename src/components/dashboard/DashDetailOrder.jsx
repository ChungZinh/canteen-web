import { Table, Timeline } from "flowbite-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { formatCreatedAt, formatTimeLine } from "../../utils/formatDate";

export default function DashDetailOrder() {
  const location = useLocation();
  const { order } = location.state || {};
  const orderTotal = order?.foods.reduce((acc, cur) => acc + cur.total, 0);
  const [orderDiscount, setOrderDiscount] = React.useState(
    orderTotal - order?.amount || 0
  );


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
                            <p className="font-semibold">{product.name}</p>
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
                  {order?.timeline.map((time) => (
                    <Timeline.Item
                      key={time._id}
                      className="flex items-center gap-4"
                    >
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>
                          {formatTimeLine(time?.timestamp)}
                        </Timeline.Time>
                        <Timeline.Body>{time?.status}</Timeline.Body>
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
                  src={order?.user?.avatar}
                  alt="avatar"
                  className="h-14 w-14 rounded-full"
                />
                <div className="">
                  <p className="font-semibold">{order?.user?.name}</p>
                  <p className="text-xs">Customer ID: #{order?.user?._id}</p>
                </div>
              </div>
              <div className="*:text-sm space-y-2 mt-4">
                <p className="font-semibold">Thông tin liên hệ</p>
                <p>Email: {order?.user?.email}</p>
                <p>Phone: {order?.user?.phone}</p>
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
