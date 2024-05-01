import React, { useState } from "react";
import Logo from "./assets/logo.png";
import Profile from "./assets/profile.jpg";
import Notif from "./assets/notif-btn.png";

function Navigation() {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

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
        <div
          className="relative mr-4"
          onMouseEnter={() => setShowNotification(true)}
          onMouseLeave={() => setShowNotification(false)}
        >
          <button className="text-black">
            <img src={Notif} className="h-5 mt-1"></img>
          </button>
          {showNotification && (
            <div
              className="absolute right-0 mt-2 bg-white p-2 rounded shadow-md"
              onMouseEnter={() => setShowNotification(true)}
              onMouseLeave={() => setShowNotification(false)}
              style={{ width: "150px", wordWrap: "break-word" }}
            >
              Notification 1
              <br />
              Notification 2
            </div>
          )}
        </div>
        <div className="h-8 border-l border-gray-300 mr-7 ml-2" />
        <div
          className="relative"
          onMouseEnter={() => setShowProfileOptions(true)}
          onMouseLeave={() => setShowProfileOptions(false)}
        >
          <button className="flex items-center text-black">
            <img src={Profile} className="h-8 w-8 rounded-full mr-2" />
            <span className="mr-5">SenaTzy</span>
          </button>
          {showProfileOptions && (
            <div
              className="absolute right-0 mt-2 bg-white p-2 rounded shadow-md"
              onMouseEnter={() => setShowProfileOptions(true)}
              onMouseLeave={() => setShowProfileOptions(false)}
            >
              <button className="block w-full text-left hover:bg-gray-200 p-1 mr-20">
                Edit Profile
              </button>
              <button className="block w-full text-left hover:bg-gray-200 p-1 mr-20">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
