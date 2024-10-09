import { useLocation } from "react-router-dom";
import DashSidebar from "../components/dashboard/DashSidebar";
import { useEffect, useState } from "react";
import DashProduct from "../components/dashboard/DashProduct";
import DashHome from "../components/dashboard/DashHome";
import DashAddProduct from "../components/dashboard/DashAddProduct";
import DashboardM from "../components/dashboard/Dashboard";
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="">
        <DashSidebar />
      </div>
      {/* SETTING */}
      {tab === "dashboard" && <DashboardM />}
      {tab === "products" && <DashProduct />}
      {tab === "addProducts" && <DashAddProduct />}
      {tab === "addCategory" && <DashAddProduct />}
    </div>
  );
}
