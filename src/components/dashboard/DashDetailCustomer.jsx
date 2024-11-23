import { Button, Dropdown, Table, TextInput } from "flowbite-react";
import { HiMinus } from "react-icons/hi2";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { LuCircleDollarSign, LuCrown, LuEye, LuGift } from "react-icons/lu";
import { MdMoreVert, MdOutlineShoppingCart } from "react-icons/md";
import { TbJewishStar } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import {
  formatCreatedAt,
  formatCreatedAt_v1,
  formatDate_v1,
} from "../../utils/formatDate";

export default function DashDetailCustomer() {
  const location = useLocation();
  const { student } = location.state || {};

  console.log("customer", student);

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold ">
            Customer ID #{student?._id}
          </h1>
          <p className="text-slate-500">{formatDate_v1(new Date())}</p>
        </div>
        {/* <Button className="mt-4 bg-red-500">
          <Link to={`/dashboard?tab=addProducts`} className="flex">
            <HiMinus size={20} />
            <span className="ml-2">Delete Customer</span>
          </Link>
        </Button> */}
      </div>

      <div className="mt-8 flex gap-8">
        {/* PROFILE */}
        <div className="w-1/3 bg-white h-fit p-6 rounded-md shadow-md">
          <div className="flex flex-col items-center gap-4 mt-12">
            <img
              src={student?.avatar}
              alt={student?.fullName}
              className="w-20 h-20 object-center rounded-md"
            />
            <div className="">
              <h1 className="text-2xl text-center font-semibold">
                {student?.fullName}
              </h1>
              <p className="text-slate-500 text-center">
                Student/Teacher ID: {student?.studentId}
              </p>
            </div>
            <div className="flex gap-12 mt-6">
              {/* COUNT ORDERS */}
              <div className="">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-200 rounded-md w-[40px] h-[40px] flex justify-center items-center">
                    <MdOutlineShoppingCart size={25} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-slate-500 font-semibold">Đơn hàng</p>
                    <p className="">{student?.orders.length}</p>
                  </div>
                </div>
              </div>
              {/* POINT */}
              <div className="">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-200 rounded-md w-[40px] h-[40px] flex justify-center items-center">
                    <LuCircleDollarSign size={25} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-slate-500 font-semibold">Điểm</p>
                    <p className="">{student?.points}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* DETAIL */}
          <div className="mt-6">
            <div className="border-b py-2">
              <h1 className="text-lg font-semibold">Chi tiết</h1>
            </div>
            <div className="mt-2 *:text-sm space-y-1">
              <div className="">
                <span className="font-semibold mr-2">Phone:</span>
                <span>{student?.phone}</span>
              </div>
              <div className="">
                <span className="font-semibold mr-2">Email:</span>
                <span>{student?.email}</span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="">
            <Button className="mt-4 w-full bg-slate-600">Chỉnh sửa</Button>
          </div>
        </div>

        {/* ORDERS */}
        <div className="w-2/3 flex flex-col">
          <div className="flex gap-8">
            <div className="w-1/2 space-y-8">
              {/* BALANCE */}
              <div className="flex h-[180px] flex-col rounded-md shadow-md bg-white p-4 gap-4">
                <div className="bg-slate-200 rounded-md w-[40px] h-[40px] flex justify-center items-center">
                  <LuCircleDollarSign size={25} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-slate-500 font-semibold">
                    Tài khoản thanh toán
                  </p>
                  <p className="">${student?.wallet?.balance} còn lại</p>
                  <p>Số dư tài khoản cho lần mua hàng tiếp theo</p>
                </div>
              </div>

              {/* WISHLIST */}
              <div className="flex h-[180px] flex-col rounded-md shadow-md bg-white p-4 gap-4">
                <div className="bg-slate-200 rounded-md w-[40px] h-[40px] flex justify-center items-center">
                  <TbJewishStar size={25} />
                </div>
                <div className="flex flex-col  gap-2">
                  <p className="text-slate-500 font-semibold">Wishlist</p>
                  <p className="">
                    <span className="font-semibold">
                      {student?.wishlist?.length}
                    </span>
                    món ăn yêu thích
                  </p>
                  <p>Nhận thông báo khi giảm giá</p>
                </div>
              </div>
            </div>
            <div className="w-1/2  space-y-8">
              {/* program */}
              <div className="flex h-[180px] flex-col rounded-md shadow-md bg-white p-4 gap-4">
                <div className="bg-slate-200 rounded-md w-[40px] h-[40px] flex justify-center items-center">
                  <LuGift size={25} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-slate-500 font-semibold">
                    Chương trình khách hàng thân thiết
                  </p>
                  <p className=" w-fit  p-1  rounded-md text-lime-600 font-semibold text-sm bg-lime-50 border border-lime-600">
                    {student?.tier}
                  </p>
                  <p>100 điểm để lên hạng</p>
                </div>
              </div>

              {/* coupons */}
              <div className="flex h-[180px] flex-col rounded-md shadow-md bg-white p-4  gap-4">
                <div className="bg-slate-200 rounded-md w-[40px] h-[40px] flex justify-center items-center">
                  <LuCrown size={25} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-slate-500 font-semibold">Coupons</p>
                  <p className="">
                    <span className="font-semibold">
                      {student?.coupons?.length}
                    </span>
                    Phiếu giảm giá bạn giành được
                  </p>
                  <p>Sử dụng phiếu giảm giá cho lần mua hàng tiếp theo</p>
                </div>
              </div>
            </div>
          </div>

          {/* ORDERS PLACED */}
          <div className="w-full mt-8 p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <h1>Đơn hàng đã đặt</h1>
              <TextInput placeholder="Search Order" />
            </div>

            {/* TABLE */}
            <div className="mt-8">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Order ID</Table.HeadCell>
                  <Table.HeadCell>Ngày đặt</Table.HeadCell>
                  <Table.HeadCell>Tổng tiền</Table.HeadCell>
                  <Table.HeadCell>Trạng thái</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {student?.orders?.map((order) => (
                    <Table.Row key={order._id}>
                      <Table.Cell>{order._id}</Table.Cell>
                      <Table.Cell>
                        {formatCreatedAt(order.createdAt)}
                      </Table.Cell>
                      <Table.Cell>{order.amount.toLocaleString()}đ</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`${
                            order.status === "Delivered"
                              ? "bg-red-100 text-red-600"
                              : "bg-lime-100 text-lime-600"
                          } p-1 rounded-md`}
                        >
                          {order.status}
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
                            <Link to={`/dashboard?tab=editOrder`}>
                              <div className="flex items-center">
                                <LuEye size={20} />
                                <span className="ml-2">View</span>
                              </div>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <div className="flex items-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
