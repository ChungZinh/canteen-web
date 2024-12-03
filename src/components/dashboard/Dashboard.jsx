import { Button } from "flowbite-react";
import {
  HiArrowCircleDown,
  HiArrowCircleUp,
  HiClipboardList,
  HiCurrencyDollar,
  HiUsers,
} from "react-icons/hi";
import { formatDate_v1, timeAgo } from "../../utils/formatDate";
import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrdersRevenueBarChart from "../charts/OrdersRevenueBarChart";
import PercentagePieChart from "../charts/PercentagePieChart";

export default function Dashboard() {
  const [currentMonthOrders, setCurrentMonthOrders] = useState(0);
  const [lastMonthOrders, setLastMonthOrders] = useState(0);
  const [percentageChangeOrders, setPercentageChangeOrders] = useState(0);
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
  const [percentageChangeRevenue, setPercentageChangeRevenue] = useState(0);
  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [lastMonthFoodSales, setLastMonthFoodSales] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrderStatistics = async () => {
      const response = await orderApi.getStatistics(currentUser, accessToken);
      if (response.data) {
        setCurrentMonthOrders(response.data.currentMonthOrders);
        setLastMonthOrders(response.data.lastMonthOrders);
        setPercentageChangeOrders(response.data.percentageChangeOrder);
        setCurrentMonthRevenue(response.data.currentMonthRevenue);
        setLastMonthRevenue(response.data.lastMonthRevenue);
        setPercentageChangeRevenue(response.data.percentageChangeRevenue);
        setCurrentMonthSales(response.data.currentMonthFoodSales);
        setLastMonthFoodSales(response.data.lastMonthFoodSales);
        setPercentChange(response.data.percentageChangeFoodSales);
      }
    };
    const fetchRecentOrders = async () => {
      const params = new URLSearchParams({
        limit: "2", // Limit to 2 orders
        order: "desc", // Sorting in descending order
        page: "1", // First page
      });
      const response = await orderApi.getAll(
        `?${params.toString()}`,
        currentUser,
        accessToken
      );

      if (response.data) {
        setRecentOrders(response.data.orders);
      }
    };
    fetchRecentOrders();
    fetchOrderStatistics();
  }, [
    setCurrentMonthSales,
    setPercentChange,
    setCurrentMonthOrders,
    setPercentageChangeOrders,
    setCurrentMonthRevenue,
    setPercentageChangeRevenue,
    currentUser,
    accessToken,
  ]);

  // Dữ liệu cho Bar Chart
  const barChartData = [
    { name: "Orders", current: currentMonthOrders, last: lastMonthOrders },
    {
      name: "Food Sales",
      current: currentMonthSales,
      last: lastMonthFoodSales,
    },
  ];

  const barChartData1 = [
    { name: "Revenue", current: currentMonthRevenue, last: lastMonthRevenue },
  ];

  // Dữ liệu cho Pie Chart
  const pieChartDataOrders = [
    { name: "Increase", value: parseFloat(percentageChangeOrders) },
    { name: "Remaining", value: 100 - parseFloat(percentageChangeOrders) },
  ];

  const pieChartDataRevenue = [
    { name: "Increase", value: parseFloat(percentageChangeRevenue) },
    { name: "Remaining", value: 100 - parseFloat(percentageChangeRevenue) },
  ];

  return (
    <div className="h-screen w-full bg-slate-200 p-6 flex gap-6 overflow-y-scroll">
      <div className="w-2/3 ">
        <div className="border-b border-b-slate-400 pb-6 space-y-2">
          <h1 className="text-3xl font-semibold ">Tổng Quan</h1>
          <p className="text-slate-500">{formatDate_v1(new Date())}</p>
        </div>
        <div className="flex gap-6 mt-4">
          {/* TOTAL REVENUE */}
          <div className="p-4 bg-slate-600 w-1/3 rounded-md shadow-md flex flex-col justify-between gap-4">
            <div className="flex gap-2">
              <div className="flex w-10 h-10 justify-center items-center bg-slate-400 rounded-md">
                <HiCurrencyDollar className="text-slate-300" size={30} />
              </div>
              <div className="flex items-center">
                {percentageChangeRevenue > 0 ? (
                  <>
                    <p className="text-lime-500 fon font-semibold">
                      +{percentageChangeRevenue}%
                    </p>
                    <HiArrowCircleUp size={30} className="text-lime-500" />
                  </>
                ) : (
                  <>
                    <p className="text-red-500 fon font-semibold">
                      {percentageChangeRevenue}%
                    </p>
                    <HiArrowCircleDown size={30} className="text-red-500" />
                  </>
                )}
              </div>
            </div>
            <div className="">
              <h1 className="text-3xl font-semibold text-slate-300">
                {currentMonthRevenue.toLocaleString()}₫
              </h1>
            </div>
            <div className="">
              <p className="text-slate-300">Tổng doanh thu</p>
            </div>
          </div>

          {/* TOTAL DISH ORDERS */}
          <div className="p-4 bg-slate-600 w-1/3 rounded-md shadow-md flex flex-col justify-between gap-4">
            <div className="flex gap-2">
              <div className="flex w-10 h-10 justify-center items-center bg-slate-400 rounded-md">
                <HiClipboardList className="text-slate-300" size={30} />
              </div>
              <div className="flex items-center">
                {percentageChangeOrders > 0 ? (
                  <>
                    <p className="text-lime-500 fon font-semibold">
                      +{percentageChangeOrders}%
                    </p>
                    <HiArrowCircleUp size={30} className="text-lime-500" />
                  </>
                ) : (
                  <>
                    <p className="text-red-500 fon font-semibold">
                      {percentageChangeOrders}%
                    </p>
                    <HiArrowCircleDown size={30} className="text-red-500" />
                  </>
                )}
              </div>
            </div>
            <div className="">
              <h1 className="text-3xl font-semibold text-slate-300">
                {currentMonthOrders.toLocaleString()} đơn
              </h1>
            </div>
            <div className="">
              <p className="text-slate-300">Tổng đơn đã đặt</p>
            </div>
          </div>

          {/* TOTAL CUSTOMERS */}
          <div className="p-4 bg-slate-600 w-1/3 rounded-md shadow-md flex flex-col justify-between gap-4">
            <div className="flex gap-2">
              <div className="flex w-10 h-10 justify-center items-center bg-slate-400 rounded-md">
                <HiUsers className="text-slate-300" size={30} />
              </div>
              <div className="flex items-center">
                {percentChange > 0 ? (
                  <>
                    <p className="text-lime-500 fon font-semibold">
                      +{percentChange}%
                    </p>
                    <HiArrowCircleUp size={30} className="text-lime-500" />
                  </>
                ) : (
                  <>
                    <p className="text-red-500 fon font-semibold">
                      {percentChange}%
                    </p>
                    <HiArrowCircleDown size={30} className="text-red-500" />
                  </>
                )}
              </div>
            </div>
            <div className="">
              <h1 className="text-3xl font-semibold text-slate-300">
                {currentMonthSales.toLocaleString()} món
              </h1>
            </div>
            <div className="">
              <p className="text-slate-300">Tổng món đã bán</p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="border-b border-b-slate-400 pb-6 mt-6">
            <h1 className="text-3xl font-semibold ">Đơn đặt mới</h1>
            <p className="text-slate-500">
              Đơn hàng gần đây nhất của khách hàng
            </p>
          </div>
          <div className="overflow-y-scroll h-[570px]">
            {recentOrders.map((order) => (
              <div className="mt-6" key={order._id}>
                <div className="bg-white p-4 rounded-md shadow-md">
                  <div className="flex justify-between items-center">
                    <div className="">
                      <h1 className="text-xl font-semibold">
                        Order #{order._id}
                      </h1>
                      <p className="text-slate-500">
                        {order?.foods?.length} món
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500">
                        {timeAgo(order?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    {order?.foods?.map((food) => (
                      <div
                        className="flex justify-between items-center"
                        key={food._id}
                      >
                        <div className="flex gap-2">
                          <img
                            src={food?.image}
                            alt={food?.name}
                            className="w-10 h-10 rounded-md "
                          />
                          <div className="">
                            <h1 className="text-lg font-semibold">
                              {food?.name}
                            </h1>
                            <p className="text-slate-500">
                              {food?.quantity} x {food?.price.toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <p className="text-slate-500">
                            {order?.amount.toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => {
                        navigate(`/dashboard?tab=detailOrders`, {
                          state: { order },
                        });
                      }}
                      className="bg-slate-600"
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-slate-100 p-4 ">
        {/* CHART */}
        <div className="flex flex-col h-full justify-between items-center">
          <div style={{ marginBottom: "20px" }}>
            <h2 className="font-semibold  mb-2 text-xl">
              So sánh tháng hiện tại và tháng trước
            </h2>
            <OrdersRevenueBarChart data={barChartData} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h2 className="font-semibold  mb-2 text-xl">
              So sánh doanh thu hiện tại và tháng trước
            </h2>
            <OrdersRevenueBarChart data={barChartData1} />
          </div>
        </div>
      </div>
    </div>
  );
}
