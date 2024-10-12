import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/imgs/logo.png";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../api/authApi";
import { signOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const cartCount = 2;
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

    // Xác định mục active dựa trên URL hiện tại
    const getSelectedNav = () => {
      switch (location.pathname) {
        case "/":
          return "home";
        case "/products":
          return "products";
        case "/about":
          return "about";
        case "/contact":
          return "contact";
        case "/recruitment":
          return "recruitment";
        default:
          return "home";
      }
    };
  
    const [selected, setSelected] = useState(getSelectedNav());

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 100; // Chiều cao của header (px)
      const currentScrollY = window.scrollY;

      // Nếu người dùng cuộn vượt quá chiều cao của header
      if (currentScrollY > headerHeight) {
        // Kiểm tra hướng cuộn
        if (currentScrollY > lastScrollY) {
          // Cuộn xuống -> Ẩn header
          setShowHeader(false);
        } else {
          // Cuộn lên -> Hiện header
          setShowHeader(true);
        }
      } else {
        // Khi ở phần đầu của trang thì luôn hiện header
        setShowHeader(true);
      }

      // Cập nhật vị trí cuộn cuối cùng
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

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
    <>
      {location.pathname === "/dashboard" ? (
        ""
      ) : (
        <div>
          {/* Header with Scroll Effect */}
          <div
            className={`fixed top-0 left-0 w-full bg-white shadow-lg transition-transform duration-400 z-50  ${
              showHeader ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="max-w-screen-2xl mx-auto">
              <Navbar fluid rounded>
                <Navbar.Brand href="/">
                  <img
                    src={logo}
                    className="mr-3 h-12 sm:h-14"
                    alt="Flowbite React Logo"
                  />
                </Navbar.Brand>

                <div className="flex md:order-2 space-x-4 items-center">
                  {/* Shopping Cart Icon with Count */}
                  <div className="relative mt-2">
                    <button className="bg-none" size={"sm"}>
                      <HiOutlineShoppingCart className="h-8 w-8 text-slate-500" />
                    </button>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>

                  {currentUser ? (
                    <>
                      {/* User Avatar Dropdown */}
                      <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                          <Avatar
                            alt="User settings"
                            img={currentUser?.photoURL}
                            rounded
                          />
                        }
                      >
                        <Dropdown.Header>
                          <span className="block text-sm">
                            {currentUser?.fullName}
                          </span>
                          <span className="block truncate text-sm font-medium">
                            {currentUser?.email}
                          </span>
                        </Dropdown.Header>
                        {/* <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item> */}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>
                          Sign out
                        </Dropdown.Item>
                      </Dropdown>
                    </>
                  ) : (
                    <Button
                      className="bg-slate-700"
                      size={"sm"}
                      href="/sign-in"
                    >
                      Đăng nhập
                    </Button>
                  )}
                  {/* Login Button */}

                  <Navbar.Toggle />
                </div>

                {/* Navbar Links */}
                <Navbar.Collapse>
                  <Navbar.Link
                    className="lg:text-base"
                    href="/"
                    active={selected === "home"}
                    onClick={() => setSelected("home")}
                  >
                    Trang chủ
                  </Navbar.Link>
                  <Navbar.Link
                    className="lg:text-base"
                    href="/products"
                    onClick={() => setSelected("products")}
                    active={selected === "products"}
                  >
                    Sản phẩm
                  </Navbar.Link>
                  <Navbar.Link
                    className="lg:text-base"
                    href="/about"
                    onClick={() => setSelected("about")}
                    active={selected === "about"}
                  >
                    Giới thiệu
                  </Navbar.Link>
                  <Navbar.Link
                    className="lg:text-base"
                    href="/contact"
                    onClick={() => setSelected("contact")}
                    active={selected === "contact"}
                  >
                    Liên hệ
                  </Navbar.Link>
                  <Navbar.Link
                    className="lg:text-base"
                    href="/recruitment"
                    onClick={() => setSelected("recruitment")}
                    active={selected === "recruitment"}
                  >
                    Tuyển dụng
                  </Navbar.Link>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
