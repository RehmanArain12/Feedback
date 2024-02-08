import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import axios from "axios";
import { FaBars, FaTimes } from 'react-icons/fa';
import { API_URL } from "../../Global";
import moment from "moment";

const Admin_panel = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    GetTaskHandler();
  }, []);

  const GetTaskHandler = () => {
    axios
      .get(`${API_URL}/getfeedbackadmin`)
      .then((res) => {
        let fetchedTasks = res.data.data;
        setTasks(fetchedTasks);
      })
      .catch((err) => console.error(err));
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/"); 
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
        <Link to="/Admin_panel">Home</Link>
          <Link to="/Admin_panel">Check</Link>
          <Link to="/Admin_panel">AdminPenal</Link>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
      </div>
     

      <div className="feedback-container">
        {tasks.map((task, index) => (
          <div className="card" key={index}>
            <div className="box">
              <div className="box_name">ID</div>
              <div className="item">{task.student_id}</div>
            </div>
            <div className="box">
              <div className="box_name">Name</div>
              <div className="item">{task.name}</div>
            </div>
            <div className="box">
              <div className="box_name">Teach Regular</div>
              <div className="item">{task.teacher_regular}</div>
            </div>
            <div className="box">
              <div className="box_name">Comp Course</div>
              <div className="item">{task.complete_course}</div>
            </div>
            <div className="box">
              <div className="box_name">Course</div>
              <div className="item">{task.course}</div>
            </div>
            <div className="box ">
              <div className="box_name ">Feedback</div>
              <div className="item feedback_box">{task.feedback}</div>
            </div>
            <div className="box">
              <div className="box_name">Date</div>
              <div className="item">
                {moment(task.created_on).format("DD-MM-YYYY")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Admin_panel;
