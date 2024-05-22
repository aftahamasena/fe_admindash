import React from "react";
import loginImg from "../assets/login.jpeg";
import google from "../assets/google.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// import { user } from "../component/data";
// import md5 from "md5";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username_user: "",
      password_user: "",
      loggedUser: [],
    };
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  backPage = () => {
    window.location.href = "/user-adm";
  };

login = (event) => {
  event.preventDefault();
  let url = "http://localhost:5000/auth/login";
  let credentials = {
    username_user: this.state.username_user,
    password_user: this.state.password_user,
  };

  axios
    .post(url, credentials)
    .then((response) => {
      if (response.data.logged) {
        localStorage.setItem("token", response.data.tkn);
        alert("Login successful");
        window.location = "/user-adm"; // Redirect to home or desired page
      } else {
        alert("Login failed: " + response.data.message);
      }
    })
    .catch((error) => {
      console.error("Login error: ", error);
    });
};
z

  render() {
    return (
      <div className="p-5 flex-col">
        <button
          className=" w-max p-4 rounded-lg shadow-lg mb-5"
          onClick={this.backPage}
        >
          <FaArrowLeft />
        </button>
        <div className="flex justify-center">
          <img src={loginImg} alt="loginPic" className="rounded-lg w-1/2" />
          {/*bagian kanan*/}
          <div className="w-auto mx-5 ">
            <div className="p-10 text-center">
              {/* nama website */}
              <p className="bg-blue-300 mb-20">
                BUKU <span className=" text-orange-300">KU</span>
              </p>
              {/* header */}
              <p className="font-bold text-4xl">Login Page</p>
              <p>
                lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
                ipsum
              </p>
              <form>
                {/* input email */}
                <div className="my-5 text-left">
                  <p className="mb-3 font-bold">Nama User</p>
                  <input
                    type="text"
                    value={this.state.username_user}
                    onChange={(ev) =>
                      this.setState({ username_user: ev.target.value })
                    }
                    className="w-full border-2 border-[#E5E5E5] p-3 rounded-lg"
                  />
                </div>
                {/* input password */}
                <div className="my-5 text-left">
                  <p className="mb-3 font-bold">Password</p>
                  <input
                    type="password"
                    value={this.state.password_user}
                    onChange={(ev) =>
                      this.setState({ password_user: ev.target.value })
                    }
                    className="w-full border-2 border-[#E5E5E5] p-3 rounded-lg"
                  />
                </div>
              </form>
              <div className="flex justify-between mb-5">
                {/* remember me */}
                <div className="flex">
                  <input type="checkbox" className="mr-1" />
                  <p className="font-bold">Remember Me</p>
                </div>
                {/*forget pass*/}
                <p className="font-bold">Forget Password?</p>
              </div>
              {/*sign in*/}
              <button
                onClick={this.login}
                className="bg-[#3B82F6] w-full p-3 rounded-lg mb-5"
              >
                <p className="text-white ">Sign In</p>
              </button>
              {/*sign google*/}
              <button className="border-2 border-[#E5E5E5] w-full p-3 rounded-lg">
                <div className="flex justify-center">
                  <img src={google} alt="Google icon" className="w-6 mr-1" />
                  <p className="">Login With Google</p>
                </div>
              </button>
            </div>
            <div className="flex justify-center">
              <p className="mt-5 text-center">Don't Have Account? </p>
              <Link to="/Regis" className=" font-bold h-max mt-auto ml-2">
                {" "}
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
