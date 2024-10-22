"use client";
import React, { useContext, useState } from "react";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { GeneralContext } from "../context/General";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const NavBar = () => {
  const generalContext = useContext(GeneralContext);
  if (!generalContext) {
    throw new Error("GeneralContext must be used within a GeneralProvider");
  }

  const { isOpened, toggleSideBar } = generalContext;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);

  const randomItems = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const toggleRole = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="bg-gray-100 py-3 px-4 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-4 relative">
        {/* Hamburger Menu */}
        <div onClick={toggleSideBar}>
          <RiMenuUnfold2Fill className="text-2xl cursor-pointer" />
        </div>

        {/* Initiate Workflow Dropdown */}
        <div className="relative">
          <button
            className="bg-gray-200 p-3 flex items-center gap-2 rounded-xl"
            onClick={toggleDropDown}
          >
            Initiate Workflow <IoIosArrowDown />
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg p-3 rounded-md z-50 w-48">
              {/* First item is search input */}
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />

              {/* Random items */}
              {randomItems.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="md:flex items-center gap-4 hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-3 border rounded-2xl bg-gray-200 "
          />
          {/* Search Icon */}
          <BsSearch className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-700" />
        </div>
        <button className="px-3 py-2 bg-blue-500 text-white rounded-xl ">
          Upload File
        </button>
        <div className="flex items-center justify-between gap-2 bg-gray-100 p-4 rounded-lg">
          {/* User Text */}
          <span className="text-left text-gray-700">User</span>

          {/* Toggle Button */}
          <button
            onClick={toggleRole}
            className={`w-10 h-6 bg-gray-300 rounded-full relative focus:outline-none transition duration-200 ease-in-out ${
              isAdmin ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute w-4 h-4 bg-white rounded-full top-1 left-1 transition transform ${
                isAdmin ? "translate-x-4" : "translate-x-0"
              }`}
            ></span>
          </button>

          {/* Admin Text */}
          <span className="text-right text-gray-700">Admin</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
          {/* Placeholder Image */}
          <img
            src="https://ui-avatars.com/api/?name=Damilola+Odusola&background=random&size=40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          {/* User Name */}
          <p className="text-[17px]">Damilola Odusola</p>
          {/* Dropdown Arrow */}
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
