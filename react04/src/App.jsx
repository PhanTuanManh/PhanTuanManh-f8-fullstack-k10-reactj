import React from "react";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Services from "./pages/Services";
import Blog from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  console.log(location);
  const hideHeaderRoutes = ["/404"]; // Các đường dẫn không hiển thị Header
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {/* Kiểm tra có hiển thị Header hay không */}
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        {/* Đường dẫn không tồn tại sẽ chuyển hướng đến trang 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
