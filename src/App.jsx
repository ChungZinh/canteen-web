import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import FooterC from "./components/FooterC";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Recruitment from "./pages/Recruitment";
import SignUp from "./pages/SignUp";
import AdminRoute from "./components/route/AdminRoute";
import Dashboard from "./pages/Dashboard";
import UserRoute from "./components/route/UserRoute";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import CheckoutStep2 from "./pages/CheckoutStep2";
import ChefDashboard from "./pages/ChefDashboard";
import CompleteOrder from "./pages/CompleteOrder";
import DepositMoney from "./pages/DepositMoney";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<UserRoute />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/complete-order/:id" element={<CompleteOrder />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-step-2" element={<CheckoutStep2 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deposit" element={<DepositMoney />} />
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chef-dashboard" element={<ChefDashboard />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <FooterC />
      </BrowserRouter>
    </>
  );
}

export default App;
