import React, { Component } from "react";
import axios from "axios";

class carts extends Component {
  constructor() {
    super();
    this.state = {
      carts: null,
      cartsDetails: [], // Untuk menyimpan detail keranjang
    };
  }

  componentDidMount() {
    this.getKeranjang();
  }

  getKeranjang = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }

    axios
      .get(`http://localhost:5000/keranjang/getKeranjang`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.succes) {
          const { keranjang, data } = response.data;
          this.setState({
            carts: keranjang,
            cartsDetails: data,
          });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { carts, cartsDetails } = this.state;

    return (
      <div className="m-3 card text-sm">
        <div className="card-header bg-info text-white">Data Keranjang</div>
        <div className="card-body">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Administrasi Buku
            </h2>
            <p className="text-sm text-gray-500 mb-2">Tabel daftar data Buku</p>
          </div>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="border px-4 py-2 text-left">ID Keranjang</th>
                <th className="border px-4 py-2 text-left">ID User</th>
                <th className="border px-4 py-2 text-left">Total Transaksi</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">ID Buku</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {carts ? (
                cartsDetails.length > 0 ? (
                  cartsDetails.map((detail, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{carts.id}</td>
                      <td className="border px-4 py-2">{carts.id_user}</td>
                      <td className="border px-4 py-2">
                        {carts.total_transaksi}
                      </td>
                      <td className="border px-4 py-2">{carts.status}</td>
                      <td className="border px-4 py-2">{detail.id_buku}</td>
                      <td className="border px-4 py-2">{detail.qty}</td>
                      <td className="border px-4 py-2">{detail.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="border px-4 py-2 text-center">
                      No detail available
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="7" className="border px-4 py-2 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default carts;
