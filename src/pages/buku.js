import React, { Component } from "react";
import axios from "axios";

class Buku extends Component {
  constructor() {
    super();
    this.state = {
      bukus: [],
      id: "",
      isbn: "",
      nama_buku: "",
      author_buku: "",
      penerbit_buku: "",
      kategori_buku: "",
      deskripsi_buku: "",
      cover_buku: null,
      stok_buku: "",
      harga_buku: "",
      action: "",
      search: "",
      showModal: false,
      sortBy: "",
      sortOrder: "asc",
    };
  }

  bind = (event) => {
    if (event.target.name === "cover_buku") {
      this.setState({ cover_buku: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  Add = () => {
    this.setState({
      id: "",
      isbn: "",
      nama_buku: "",
      author_buku: "",
      penerbit_buku: "",
      kategori_buku: "",
      deskripsi_buku: "",
      cover_buku: null,
      stok_buku: "",
      harga_buku: "",
      action: "insert",
      showModal: true,
    });
  };

  Edit = (item) => {
    this.setState({
      id: item.id,
      isbn: item.isbn,
      nama_buku: item.nama_buku,
      author_buku: item.author_buku,
      penerbit_buku: item.penerbit_buku,
      kategori_buku: item.kategori_buku,
      deskripsi_buku: item.deskripsi_buku,
      cover_buku: item.cover_buku,
      stok_buku: item.stok_buku,
      harga_buku: item.harga_buku,
      action: "update",
      showModal: true,
    });
  };

  Drop = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      axios
        .delete(`http://localhost:5000/buku/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          alert(response.data.message);
          this.getBukus();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  SaveBuku = (event) => {
    event.preventDefault();
    let url = "";
    const formData = new FormData();

    formData.append("id", this.state.id);
    formData.append("isbn", this.state.isbn);
    formData.append("nama_buku", this.state.nama_buku);
    formData.append("author_buku", this.state.author_buku);
    formData.append("penerbit_buku", this.state.penerbit_buku);
    formData.append("kategori_buku", this.state.kategori_buku);
    formData.append("deskripsi_buku", this.state.deskripsi_buku);
    formData.append("cover_buku", this.state.cover_buku);
    formData.append("stok_buku", this.state.stok_buku);
    formData.append("harga_buku", this.state.harga_buku);

    if (this.state.action === "insert") {
      url = "http://localhost:5000/buku/add";
      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data.message);
          this.getBukus();
        })
        .catch((error) => {
          console.error("Error saat mengirim request:", error);
        });
    } else if (this.state.action === "update") {
      url = `http://localhost:5000/buku/${this.state.id}`;
      axios
        .put(url, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data.message);
          this.getBukus();
        })
        .catch((error) => {
          console.error("Error saat mengirim request:", error);
        });
    }

    this.setState({
      action: "",
      id: "",
      isbn: "",
      nama_buku: "",
      author_buku: "",
      penerbit_buku: "",
      kategori_buku: "",
      deskripsi_buku: "",
      cover_buku: null,
      stok_buku: "",
      harga_buku: "",
      showModal: false,
    });
  };

  getBukus = () => {
    let url = "http://localhost:5000/buku/getAll";
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.setState({ bukus: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  findBuku = (key) => {
    let url = `http://localhost:5000/buku/${key}`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.setState({ bukus: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getBukus();
  }

  handleSortBy = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  handleSortOrder = () => {
    this.setState((prevState) => ({
      sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  sortBukus = (a, b) => {
    let comparison = 0;
    switch (this.state.sortBy) {
      case "id":
        comparison = a.id - b.id;
        break;
      case "isbn":
        comparison = a.isbn.localeCompare(b.isbn);
        break;
      case "nama_buku":
        comparison = a.nama_buku.localeCompare(b.nama_buku);
        break;
      case "author_buku":
        comparison = a.author_buku.localeCompare(b.author_buku);
        break;
      case "penerbit_buku":
        comparison = a.penerbit_buku.localeCompare(b.penerbit_buku);
        break;
      case "kategori_buku":
        comparison = a.kategori_buku.localeCompare(b.kategori_buku);
        break;
      case "stok_buku":
        comparison = a.stok_buku.localeCompare(b.stok_buku);
        break;
      case "harga_buku":
        comparison = a.harga_buku.localeCompare(b.harga_buku);
        break;
      default:
        break;
    }
    return this.state.sortOrder === "asc" ? comparison : -comparison;
  };

  render() {
    const sortedBukus = [...this.state.bukus].sort(this.sortBukus);

    return (
      <div className="m-3 card text-sm">
        <div className="card-header bg-info text-white">Data Buku</div>
        <div className="card-body">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Administrasi Buku
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Tabel daftar dan CRUD data buku
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
                  this.findBuku(this.state.search);
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
              <option value="isbn">ISBN</option>
              <option value="nama_buku">Nama Buku</option>
              <option value="author_buku">Author</option>
              <option value="penerbit_buku">Penerbit</option>
              <option value="kategori_buku">Kategori</option>
              <option value="stok_buku">Stok</option>
              <option value="harga_buku">Harga</option>
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
                <th className="border px-4 py-2 text-left">ISBN</th>
                <th className="border px-4 py-2 text-left">Nama Buku</th>
                <th className="border px-4 py-2 text-left">Author</th>
                <th className="border px-4 py-2 text-left">Penerbit</th>
                <th className="border px-4 py-2 text-left">Kategori</th>
                <th className="border px-4 py-2 text-left">Deskripsi</th>
                <th className="border px-4 py-2 text-left">Cover</th>
                <th className="border px-4 py-2 text-left">Stok</th>
                <th className="border px-4 py-2 text-left">Harga</th>
                <th className="border px-4 py-2 text-left">Option</th>
              </tr>
            </thead>
            <tbody>
              {sortedBukus.map((buku, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="border px-4 py-2">{buku.id}</td>
                  <td className="border px-4 py-2">{buku.isbn}</td>
                  <td className="border px-4 py-2">{buku.nama_buku}</td>
                  <td className="border px-4 py-2">{buku.author_buku}</td>
                  <td className="border px-4 py-2">{buku.penerbit_buku}</td>
                  <td className="border px-4 py-2">{buku.kategori_buku}</td>
                  <td className="border px-4 py-2">{buku.deskripsi_buku}</td>
                  <td className="border px-4 py-2">{buku.cover_buku}</td>
                  <td className="border px-4 py-2">{buku.stok_buku}</td>
                  <td className="border px-4 py-2">{buku.harga_buku}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2 mb-1 px-6"
                      onClick={() => this.Edit(buku)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => this.Drop(buku.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {this.state.showModal && (
            <div
              className="modal fixed inset-0 flex items-center justify-center z-50"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-content bg-white w-1/2 p-5 rounded-xl">
                <h5 className="modal-title text-lg font-bold mb-3">
                  Form Buku
                </h5>
                <form onSubmit={this.SaveBuku}>
                  <div className="form-group mb-3">
                    <label>ISBN</label>
                    <input
                      type="text"
                      className="form-control border rounded-lg pl-3 py-1 w-full"
                      name="isbn"
                      value={this.state.isbn}
                      onChange={this.bind}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Nama Buku</label>
                    <input
                      type="text"
                      className="form-control border rounded-lg pl-3 py-1 w-full"
                      name="nama_buku"
                      value={this.state.nama_buku}
                      onChange={this.bind}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Author</label>
                    <input
                      type="text"
                      className="form-control border rounded-lg pl-3 py-1 w-full"
                      name="author_buku"
                      value={this.state.author_buku}
                      onChange={this.bind}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Penerbit</label>
                    <input
                      type="text"
                      className="form-control border rounded-lg pl-3 py-1 w-full"
                      name="penerbit_buku"
                      value={this.state.penerbit_buku}
                      onChange={this.bind}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Kategori</label>
                    <input
                      type="text"
                      className="form-control border rounded-lg pl-3 py-1 w-full"
                      name="kategori_buku"
                      value={this.state.kategori_buku}
                      onChange={this.bind}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Deskripsi</label>
                    <textarea
                      className="form-control border rounded-lg pl-3 py-1 w-full"
                      name="deskripsi_buku"
                      value={this.state.deskripsi_buku}
                      onChange={this.bind}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label>Cover</label>
                    <input
                      type="file"
                      className="form-control"
                      name="cover_buku"
                      onChange={this.bind}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Stok</label>
                    <input
                      type="number"
                      className="form-control border rounded-lg pl-3 py-1 w-full"
                      name="stok_buku"
                      value={this.state.stok_buku}
                      onChange={this.bind}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Harga</label>
                    <input
                      type="number"
                      className="form-control border rounded-lg pl-3 py-1 w-full"
                      name="harga_buku"
                      value={this.state.harga_buku}
                      onChange={this.bind}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full"
                    onClick={() => this.setState({ showModal: false })}
                  >
                    Batal
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

export default Buku;
