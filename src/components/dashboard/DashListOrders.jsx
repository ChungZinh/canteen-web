import { Button, Dropdown, Select, Table, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { BiExport } from "react-icons/bi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { Link } from "react-router-dom";

export default function DashListOrders() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [totalPages, setTotalPages] = useState(10);
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
      setQuery((prevQuery) => ({
        ...prevQuery,
        page: pageNumber,
      }));
    }
  };
  const ordersData = [
    {
      id: 1,
      orderId: "123456",
      date: "2021-09-20",
      customer: {
        name: "John Doe",
        phone: "1234567890",
        email: "johndoe@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/8.png",
      },
      status: "Pending",
      method: "Cash",
    },
    {
      id: 2,
      orderId: "123457",
      date: "2021-09-21",
      customer: {
        name: "Jane Doe",
        phone: "1234567890",
        email: "janedone@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/7.png",
      },
      status: "Delivered",
      method: "Card",
    },
    {
      id: 3,
      orderId: "123458",
      date: "2021-09-22",
      customer: {
        name: "Michael Smith",
        phone: "9876543210",
        email: "michaelsmith@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/6.png",
      },
      status: "Shipped",
      method: "Cash",
    },
    {
      id: 4,
      orderId: "123459",
      date: "2021-09-23",
      customer: {
        name: "Sarah Brown",
        phone: "1231231234",
        email: "sarahbrown@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/5.png",
      },
      status: "Cancelled",
      method: "Card",
    },
    {
      id: 5,
      orderId: "123460",
      date: "2021-09-24",
      customer: {
        name: "David Johnson",
        phone: "5555555555",
        email: "davidjohnson@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/4.png",
      },
      status: "Pending",
      method: "Cash",
    },
    {
      id: 6,
      orderId: "123461",
      date: "2021-09-25",
      customer: {
        name: "Emma Wilson",
        phone: "9999999999",
        email: "emmawilson@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/3.png",
      },
      status: "Delivered",
      method: "Card",
    },
    {
      id: 7,
      orderId: "123462",
      date: "2021-09-26",
      customer: {
        name: "Olivia Davis",
        phone: "8888888888",
        email: "oliviadavis@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/2.png",
      },
      status: "Shipped",
      method: "Cash",
    },
    {
      id: 8,
      orderId: "123463",
      date: "2021-09-27",
      customer: {
        name: "James Miller",
        phone: "7777777777",
        email: "jamesmiller@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/1.png",
      },
      status: "Delivered",
      method: "Card",
    },
    {
      id: 9,
      orderId: "123464",
      date: "2021-09-28",
      customer: {
        name: "Isabella Garcia",
        phone: "6666666666",
        email: "isabellagarcia@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/1.png",
      },
      status: "Pending",
      method: "Cash",
    },
    {
      id: 10,
      orderId: "123465",
      date: "2021-09-29",
      customer: {
        name: "Alexander Martinez",
        phone: "5551234567",
        email: "alexandermartinez@gmail.com",
        avatar:
          "https://demos.themeselection.com/marketplace/materio-mui-nextjs-admin-template/demo-1/images/avatars/3.png",
      },
      status: "Shipped",
      method: "Card",
    },
  ];

  return (
    <div className="h-screen w-full bg-slate-200 p-4 overflow-y-scroll">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold ">List Orders</h1>
          <p className="text-slate-500">List of all orders</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-md shadow-md mt-4">
        <div className="flex py-2 px-4 justify-between items-center">
          <div className="">
            <TextInput placeholder="Search orders" className="w-full" />
          </div>
          <Button className="flex items-center ">
            <BiExport size={20} />
            <span className="ml-2">Export</span>
          </Button>
        </div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Customer</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Method</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {ordersData.map((order) => (
              <Table.Row key={order.id}>
                <Table.Cell>{order.orderId}</Table.Cell>
                <Table.Cell>{order.date}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <img
                      src={order.customer.avatar}
                      alt="avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="ml-2">
                      <p className="font-semibold">{order.customer.name}</p>
                      <p className="text-slate-500">{order.customer.email}</p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`${
                      order.status === "Delivered" ||
                      order.status === "Completed"
                        ? "bg-lime-100 text-lime-600"
                        : "bg-red-100 text-red-600"
                    } p-1 rounded-md`}
                  >
                    {order.status}
                  </span>
                </Table.Cell>
                <Table.Cell>{order.method}</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={<MdMoreVert size={20} className="text-slate-500" />}
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
        {/* PAGINATION */}
      </div>
      <div className=" p-2 flex justify-between">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <Select className="w-[80px] h-[40px]">
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </Select>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-2">
            <Button
              size={"xs"}
              color={"#475569"}
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                size={"xs"}
                color={"#475569"}
                onClick={() => handlePageChange(index + 1)}
                className={page === index + 1 ? "bg-slate-600 text-white" : ""}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              size={"xs"}
              color={"#475569"}
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
