import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginScreen from "../../screens/Login/LoginScreen";
import {MenuBar} from "../MenuBar/MenuBar";

const RootRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginScreen/>}/>
                <Route path="/admin-panel" element={<MenuBar/>}/>
            </Routes>
        </Router>
    );
}

export default RootRoutes;
