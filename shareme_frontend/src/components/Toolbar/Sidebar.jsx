import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import logo from "../../assets/logo.png";
const Sidebar = (props) => {
  const categories = [
    { name: "Animals" },
    { name: "Wallpapers" },
    { name: "Photography" },
    { name: "Gaming" },
    { name: "Coding" },
    { name: "Others" },
  ];
  const isNotActiveStyle =
    "flex item-center px-5 gap-3 text-gray-500 hover:text-black trasition-all duration-200 ease-in-out capitalize";
  const isActiveStyle =
    "flex item-center px-5 gap-3 font-extrabold border-black trasition-all duration-200 ease-in-out capitalize";

  const handleCloseSideBar = () => {
    if (props.closeToggle) {
      props.closeToggle(false);
    }
  };
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-1/3 items-center"
          onClick={handleCloseSideBar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSideBar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => {
            return (
              <NavLink
                key={category.name}
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSideBar}
              >
                {category.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div>
        {props.user && (
          <Link
            to={`user-profile/${props.user._id}`}
            className="flex y-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
            onClick={handleCloseSideBar}
          >
            <img
              src={props.user.image}
              className="w-10 h-10 rounded-full"
              alt="User Profile"
            />
            <p>{props.user.userName}</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
