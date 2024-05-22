import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import CustomLink from "./CustomLink";

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  return (
    <div className="flex h-screen">
      {!isLoginRoute && <Sidebar />}
      <Content />
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="w-1/6 bg-gray-800 text-white">
      <div className="p-4 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4 mt-2.5 text-md">Menu</h2>
          <nav className="text-sm">
            <ul>
              <li className="py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-700">
                <Link to="/user-adm" className="block">
                  Admninistrasi User
                </Link>
              </li>
              <li className="py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-700">
                <Link to="/item-adm" className="block">
                  Administrasi Buku
                </Link>
              </li>
              <li className="py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-700">
                <Link to="/cart-adm" className="block">
                  Administrasi Keranjang
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}

function Content() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  return (
    <main className="w-full flex flex-col">
      <div className="">{!isLoginRoute && <Navigation />}</div>
      <div className="">
        <CustomLink />
      </div>
    </main>
  );
}

export default App;
