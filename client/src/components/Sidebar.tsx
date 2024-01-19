import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Sidebar() {
  const handleNavigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("trpc_cred");
    handleNavigate("/login");
  };

  return (
    <div className="bg-[#3198e7bf] w-64 h-full relative">
      <div className="flex items-center justify-center h-16 border-b border-white">
        <h1
          className="text-white text-2xl font-bold cursor-pointer"
          onClick={() => handleNavigate("/dashboard")}
        >
          Ecomm
        </h1>
      </div>
      <nav className="mt-4 text-white">
        <ul className="space-y-2">
          <li>
            <Link
              to="/products"
              className="block hover:bg-gray-200 hover:text-black px-4 py-2"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/myorders"
              className="block hover:bg-gray-200 hover:text-black px-4 py-2"
            >
              My purchases
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/buyers"
              className="block hover:bg-gray-200 hover:text-black px-4 py-2"
            >
              All Users
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="absolute text-white bottom-2 block hover:bg-gray-200 hover:text-black px-4 py-2 w-full text-left"
            >
              <RiLogoutBoxLine className="inline-block mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
