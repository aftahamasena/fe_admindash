import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import CustomLink from "./CustomLink";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-800 text-white">
          <div className="p-4 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4 mt-2.5">Menu</h2>
              <nav className="text-md">
                <ul>
                  <li className="py-2 border-b border-gray-700 mt  cursor-pointer hover:bg-gray-700">
                    <Link to="/" className="block">
                      Dashboard
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-700">
                    <Link to="/user-adm" className="block">
                      User Administration
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-700  cursor-pointer hover:bg-gray-700">
                    <Link to="/item-adm" className="block">
                      Item Administration
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-700  cursor-pointer hover:bg-gray-700">
                    <Link to="/cart-adm" className="block">
                     Cart Administration
                    </Link>
                  </li>
                  <li className="py-2 border-b border-gray-700  cursor-pointer hover:bg-gray-700">
                    <Link to="/transaction-adm" className="block">
                      Transaction Administration
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="text-sm ml-2">
              <ul>
                <li className="py-1  cursor-pointer ">
                  <Link to="/report" className="block">
                    Report
                  </Link>
                </li>
                <li className="py-1  cursor-pointer ">
                  <Link to="/setting" className="block">
                    Setting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        {/* Content */}
        <main className="w-full flex flex-col">
          <div className="">
            <Navigation />
          </div>
          <div className="">
            <CustomLink />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
