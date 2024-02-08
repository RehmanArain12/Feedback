import React from "react";
import "./App.css";
import Router from "./Router/Router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "./Components/Toastify/Toastify";

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
       
    </>
  );
};

export default App;
