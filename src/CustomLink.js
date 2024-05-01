import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import User from "./pages/user";
import Item from "./pages/item";
import Cart from "./pages/cart";
import Transaction from "./pages/transaction";
import Report from "./pages/report";
import Setting from "./pages/setting";

class CustomLink extends React.Component {
  render() {
    return (
      <div className="m-10">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/user-adm" element={<User />} />
          <Route exact path="/item-adm" element={<Item />} />
          <Route exact path="/cart-adm" element={<Cart />} />
          <Route exact path="/transaction-adm" element={<Transaction />} />
          <Route exact path="/report" element={<Report />} />
          <Route exact path="/setting" element={<Setting />} />
        </Routes>
      </div>
    );
  }
}

export default CustomLink;
