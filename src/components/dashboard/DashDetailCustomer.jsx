import { Button, Dropdown, Table, TextInput } from "flowbite-react";
import { HiMinus } from "react-icons/hi2";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { LuCircleDollarSign, LuCrown, LuEye, LuGift } from "react-icons/lu";
import { MdMoreVert, MdOutlineShoppingCart } from "react-icons/md";
import { TbJewishStar } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function DashDetailCustomer() {
  const student = {
    id: 1,
    studentId: "123456",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0123456789",
    address: "123 Street, City, Country",
    avatar:
      "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
    point: 100,
    coupons: [
      {
        id: 1,
        name: "Coupon 1",
        discount: 10,
        code: "CODE1",
        expiredDate: "Oct 9, 2024",
      },
      {
        id: 2,
        name: "Coupon 2",
        discount: 20,
        code: "CODE2",
        expiredDate: "Oct 10, 2024",
      },
    ],
    wishlist: [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Product 2",
        price: 50,
        image: "https://via.placeholder.com/150",
      },
    ],
    orders: [
      {
        id: 1,
        date: "Oct 9, 2024",
        foods: [
          {
            id: 1,
            name: "Food 1",
            price: 100,
            image: "https://via.placeholder.com/150",
            quantity: 2,
          },
          {
            id: 2,
            name: "Food 2",
            price: 50,
            image: "https://via.placeholder.com/150",
            quantity: 1,
          },
        ],
        total: 150,
        status: "Delivered",
      },
      {
        id: 2,
        date: "Oct 10, 2024",
        amount: 50,
        foods: [
          {
            id: 1,
            name: "Food 1",
            price: 100,
            image: "https://via.placeholder.com/150",
            quantity: 2,
          },
        ],
        total: 100,
        status: "Pending",
      },
      {
        id: 3,
        date: "Oct 10, 2024",
        amount: 50,
        foods: [
          {
            id: 1,
            name: "Food 1",
            price: 100,
            image: "https://via.placeholder.com/150",
            quantity: 2,
          },
        ],
        total: 100,
        status: "Pending",
      },
    ],
    wallet: {
      balance: 100,
      transactions: [
        {
          id: 1,
          date: "Oct 9, 2024",
          amount: 100,
          type: "Deposit",
        },
        {
          id: 2,
          date: "Oct 10, 2024",
          amount: 50,
          type: "Withdraw",
        },
      ],
    },
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold ">Customer ID #{student.id}</h1>
          <p className="text-slate-500">Oct 9, 2024</p>
        </div>
        <Button className="mt-4 bg-red-500">
          <Link to={`/dashboard?tab=addProducts`} className="flex">
            <HiMinus size={20} />
            <span className="ml-2">Delete Customer</span>
          </Link>
        </Button>
      </div>

      <div className="mt-8 flex gap-8">
        {/* PROFILE */}
        <div className="w-1/3 bg-white h-fit p-6 rounded-md shadow-md">
          <div className="flex flex-col items-center gap-4 mt-12">
            <img
              src={student.avatar}
              alt={student.fullName}
              className="w-20 h-20 object-center rounded-md"
            />
            <div className="">
              <h1 className="text-2xl text-center font-semibold">
                {student.fullName}
              </h1>
              <p className="text-slate-500 text-center">
                Student ID: {student.studentId}
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
                    <p className="text-slate-500 font-semibold">Orders</p>
                    <p className="">{student.orders.length}</p>
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
                    <p className="text-slate-500 font-semibold">Point</p>
                    <p className="">{student.point}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* DETAIL */}
          <div className="mt-6">
            <div className="border-b py-2">
              <h1 className="text-lg font-semibold">Details</h1>
            </div>
            <div className="mt-2 *:text-sm space-y-1">
              <div className="">
                <span className="font-semibold mr-2">Phone:</span>
                <span>{student.phone}</span>
              </div>
              <div className="">
                <span className="font-semibold mr-2">Email:</span>
                <span>{student.email}</span>
              </div>
              <div className="">
                <span className="font-semibold mr-2">Address:</span>
                <span>{student.address}</span>
              </div>
              <div className="">
                <span className="font-semibold mr-2">Status:</span>
                <span>Active</span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="">
            <Button className="mt-4 w-full bg-slate-600">Edit Customer</Button>
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
                    Account Balance
                  </p>
                  <p className="">${student.wallet.balance} Credit Left</p>
                  <p>Account balance for next purchase</p>
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
                      {" "}
                      {student.wishlist.length}
                    </span>{" "}
                    Items in wishlist
                  </p>
                  <p>Receive notifications on price drops</p>
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
                    Loyalty Program
                  </p>
                  <p className=" w-fit  p-1  rounded-md text-lime-600 font-semibold text-sm bg-lime-50 border border-lime-600">
                    Platinum member
                  </p>
                  <p>3000 points to next tier</p>
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
                      {student.coupons.length}
                    </span>{" "}
                    Coupons you win
                  </p>
                  <p>Use coupon on next purchase</p>
                </div>
              </div>
            </div>
          </div>

          {/* ORDERS PLACED */}
          <div className="w-full mt-8 p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <h1>Orders Placed</h1>
              <TextInput placeholder="Search Order" />
            </div>

            {/* TABLE */}
            <div className="mt-8">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Order ID</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Amount</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {student.orders.map((order) => (
                    <Table.Row key={order.id}>
                      <Table.Cell>{order.id}</Table.Cell>
                      <Table.Cell>{order.date}</Table.Cell>
                      <Table.Cell>${order.total}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`${
                            order.status === "Delivered"
                              ? "bg-lime-100 text-lime-600"
                              : "bg-red-100 text-red-600"
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
