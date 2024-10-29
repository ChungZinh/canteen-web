import {
  Button,
  Dropdown,
  Pagination,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { buildQueryString } from "../../utils/buildQueryString";
import orderApi from "../../api/orderApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { formatCreatedAt } from "../../utils/formatDate";
import { nav } from "framer-motion/client";

export default function DashListOrders() {
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const onPageChange = (pageN) => {
    if (pageN < 1 || pageN > totalPages) return;
    setCurrentPage(pageN);
    setQuery((prev) => ({ ...prev, page: pageN }));
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
  }, [currentUser?._id, query]);

  const handleDetail = (order) => {
    navigate(`/dashboard?tab=detailOrders`, { state: { order } });
  };

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
            <Table.HeadCell>Customer</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Method</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map((order) => (
              <Table.Row key={order._id}>
                <Table.Cell>
                  <div className="flex items-center">
                    <img
                      src={order.user.avatar}
                      alt="avatar"
                      className="h-10 w-10 rounded-full border"
                    />
                    <div className="ml-2 space-y-1">
                      <p className="font-semibold">{order.user.fullName}</p>
                      <p className="text-slate-500 text-xs">
                        {order.user.email}
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
                      order.status === "Đã thanh toán"
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
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
