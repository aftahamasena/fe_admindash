import React from "react";
import { Routes, Route } from "react-router-dom";

import User from "./pages/user";
import Item from "./pages/buku";
import Cart from "./pages/cart";
import Login from "./pages/login";
import ProtectedRoutes from "./components/protected";
import Navigation from "./Navigation";
import Sidebar from "./sidebar";

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navigation />
        <main className="flex-1 p-4">
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/user-adm" element={<User />} />
              <Route exact path="/item-adm" element={<Item />} />
              <Route exact path="/cart-adm" element={<Cart />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
