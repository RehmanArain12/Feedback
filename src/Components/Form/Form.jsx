import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../Global";
import { errornotify, successnotify } from "../Toastify/Toastify";
import logo from "../../assets/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Form = () => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const loginHandler = (objsend) => {
    axios
      .post(`${API_URL}/signin`, objsend)
      .then((res) => {
        setEmail("");
        setPassword("");
        successnotify(res.data.message);
        localStorage.setItem("isAuthenticated", res.data.token);
        navigate("/Admin_panel");
      })
      .catch((error) => {
        errornotify(error.response.data.message);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      errornotify("Required Feild Are Missing");
      return;
    }
    const objsend = {
      email,
      password,
    };
    loginHandler(objsend);
  };
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="toggle-icon" onClick={toggleMenu}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </div>
        <div className={`nav-item ${showMenu ? "active" : ""}`}>
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/CheckFeedBack" onClick={toggleMenu}>
            Check
          </Link>
          <Link to="/Form" onClick={toggleMenu}>
            AdminPenal
          </Link>
        </div>
      </div>
      <div className="body">
        <div className="left">
          <div className="heading">
            <h1>
              Welcome to <span>Techzone</span>{" "}
            </h1>
            <p>
              Best computer courses institute in Karachi, where you can learn
              best job oriented designed courses to start earning in short time
              best computer courses institute in Karachi, where you can learn
              best job oriented designed courses to start earning in short time.
            </p>
          </div>
        </div>
        <div className="right">
          <div className="content">
            <div className="text">Only Admin</div>

            <form onSubmit={submitHandler}>
              <div className="field">
                <input
                  type="email"
                  placeholder="Email or Phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span>
                  <IoMdMail />
                </span>
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span>
                  <FaLock />
                </span>
              </div>
              <div className="forgot-pass">
                <Link to="#">Forgot Password?</Link>
              </div>
              <div className="button">
                <button>SignIn</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
