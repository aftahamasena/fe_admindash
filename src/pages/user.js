import React, { Component } from "react";
import axios from "axios";

class User extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      id: "",
      nama_user: "",
      jk_user: "",
      alamat_user: "",
      telepon_user: "",
      username_user: "",
      password_user: "",
      role_user: "",
      action: "",
      search: "",
      showModal: false,
      sortBy: "",
      sortOrder: "asc",
    };
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Add = () => {
    this.setState({
      id: "",
      nama_user: "",
      jk_user: "",
      alamat_user: "",
      telepon_user: "",
      username_user: "",
      password_user: "",
      role_user: "",
      action: "insert",
      showModal: true,
    });
  };

  Drop = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      axios
        .delete(`http://localhost:5000/user/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          alert(response.data.message);
          this.getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  SaveUser = (event) => {
    event.preventDefault();
    let url = "";
    let form = {
      id: this.state.id,
      nama_user: this.state.nama_user,
      jk_user: this.state.jk_user,
      alamat_user: this.state.alamat_user,
      telepon_user: this.state.telepon_user,
      username_user: this.state.username_user,
      password_user: this.state.password_user,
      role_user: this.state.role_user,
    };

    if (this.state.action === "insert") {
      url = "http://localhost:5000/user/add";
      axios
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          alert(response.data.message);
          this.getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    this.setState({
      action: "",
      id: "",
      nama_user: "",
      jk_user: "",
      alamat_user: "",
      telepon_user: "",
      username_user: "",
      password_user: "",
      role_user: "",
      showModal: false,
    });
  };

  getUsers = () => {
    let url = "http://localhost:5000/user/getall";
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({ users: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  findUser = (key) => {
    let url = `http://localhost:5000/user/find/${key}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.setState({ users: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      alert("Please login first");
      window.location = "/login";
    } else {
      this.getUsers();
    }
  }

  handleSortBy = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  handleSortOrder = () => {
    this.setState((prevState) => ({
      sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  sortUsers = (a, b) => {
    let comparison = 0;
    switch (this.state.sortBy) {
      case "id":
        comparison = a.id - b.id;
        break;
      case "nama_user":
        comparison = a.nama_user.localeCompare(b.nama_user);
        break;
      case "jk_user":
        comparison = a.jk_user.localeCompare(b.jk_user);
        break;
      case "alamat_user":
        comparison = a.alamat_user.localeCompare(b.alamat_user);
        break;
      case "telepon_user":
        comparison = a.telepon_user.localeCompare(b.telepon_user);
        break;
      case "username_user":
        comparison = a.username_user.localeCompare(b.username_user);
        break;
      case "role_user":
        comparison = a.role_user.localeCompare(b.role_user);
        break;
      default:
        break;
    }
    return this.state.sortOrder === "asc" ? comparison : -comparison;
  };

  render() {
    const sortedUsers = [...this.state.users].sort(this.sortUsers);

    return (
      <div className="m-3 card text-sm">
        <div className="card-header bg-info text-white">Data User</div>
        <div className="card-body">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Users Administration
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Tabel daftar dan CRUD data user
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <input
              type="text"
              className="form-control border rounded-2xl pl-3"
              name="search"
              value={this.state.search}
              onChange={this.bind}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  this.findUser(this.state.search);
                }
              }}
              placeholder="Pencarian..."
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={this.Add}
            >
              Tambah Data
            </button>
          </div>
          <div className="flex justify-start mb-2">
            <span className="mr-2">Sort by:</span>
            <select
              value={this.state.sortBy}
              onChange={this.handleSortBy}
              className="form-control border rounded-2xl pl-3"
            >
              <option value="">None</option>
              <option value="id">ID</option>
              <option value="nama_user">Nama</option>
              <option value="jk_user">Jenis Kelamin</option>
              <option value="alamat_user">Alamat</option>
              <option value="telepon_user">Telepon</option>
              <option value="username_user">Username</option>
              <option value="role_user">Role</option>
            </select>
            <button
              onClick={this.handleSortOrder}
              className="ml-2 text-blue-500 font-bold focus:outline-none"
            >
              {this.state.sortOrder === "asc" ? "▲" : "▼"}
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Nama</th>
                <th className="border px-4 py-2 text-left">Jenis Kelamin</th>
                <th className="border px-4 py-2 text-left">Alamat</th>
                <th className="border px-4 py-2 text-left">Telepon</th>
                <th className="border px-4 py-2 text-left">Username</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.nama_user}</td>
                  <td className="border px-4 py-2">{user.jk_user}</td>
                  <td className="border px-4 py-2">{user.alamat_user}</td>
                  <td className="border px-4 py-2">{user.telepon_user}</td>
                  <td className="border px-4 py-2">{user.username_user}</td>
                  <td className="border px-4 py-2">{user.role_user}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => this.Drop(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {this.state.showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => this.setState({ showModal: false })}>
                  &times;
                </span>
                <form onSubmit={this.SaveUser}>
                  <div className="form-group">
                    <label>ID</label>
                    <input
                      type="text"
                      name="id"
                      value={this.state.id}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nama</label>
                    <input
                      type="text"
                      name="nama_user"
                      value={this.state.nama_user}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Jenis Kelamin</label>
                    <input
                      type="text"
                      name="jk_user"
                      value={this.state.jk_user}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Alamat</label>
                    <input
                      type="text"
                      name="alamat_user"
                      value={this.state.alamat_user}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Telepon</label>
                    <input
                      type="text"
                      name="telepon_user"
                      value={this.state.telepon_user}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username_user"
                      value={this.state.username_user}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password_user"
                      value={this.state.password_user}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      name="role_user"
                      value={this.state.role_user}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default User;
