import React, { useState } from "react";
import logo from "../../assets/Logo.png";
import axios from "axios";
import "../Home/Home.css";
import { API_URL } from "../../Global";
import { errornotify, successnotify } from "../Toastify/Toastify";
import moment from "moment";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
const CheckFeedBack = () => {
  let [student_id, setStudent_id] = useState("");
  let [name, setName] = useState("");
  const [feedbackData, setFeedbackData] = useState([]);

  const GetFeedback = (obj) => {
    axios
      .get(`${API_URL}/getfeedback/${student_id}/${name}`, obj)
      .then((response) => {
        setFeedbackData(response.data.data);
        successnotify(response.data.message);
        setStudent_id("");
        setName("");
      })
      .catch((error) => {
        errornotify(error.response.data.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!student_id || !name) {
      errornotify("Required field are missing");
      return;
    }
    let obj = {
      student_id,
      name,
    };
    GetFeedback(obj);
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
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/CheckFeedBack" onClick={toggleMenu}>Check</Link>
          <Link to="/Form" onClick={toggleMenu}>Admin Panel</Link>
        </div>
      </div>
      <div className="container">
        {/* <div className="left"> */}
        <div className="feedback-container">
          {feedbackData.length > 0 ? (
            feedbackData.map((feedbacks, index) => (
              <div className="card" key={index}>
                <div className="box">
                  <div className="box_name">ID</div>
                  <div className="item"> {feedbacks.student_id}</div>
                </div>
                <div className="box">
                  <div className="box_name">Name</div>
                  <div className="item">{feedbacks.name}</div>
                </div>
                <div className="box">
                  <div className="box_name">Teach Regular</div>
                  <div className="item">{feedbacks.teacher_regular}</div>
                </div>
                <div className="box">
                  <div className="box_name">Comp Course</div>
                  <div className="item">{feedbacks.complete_course}</div>
                </div>
                <div className="box">
                  <div className="box_name">Course</div>
                  <div className="item">{feedbacks.course}</div>
                </div>
                <div className="box ">
                  <div className="box_name ">Feedback</div>
                  <div className="item feedback_box"> {feedbacks.feedback}</div>
                </div>
                <div className="box">
                  <div className="box_name">Date</div>
                  <div className="item">
                    {moment(feedbacks.created_on).format("DD-MM-YYYY")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="dataheading">
              <h1>No Feedback Available</h1>

            </div>
          )}
    
        </div>
       <div className="right">
        <div className="form">
          <div className="heading">
            <h1>Search Your Feedback</h1>
          </div>
          <form onSubmit={submitHandler}>
            <div className="input_field">
              <input
                type="text"
                placeholder="Enter Your ID"
                value={student_id}
                onChange={(e) => setStudent_id(e.target.value)}
              />
            </div>
            <div className="input_field">
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="btn">
              <button>Check</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>
  );
};

export default CheckFeedBack;
