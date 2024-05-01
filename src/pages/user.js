import React, { useState } from "react";
// import $ from 'jquery';
import AddUserForm from "../components/AddUserForm";
import EditUserForm from "../components/EditUserForm";
import axios from "axios";

const initialFormState = {
  id: null,
  nama: "",
  jenis_kelamin: "",
  alamat: "",
  telepon: "",
  username: "",
  password: "",
  createAt: "",
  UpdateAt: "",
};

const UserTable = () => {
  const [users, setUsers] = useState([
    {
      user: [],
      id: null,
      nama: "",
      jenis_kelamin: "",
      alamat: "",
      telepon: "",
      username: "",
      password: "",
      createAt: "",
      UpdateAt: "",
    },
  ]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState(""); // State untuk menyimpan pilihan sort by
  const [sortOrder, setSortOrder] = useState("asc"); // State untuk menyimpan urutan sort

  const addUser = (user) => {
    setUsers([...users, user]);
    setShowAddForm(false);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (id, updatedUser) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const editUserItem = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      nama: user.nama,
      jenis_kelamin: user.jenis_kelamin,
      alamat: user.alamat,
      telepon: user.telepon,
      username: user.username,
      password: user.password,
      createAt: user.createAt,
      UpdateAt: user.UpdateAt,
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
  const sortUsers = (a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "id":
        comparison = a.id - b.id;
        break;
      case "nama":
        comparison = a.nama.localeCompare(b.nama);
        break;
      case "jenis_kelamin":
        comparison = a.jenis_kelamin.localeCompare(b.jenis_kelamin);
        break;
      case "alamat":
        comparison = a.alamat.localeCompare(b.alamat);
        break;
      case "telepon":
        comparison = a.telepon.localeCompare(b.telepon);
        break;
      case "username":
        comparison = a.username.localeCompare(b.username);
        break;
      case "createAt":
        comparison = new Date(a.createAt) - new Date(b.createAt);
        break;
      case "UpdateAt":
        comparison = new Date(a.UpdateAt) - new Date(b.UpdateAt);
        break;
      default:
        break;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  };

  const filteredUsers = users
    .filter((user) =>
      user.nama.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(sortUsers); // Mengurutkan hasil filter

  return (
    <div className="p-5 text-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Users Administration
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          Tabel daftar dan CRUD data user
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-start">
          <input
            type="text"
            placeholder="Search by Name"
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
                <option value="nama">Nama</option>
                <option value="jenis_kelamin">Jenis Kelamin</option>
                <option value="alamat">Alamat</option>
                <option value="telepon">Telepon</option>
                <option value="username">Username</option>
                <option value="createAt">CreateAt</option>
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
            Add User
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
              Nama
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              Jenis Kelamin
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              Alamat
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              Telepon
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              Username
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              CreateAt
            </th>
            <th className="border-r border-gray-200 px-4 py-2 text-white">
              UpdateAt
            </th>
            <th className="px-4 py-2 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="text-center px-4 py-2">{user.id}</td>
              <td className="text-center px-4 py-2">{user.nama}</td>
              <td className="text-center px-4 py-2">{user.jenis_kelamin}</td>
              <td className="text-center px-4 py-2">{user.alamat}</td>
              <td className="text-center px-4 py-2">{user.telepon}</td>
              <td className="text-center px-4 py-2">{user.username}</td>
              <td className="text-center px-4 py-2">{user.createAt}</td>
              <td className="text-center px-4 py-2">{user.UpdateAt}</td>
              <td className="text-center px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => editUserItem(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteUser(user.id)}
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
          <EditUserForm
            user={currentUser}
            updateUser={(id, updatedUser) => {
              editUser(id, updatedUser);
              setEditing(false);
            }}
            setEditing={setEditing} // Sediakan prop setEditing
          />
        </div>
      )}
      {showAddForm && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <AddUserForm
            addUser={(newUser) => {
              addUser(newUser);
            }}
            setShowAddForm={setShowAddForm} // Sediakan prop setShowAddForm
          />
        </div>
      )}
    </div>
  );

  // const getUser = () => {
  //   let url = "http://localhost:5000/user/getall" 
  //   axios.get(url)

  // .then(res => {
  //   this.setState  })  
  // }
};

export default UserTable;
