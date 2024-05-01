import React, { useState } from "react";
import AddCartForm from "../components/AddCartForm";
import EditCartForm from "../components/EditCartForm";
import axios from "axios";

const initialFormState = {
  id: null,
  id_user: "",
  total_transaksi: "",
  status: "unpaid",
  CreatedAt: "",
  UpdateAt: "",
};

const CartTable = () => {
  const [carts, setCarts] = useState([
    {
      id: 135412313,
      id_user: "1",
      total_transaksi: "1000000",
      status: "paid",
      CreatedAt: "22/03/2024",
      UpdateAt: "22/03/2024",
    },
  ]);
  const [editing, setEditing] = useState(false);
  const [currentCart, setCurrentCart] = useState(initialFormState);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState(""); // State untuk menyimpan pilihan sort by
  const [sortOrder, setSortOrder] = useState("asc"); // State untuk menyimpan urutan sort

  const addCart = (cart) => {
    setCarts([...carts, cart]);
    setShowAddForm(false);
  };

  const deleteCart = (id) => {
    setCarts(carts.filter((cart) => cart.id !== id));
  };

  const editCart = (id, updatedCart) => {
    setCarts(carts.map((cart) => (cart.id === id ? updatedCart : cart)));
  };

  const editCartItem = (cart) => {
    setEditing(true);
    setCurrentCart({
      id: cart.id,
      id_user: cart.id_user,
      total_transaksi: cart.total_transaksi,
      status: cart.status,
      CreatedAt: cart.CreatedAt,
      UpdateAt: cart.UpdateAt,
    });
  };

  const search = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrder = () => {
    setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
  };

  // Fungsi untuk mengurutkan data berdasarkan sortBy dan sortOrder
  const sortCarts = (a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "id":
        comparison = a.id - b.id;
        break;
      case "id_user":
        comparison = parseInt(a.id_user) - parseInt(b.id_user);
        break;
      case "total_transaksi":
        comparison = parseInt(a.total_transaksi) - parseInt(b.total_transaksi);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      case "CreatedAt":
        comparison = new Date(a.CreatedAt) - new Date(b.CreatedAt);
        break;
      case "UpdateAt":
        comparison = new Date(a.UpdateAt) - new Date(b.UpdateAt);
        break;
      default:
        break;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  };

  const filteredCarts = carts
    .filter((cart) =>
      cart.id_user.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(sortCarts); // Mengurutkan hasil filter

  return (
    <div className="p-5 text-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Carts Administration
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          Tabel daftar dan CRUD keranjang user
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-start">
          <input
            type="text"
            placeholder="Search by ID"
            onChange={search}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex-start ml-4">
            <div>
              <span className="mr-2">Sort by:</span>
              <select
                value={sortBy}
                onChange={handleSortBy}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">None</option>
                <option value="id">ID</option>
                <option value="id_user">ID User</option>
                <option value="total_transaksi">Total Transaksi</option>
                <option value="status">Status</option>
                <option value="CreatedAt">CreatedAt</option>
                <option value="UpdateAt">UpdateAt</option>
              </select>
              <button
                onClick={handleSortOrder}
                className="text-blue-500 font-bold focus:outline-none ml-2"
              >
                {sortOrder === "asc" ? "\u25B2" : "\u25BC"}
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Add Cart
          </button>
        </div>
      </div>
      <table className="w-full border-collapse border-t-2 border-b-2 border-gray-200">
        <thead className="bg-blue-900">
          <tr>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              ID
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              ID User
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              Total Transaksi
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              Status
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              CreatedAt
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              UpdateAt
            </th>
            <th className="px-4 py-2 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCarts.map((cart, index) => (
            <tr
              key={cart.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="text-center px-4 py-2">{cart.id}</td>
              <td className="text-center px-4 py-2">{cart.id_user}</td>

              <td className="text-center px-4 py-2">{cart.total_transaksi}</td>
              <td className="text-center px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full ${
                    cart.status === "paid"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {cart.status}
                </span>
              </td>
              <td className="text-center px-4 py-2">{cart.CreatedAt}</td>
              <td className="text-center px-4 py-2">{cart.UpdateAt}</td>
              <td className="text-center px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => editCartItem(cart)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteCart(cart.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <EditCartForm
            cart={currentCart}
            updateCart={(id, updatedCart) => {
              editCart(id, updatedCart);
              setEditing(false);
            }}
            setEditing={setEditing} // Sediakan prop setEditing
          />
        </div>
      )}
      {showAddForm && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <AddCartForm
            addCart={(newCart) => {
              addCart(newCart);
            }}
            setShowAddForm={setShowAddForm} // Sediakan prop setShowAddForm
          />
        </div>
      )}
    </div>
  );
};

export default CartTable;
