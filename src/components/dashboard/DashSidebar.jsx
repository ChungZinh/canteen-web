import { Sidebar } from "flowbite-react";
import { HiChartPie, HiShoppingBag, HiTable } from "react-icons/hi";
import { useEffect, useState } from "react";
import logo from "../../assets/imgs/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");

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
            <Sidebar.Item active={tab === "dashboard"}>
              {isCollapsed ? (
                <div className=" p-5">
                  <Link to={"/dashboard?tab=dashboard"}>
                    <HiChartPie size={35} />
                  </Link>
                </div>
              ) : (
                <Link
                  to={"/dashboard?tab=dashboard"}
                  className="flex gap-0 items-center p-4"
                >
                  <HiChartPie size={30} />
                  <span className="ml-2 text-xl">Dashboard</span>
                </Link>
              )}
            </Sidebar.Item>
            <Sidebar.Item active={tab === "products"}>
              {isCollapsed ? (
                <div className=" p-5">
                  <Link to={"/dashboard?tab=products"}>
                    <HiTable size={35} />
                  </Link>
                </div>
              ) : (
                <Link
                  to={"/dashboard?tab=products"}
                  className="flex gap-0 items-center p-4"
                >
                  <HiTable size={30} />
                  <span className="ml-2 text-xl">Table</span>
                </Link>
              )}
            </Sidebar.Item>
            <Sidebar.Item active={tab === "addProducts"}>
              {isCollapsed ? (
                <div className=" p-5">
                  <Link to={"/dashboard?tab=addProducts"}>
                    <HiShoppingBag size={35} />
                  </Link>
                </div>
              ) : (
                <Link
                  to={"/dashboard?tab=addProducts"}
                  className="flex gap-0 items-center p-4"
                >
                  <HiShoppingBag size={30} />
                  <span className="ml-2 text-xl">Products</span>
                </Link>
              )}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
