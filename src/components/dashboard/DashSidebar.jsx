import { Avatar, Dropdown, Sidebar } from "flowbite-react";
import { HiArchive, HiChartPie, HiShoppingBag } from "react-icons/hi";
import { useEffect, useState } from "react";
import logo from "../../assets/imgs/logo.png";
import { Link, useLocation } from "react-router-dom";
import { GoDot } from "react-icons/go";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { BiSolidDiscount } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../../api/authApi";
import { signOutSuccess } from "../../redux/user/userSlice";

export default function DashSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [tab, setTab] = useState("");
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    // authApi.signOut();
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    console.log(refreshToken);
    console.log(accessToken);

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

  return (
    <div className="flex items-center">
      {/* Sidebar container with 100vh height */}
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className={`h-screen transition-all duration-300  border-r ${
          isCollapsed ? "w-24" : "w-64"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="">
            {/* Logo and toggle button */}
            <div
              onClick={toggleSidebar}
              className="flex justify-center items-center py-3 bg-slate-400 rounded-md"
            >
              <img
                className={`transition-all duration-400 ${
                  isCollapsed ? "w-28" : "w-36"
                }`}
                src={logo}
                alt="logo"
              />
              {/* <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-200"
          >
            {isCollapsed ? (
              <HiArrowSmRight size={20} />
            ) : (
              <HiArrowSmRight size={20} className="rotate-180" />
            )}
          </button> */}
            </div>

            {/* Sidebar items */}
            <Sidebar.Items
              className={`${
                isCollapsed ? "flex justify-center items-center " : ""
              } `}
            >
              <Sidebar.ItemGroup className="">
                {/* DASHBOARD */}
                <Sidebar.Item active={tab === "dashboard"}>
                  {isCollapsed ? (
                    <div className=" p-5">
                      <Link to={"/dashboard?tab=dashboard"}>
                        <HiChartPie size={35} />
                      </Link>
                    </div>
                  ) : (
                    <div className="py-2">
                      <Sidebar.Item
                        active={tab === "dashboard"}
                        icon={HiChartPie}
                      >
                        <Link to={"/dashboard?tab=dashboard"}>Tổng quan</Link>
                      </Sidebar.Item>
                    </div>
                  )}
                </Sidebar.Item>

                {/* PRODUCTS */}
                {isCollapsed ? (
                  <Sidebar.Item active={tab === "products"}>
                    <div className="p-5">
                      <Link to={"/dashboard?tab=products"}>
                        <HiShoppingBag size={35} />
                      </Link>
                    </div>
                  </Sidebar.Item>
                ) : (
                  <Sidebar.Collapse
                    icon={HiShoppingBag}
                    className="p-6"
                    label="Món ăn"
                  >
                    <Sidebar.Item active={tab === "products"}>
                      <Link
                        to={"/dashboard?tab=products"}
                        className="flex items-center"
                      >
                        <GoDot />
                        <span className="ml-2 ">Danh sách</span>
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item active={tab === "addProducts"}>
                      <Link
                        to={"/dashboard?tab=addProducts"}
                        className="flex gap-0 items-center"
                      >
                        <GoDot />
                        <span className="ml-2 ">Thêm</span>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                )}

                {/* ORDERS */}
                {isCollapsed ? (
                  <Sidebar.Item active={tab === "listOrders"}>
                    <div className="p-5">
                      <Link to={"/dashboard?tab=listOrders"}>
                        <HiArchive size={35} />
                      </Link>
                    </div>
                  </Sidebar.Item>
                ) : (
                  <Sidebar.Collapse
                    icon={HiArchive}
                    className="p-6"
                    label="Đơn hàng"
                  >
                    <Sidebar.Item active={tab === "listOrders"}>
                      <Link
                        to={"/dashboard?tab=listOrders"}
                        className="flex gap-0 items-center"
                      >
                        <GoDot />
                        <span className="ml-2 ">Danh sách</span>
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item active={tab === "detailOrders"}>
                      <Link
                        to={"/dashboard?tab=detailOrders"}
                        className="flex gap-0 items-center"
                      >
                        <GoDot />
                        <span className="ml-2 ">Chi tiết</span>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                )}

                {/* CUSTOMER */}
                {isCollapsed ? (
                  <Sidebar.Item active={tab === "listCustomers"}>
                    <div className=" p-5">
                      <Link to={"/dashboard?tab=listCustomers"}>
                        <BsFillPersonBadgeFill size={35} />
                      </Link>
                    </div>
                  </Sidebar.Item>
                ) : (
                  <Sidebar.Collapse
                    icon={BsFillPersonBadgeFill}
                    className="p-6"
                    label="Khách hàng"
                  >
                    <Sidebar.Item active={tab === "listCustomers"}>
                      <Link
                        to={"/dashboard?tab=listCustomers"}
                        className="flex gap-0 items-center"
                      >
                        <GoDot />
                        <span className="ml-2 ">Danh sách</span>
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item active={tab === "detailCustomer"}>
                      <Link
                        to={"/dashboard?tab=detailCustomer"}
                        className="flex gap-0 items-center"
                      >
                        <GoDot />
                        <span className="ml-2 ">Chi tiết</span>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                )}

                {/* DISCOUNT */}
                {isCollapsed ? (
                  <Sidebar.Item active={tab === "listDiscounts"}>
                    <div className=" p-5">
                      <Link to={"/dashboard?tab=listDiscounts"}>
                        <BiSolidDiscount size={35} />
                      </Link>
                    </div>
                  </Sidebar.Item>
                ) : (
                  <Sidebar.Collapse
                    icon={BiSolidDiscount}
                    className="p-6"
                    label="Khuyến mãi"
                  >
                    <Sidebar.Item active={tab === "listDiscounts"}>
                      <Link
                        to={"/dashboard?tab=listDiscounts"}
                        className="flex gap-0 items-center"
                      >
                        <GoDot />
                        <span className="ml-2 ">Danh sách</span>
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item active={tab === "addDiscount"}>
                      <Link
                        to={"/dashboard?tab=addDiscount"}
                        className="flex gap-0 items-center"
                      >
                        <GoDot />
                        <span className="ml-2 ">Thêm</span>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                )}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>

          {/* AVATAR */}
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
      </Sidebar>
    </div>
  );
}
