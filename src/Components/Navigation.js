import React, { useState } from "react";
import { ReactComponent as Menu } from "../Assets/menu.svg";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function Navigation() {
  const [open, setOpen] = useState();
  const handleCollapser = () => {
    setOpen(false);
  };

  const logoutUser = () => {
    auth.signOut();
  };
  return (
    <div className="bg-white sm:flex sm:justify-between lg:max-w-4xl lg:m-auto xl:max-w-5xl 2xl:max-w-screen-xl">
      <div className="py-3 px-4 flex justify-between items-center">
        <div>
          <Logo className="sm:w-48 sm:h-full" />
        </div>
        <button
          className="cursor-pointer focus:outline-none sm:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </button>
      </div>
      <div className={`bg-motorblue p-2 ${open ? "block" : "hidden"} sm:block sm:bg-white`}>
        <div className="space-y-2">
          <Link
            onClick={handleCollapser}
            to="/circuits"
            className="block sm:inline-block text-white font-semibold p-1 px-2 rounded hover:bg-blue-400 sm:text-gray-600 sm:hover:bg-white"
          >
            Circuits
          </Link>
          <Link
            onClick={handleCollapser}
            to="/"
            className="block sm:inline-block text-white font-semibold p-1 px-2 rounded hover:bg-blue-400 sm:text-gray-600 sm:hover:bg-white"
          >
            Trackdays
          </Link>
          <Link
            onClick={handleCollapser}
            to="/requests"
            className="block sm:inline-block text-white font-semibold p-1 px-2 rounded hover:bg-blue-400 sm:text-gray-600 sm:hover:bg-white"
          >
            Requests
          </Link>
          <Link
            onClick={logoutUser}
            to="/login"
            className="block sm:inline-block text-white font-semibold p-1 px-2 rounded hover:bg-blue-400 sm:text-gray-600 sm:hover:bg-white"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
