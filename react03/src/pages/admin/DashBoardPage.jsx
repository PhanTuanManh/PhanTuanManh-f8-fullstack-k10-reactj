import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
const DashBoardPage = () => {
  return (
    <div>
      <Header />
      <section className="navbar fixed top-0 left-0 bottom-0 z-[0] bg-gray-300 w-[300px] flex flex-col">
        <nav className="p-4 flex flex-col mt-[64px] w-full">
          <ul>
            <li className="mb-4">
              <Link to="/admin" className="text-2xl">
                DashBoardPage
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                elements={<Outlet />}
                className="cursor-pointer"
              >
                Product Management
              </Link>
            </li>
            <li></li>
          </ul>
        </nav>
      </section>
      <section className="ml-[300px] mt-[64px]">
        {/* Giữ chỗ cho các component khác bằng Outlet */}
        <Outlet />
      </section>
    </div>
  );
};

export default DashBoardPage;
