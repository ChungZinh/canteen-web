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
          <Route path="/collections" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <FooterC />
      </BrowserRouter>
    </>
  );
}

export default App;
