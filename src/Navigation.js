import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./assets/logo.png";
import Profile from "./assets/profile.png";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Only render the navigation if the current path is not /login
  if (location.pathname === "/login") {
    return null;
  }

  const handleSignOut = () => {
    localStorage.clear(); // Menghapus semua item dari local storage
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow-lg">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-10 ml-5" />
        <a className="font-bold text-lg ml-3 text-blue-500">
          Toko
          <span className="text-blue-800">Buku.Id</span>
        </a>
      </div>
      <div className="flex items-center">
        <div className="" />
        <div className="flex items-center">
          <button className="flex items-center text-black">
            <img
              src={Profile}
              className="h-8 w-8 rounded-full mr-2"
              alt="Profile"
            />
            <span className="mr-4">Admin Mode</span>
          </button>
          <div className="border-l border-gray-300">
            <button
              className=" ml-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
