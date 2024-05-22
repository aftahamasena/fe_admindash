import React from "react";
import { Routes, Route } from "react-router-dom";

import User from "./pages/user";
import Item from "./pages/buku";
import Cart from "./pages/cart";
import Login from "./pages/login";

class CustomLink extends React.Component {
  render() {
    return (
      <div className="m-10">
        <Routes>
          <Route exact path="/user-adm" element={<User />} />
          <Route exact path="/item-adm" element={<Item />} />
          <Route exact path="/cart-adm" element={<Cart />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default CustomLink;
