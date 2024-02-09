import React, { useState } from "react";
import "./Home.css";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { errornotify, successnotify } from "../Toastify/Toastify";
import axios from "axios";
import { API_URL } from "../../Global";
const Home = () => {
  let [student_id, setStudent_id] = useState("");
  let [name, setName] = useState("");
  let [course, setCourse] = useState("");
  let [complete_course, setComplete_course] = useState("");
  let [teacher_regular, setTeacher_regular] = useState("");
  let [feedback, setFeedback] = useState("");

  const sendfeedback = (obj) => {
    axios
      .post(`${API_URL}/sendfeedback`, obj)
      .then((res) => {
        successnotify(res.data.message);
        setStudent_id("");
        setName("");
        setCourse("");
        setComplete_course("");
        setTeacher_regular("");
        setFeedback("");
      })
      .catch((error) => {
        errornotify(error.response.data.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !student_id ||
      !name ||
      !course ||
      !complete_course ||
      !teacher_regular ||
      !feedback
    ) {
      errornotify("Required field are missing");
      return;
    }
    const obj = {
      student_id,
      name,
      course,
      complete_course,
      teacher_regular,
      feedback,
    };
    sendfeedback(obj);
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
            Admin Panel
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <div className="main_heading">
            <h1>
              Welcome to <span>Techzone</span>
            </h1>
            <p className="paragraph">
              Best computer courses institute in Karachi, where you can learn
              best job oriented designed courses to start earning in short time
              best computer courses institute in Karachi, where you can learn
              best job oriented designed courses to start earning in short time.
            </p>
          </div>
        </div>
        <div className="right">
          <div className="form">
            <div className="heading">
              <h1>Feedback</h1>
            </div>
            <form onSubmit={submitHandler}>
              <div className="input_field">
                <input
                  type="text"
                  name=""
                  value={student_id}
                  id=""
                  placeholder="Enter Your ID"
                  onChange={(e) => setStudent_id(e.target.value)}
                />
              </div>
              <div className="input_field">
                <input
                  type="text"
                  name=""
                  value={name}
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input_field">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Courses</option>
                  <option value="Graphic designing">Graphic designing</option>
                  <option value="Video editing">Video editing</option>
                  <option value="Full stack developer">
                    Full stack developer
                  </option>
                  <option value="Web designing">Web designing</option>
                  <option value="Asp.net">Asp.net</option>
                  <option value="Python">Python</option>
                  <option value="Digital marketing">Digital marketing</option>
                  <option value="English language">English language</option>
                  <option value="ADV.MSOFFICE">ADV.MSOFFICE</option>
                  <option value="Shopify">Shopify</option>
                  <option value="WORD PRESS+PHP+MYSQL / E-COMMERCE">
                    WORD PRESS+PHP+MYSQL / E-COMMERCE
                  </option>
                </select>
              </div>

              <div className="input_field">
                <select
                  value={complete_course}
                  onChange={(e) => setComplete_course(e.target.value)}
                >
                  <option value="">How complete is your course?</option>
                  <option value="25%">25%</option>
                  <option value="50%">50%</option>
                  <option value="75%">75%</option>
                  <option value="100%">100%</option>
                </select>
              </div>
              <div className="input_field">
                <select
                  value={teacher_regular}
                  onChange={(e) => setTeacher_regular(e.target.value)}
                >
                  <option value="">Teacher regularity</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="input_field">
                <textarea
                  value={feedback}
                  placeholder="Enter your FeedBack"
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
              <div className="btn">
                <button>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
