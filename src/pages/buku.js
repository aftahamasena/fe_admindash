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
      sortField: "id",
      sortOrder: "asc",
      showModal: false,
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

  sortBukus = (field) => {
    const { bukus, sortOrder } = this.state;
    const sortedBukus = bukus.sort((a, b) => {
      if (a[field] < b[field]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    this.setState({
      bukus: sortedBukus,
      sortField: field,
      sortOrder: sortOrder === "asc" ? "desc" : "asc",
    });
  };

    handleSortByChange = (event) => {
    this.setState({ sortField: event.target.value }, () => {
      this.getBukus(); // Panggil getBukus untuk mengambil data dengan sorting baru
    });
  };

  componentDidMount() {
    this.getBukus();
  }

  render() {
    return (
      <div className="m-3 card text-sm">
        <div className="card-header bg-info text-white">Data Buku</div>
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
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="border px-4 py-2 text-left">
                  <button onClick={() => this.sortBukus("id")}>ID</button>
                </th>
                <th className="border px-4 py-2 text-left">
                  <button onClick={() => this.sortBukus("isbn")}>ISBN</button>
                </th>
                <th className="border px-4 py-2 text-left">
                  <button onClick={() => this.sortBukus("nama_buku")}>
                    Nama Buku
                  </button>
                </th>
                <th className="border px-4 py-2 text-left">
                  <button onClick={() => this.sortBukus("author_buku")}>
                    Author
                  </button>
                </th>
                <th className="border px-4 py-2 text-left">
                  <button onClick={() => this.sortBukus("penerbit_buku")}>
                    Penerbit
                  </button>
                </th>
                <th className="border px-4 py-2 text-left">
                  <button onClick={() => this.sortBukus("kategori_buku")}>
                    Kategori
                  </button>
                </th>
                <th className="border px-4 py-2 text-left">Deskripsi</th>
                <th className="border px-4 py-2 text-left">Cover</th>
                <th className="border px-4 py-2 text-left">
                  <button onClick={() => this.sortBukus("stok_buku")}>Stok</button>
                </th>
                <th className="border px-4 py-2 text-left">
                  <button onClick={() => this.sortBukus("harga_buku")}>Harga</button>
                </th>
                <th className="border px-4 py-2 text-left">Option</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bukus &&
                this.state.bukus.map((buku, index) => (
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                        onClick={() => this.Edit(buku)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => this.Drop(buku.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {this.state.showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div
                  className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <form onSubmit={this.SaveBuku}>
                    <div>
                      <h2 className="text-center font-semibold text-2xl mb-4">
                        Form Buku
                      </h2>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          ISBN
                        </label>
                        <input
                          type="text"
                          className="form-control border rounded-2xl pl-3"
                          name="isbn"
                          value={this.state.isbn}
                          onChange={this.bind}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Nama Buku
                        </label>
                        <input
                          type="text"
                          className="form-control border rounded-2xl pl-3"
                          name="nama_buku"
                          value={this.state.nama_buku}
                          onChange={this.bind}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          className="form-control border rounded-2xl pl-3"
                          name="author_buku"
                          value={this.state.author_buku}
                          onChange={this.bind}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Penerbit
                        </label>
                        <input
                          type="text"
                          className="form-control border rounded-2xl pl-3"
                          name="penerbit_buku"
                          value={this.state.penerbit_buku}
                          onChange={this.bind}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Kategori
                        </label>
                        <input
                          type="text"
                          className="form-control border rounded-2xl pl-3"
                          name="kategori_buku"
                          value={this.state.kategori_buku}
                          onChange={this.bind}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Deskripsi
                        </label>
                        <textarea
                          className="form-control border rounded-2xl pl-3"
                          name="deskripsi_buku"
                          value={this.state.deskripsi_buku}
                          onChange={this.bind}
                          required
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Cover
                        </label>
                        <input
                          type="file"
                          className="form-control border rounded-2xl pl-3"
                          name="cover_buku"
                          onChange={this.bind}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Stok
                        </label>
                        <input
                          type="number"
                          className="form-control border rounded-2xl pl-3"
                          name="stok_buku"
                          value={this.state.stok_buku}
                          onChange={this.bind}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Harga
                        </label>
                        <input
                          type="number"
                          className="form-control border rounded-2xl pl-3"
                          name="harga_buku"
                          value={this.state.harga_buku}
                          onChange={this.bind}
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          Simpan
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => this.setState({ showModal: false })}
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Buku;
