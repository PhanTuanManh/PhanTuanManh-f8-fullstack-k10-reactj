import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
const DashBoardPage = () => {
  return (
    <div>
      <Header />
      <h1>DashBoardPage</h1>

      {/* Giữ chỗ cho các component khác bằng Outlet */}
      <Outlet />
    </div>
  );
};

export default DashBoardPage;
