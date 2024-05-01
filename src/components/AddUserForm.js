import React, { useState } from "react";

const AddUserForm = ({ addUser, setShowAddForm }) => {
  const initialFormState = {
    id: null,
    nama: "",
    jenis_kelamin: "",
    alamat: "",
    telepon: "",
    username: "",
    password: "",
    createAt: new Date().toLocaleDateString("en-GB"),
    UpdateAt: new Date().toLocaleDateString("en-GB"),
  };

  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !user.nama ||
      !user.jenis_kelamin ||
      !user.alamat ||
      !user.telepon ||
      !user.username ||
      !user.password
    ) {
      console.log("Data incomplete. Cannot add user.");
      return;
    }
    addUser({
      ...user,
      id: Date.now(),
    });
    setUser(initialFormState);
    setShowAddForm(false); // Mengubah state showAddForm menjadi false
  };

  const handleCancel = () => {
    setShowAddForm(false); // Mengubah state showAddForm menjadi false saat tombol cancel diklik
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nama" className="block mb-2">
            Nama:
            <input
              type="text"
              name="nama"
              value={user.nama}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
          </label>
          <label htmlFor="jenis_kelamin" className="block mb-2">
            Jenis Kelamin:
            <select
              name="jenis_kelamin"
              value={user.jenis_kelamin}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </label>
          <label htmlFor="alamat" className="block mb-2">
            Alamat:
            <input
              type="text"
              name="alamat"
              value={user.alamat}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
          </label>
          <label htmlFor="telepon" className="block mb-2">
            Telepon:
            <input
              type="text"
              name="telepon"
              value={user.telepon}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
          </label>
          <label htmlFor="username" className="block mb-2">
            Username:
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
          </label>
          <label htmlFor="password" className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none w-full"
            />
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

export default AddUserForm;
