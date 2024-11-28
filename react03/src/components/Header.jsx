import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-[20px]">
          <nav>
            <ul className="flex justify-between items-center">
              <li className="px-4 mx-[5px]">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="px-4 mx-[5px] active:text-red-500">
                <NavLink to="/admin">Admin</NavLink>
              </li>
              <li className="px-4 mx-[5px]">
                <NavLink to="/admin/product">Admin Product</NavLink>
              </li>
              <li className="px-4 mx-[5px]">
                <NavLink to="">Blog</NavLink>
              </li>
              <li className="px-4 mx-[5px]">
                <NavLink to="">Contact</NavLink>
              </li>
            </ul>
          </nav>
          <div>
            <div className="flex items-center justify-center">
              {/* <i className="fa-solid fa-magnifying-glass cursor-pointer"></i> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
