import React, { useState } from "react";

const AddCartForm = ({ addCart, setShowAddForm }) => {
  const initialFormState = {
    id_user: "",
    total_transaksi: "",
    status: "unpaid",
  };
  

  const [cart, setCart] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCart({ ...cart, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cart.id_user || !cart.total_transaksi || !cart.status) {
      console.log("Data incomplete. Cannot add cart.");
      return;
    }
    addCart({
      ...cart,
      id: Date.now(),
      CreatedAt: new Date().toLocaleDateString("en-GB"),
      UpdateAt: new Date().toLocaleDateString("en-GB"),
    });
    setCart(initialFormState);
    setShowAddForm(false); // Mengubah state showAddForm menjadi false
  };

  const handleCancel = () => {
    setShowAddForm(false); // Mengubah state showAddForm menjadi false saat tombol cancel diklik
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Cart</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id_user" className="block mb-2">
            ID User:
            <input
              type="text"
              name="id_user"
              value={cart.id_user}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
          </label>
          <label htmlFor="total_transaksi" className="block mb-2">
            Total Transaksi:
            <input
              type="text"
              name="total_transaksi"
              value={cart.total_transaksi}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
          </label>
          <label htmlFor="status" className="block mb-2">
            Status:
            <select
              name="status"
              value={cart.status}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCartForm;
