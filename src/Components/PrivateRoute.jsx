import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

    let isAuthenticated = localStorage.getItem("isAuthenticated");
    return <>{isAuthenticated ? <Outlet /> : <Navigate to="/form" />}</>;
};
export default PrivateRoute;