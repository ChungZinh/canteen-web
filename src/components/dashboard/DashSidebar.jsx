import { Sidebar } from "flowbite-react";
import { HiArchive, HiChartPie, HiShoppingBag } from "react-icons/hi";
import { useEffect, useState } from "react";
import logo from "../../assets/imgs/logo.png";
import { Link, useLocation } from "react-router-dom";
import { GoDot } from "react-icons/go";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";

export default function DashSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  return (
    <div className="flex">
      {/* Sidebar container with 100vh height */}
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className={`h-screen transition-all duration-300 border-r ${
          isCollapsed ? "w-24" : "w-64"
        }`}
      >
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
                  <Sidebar.Item active={tab === "dashboard"} icon={HiChartPie}>
                    <Link to={"/dashboard?tab=dashboard"}>Dashboard</Link>
                  </Sidebar.Item>
                </div>
              )}
            </Sidebar.Item>

            {/* PRODUCTS */}
            {isCollapsed ? (
              <Sidebar.Item active={tab === "products"}>
                <div className=" p-5">
                  <Link to={"/dashboard?tab=products"}>
                    <HiShoppingBag size={35} />
                  </Link>
                </div>
              </Sidebar.Item>
            ) : (
              <Sidebar.Collapse
                icon={HiShoppingBag}
                className="p-6"
                label="Products"
              >
                <Sidebar.Item active={tab === "products"}>
                  <Link
                    to={"/dashboard?tab=products"}
                    className="flex gap-0 items-center"
                  >
                    <GoDot />
                    <span className="ml-2 ">List</span>
                  </Link>
                </Sidebar.Item>
                <Sidebar.Item active={tab === "addProducts"}>
                  <Link
                    to={"/dashboard?tab=addProducts"}
                    className="flex gap-0 items-center"
                  >
                    <GoDot />
                    <span className="ml-2 ">Add</span>
                  </Link>
                </Sidebar.Item>
              </Sidebar.Collapse>
            )}

            {/* ORDERS */}
            {isCollapsed ? (
              <Sidebar.Item active={tab === "listOrders"}>
                <div className=" p-5">
                  <Link to={"/dashboard?tab=listOrders"}>
                    <HiArchive size={35} />
                  </Link>
                </div>
              </Sidebar.Item>
            ) : (
              <Sidebar.Collapse icon={HiArchive} className="p-6" label="Orders">
                <Sidebar.Item active={tab === "listOrders"}>
                  <Link
                    to={"/dashboard?tab=listOrders"}
                    className="flex gap-0 items-center"
                  >
                    <GoDot />
                    <span className="ml-2 ">List</span>
                  </Link>
                </Sidebar.Item>
                <Sidebar.Item active={tab === "detailOrders"}>
                  <Link
                    to={"/dashboard?tab=detailOrders"}
                    className="flex gap-0 items-center"
                  >
                    <GoDot />
                    <span className="ml-2 ">Details</span>
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
                label="Customers"
              >
                <Sidebar.Item active={tab === "listCustomers"}>
                  <Link
                    to={"/dashboard?tab=listCustomers"}
                    className="flex gap-0 items-center"
                  >
                    <GoDot />
                    <span className="ml-2 ">List</span>
                  </Link>
                </Sidebar.Item>
                <Sidebar.Item active={tab === "detailCustomer"}>
                  <Link
                    to={"/dashboard?tab=detailCustomer"}
                    className="flex gap-0 items-center"
                  >
                    <GoDot />
                    <span className="ml-2 ">Details</span>
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
                label="Discounts"
              >
                <Sidebar.Item active={tab === "listDiscounts"}>
                  <Link
                    to={"/dashboard?tab=listDiscounts"}
                    className="flex gap-0 items-center"
                  >
                    <GoDot />
                    <span className="ml-2 ">List</span>
                  </Link>
                </Sidebar.Item>
                <Sidebar.Item active={tab === "addDiscount"}>
                  <Link
                    to={"/dashboard?tab=addDiscount"}
                    className="flex gap-0 items-center"
                  >
                    <GoDot />
                    <span className="ml-2 ">Add</span>
                  </Link>
                </Sidebar.Item>
              </Sidebar.Collapse>
            )}

            {/* REVIEW */}
            <Sidebar.Item active={tab === "reviews"}>
              {isCollapsed ? (
                <div className=" p-5">
                  <Link to={"/dashboard?tab=dashboard"}>
                    <MdReviews size={35} />
                  </Link>
                </div>
              ) : (
                <div className="py-2">
                  <Sidebar.Item active={tab === "review"} icon={MdReviews}>
                    <Link to={"/dashboard?tab=dashboard"}>Manager Reivew</Link>
                  </Sidebar.Item>
                </div>
              )}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
