import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";

function AuthLayout() {
    return (
        <div className="auth-layout-container">
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
        </div>
    )
}

export default AuthLayout;