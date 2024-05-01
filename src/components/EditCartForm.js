import React, { useState } from "react";

const EditCartForm = ({ cart, updateCart, setEditing }) => {
  const [updatedCart, setUpdatedCart] = useState(cart);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCart({ ...updatedCart, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCart(cart.id, updatedCart);
    setEditing(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Cart</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id_user" className="block mb-2">
            ID User:
            <input
              type="text"
              name="id_user"
              value={updatedCart.id_user}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
          </label>
          <label htmlFor="total_transaksi" className="block mb-2">
            Total Transaksi:
            <input
              type="text"
              name="total_transaksi"
              value={updatedCart.total_transaksi}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
          </label>
          <label htmlFor="status" className="block mb-2">
            Status:
            <select
              name="status"
              value={updatedCart.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCartForm;
