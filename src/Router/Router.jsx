import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CheckFeedBack from '../Components/CheckFeedBack/CheckFeedBack';
import Home from '../Components/Home/Home';
import Admin_panel from '../Components/Admin/Admin_panel';
import Form from '../Components/Form/Form';
import PrivateRoute from '../Components/PrivateRoute';


const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/CheckFeedBack' element={<CheckFeedBack />} />
                <Route path='/Form' element={<Form />} />
                <Route element={<PrivateRoute />}> 
                    <Route path='/Admin_panel' element={<Admin_panel />} />
                </Route>
            </Routes>
        </>
    );
};

export default Router;