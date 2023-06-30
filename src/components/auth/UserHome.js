import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, Link } from "react-router-dom";
import NavBar from "../NavBar";
import HomeBody from "../Pages/HomeBody";
import Welcome from "../Pages/Welcome";
import LogBody from "../Pages/LogBody";
import NewEntryForm from "../Pages/NewEntryForm";
import ProfileBody from "../Pages/ProfileBody";
import StatsBody from "../Pages/StatsBody";

function UserHome({ currentUser, userSignOut, onPostSubmit, onDeletePost }) {
    return (
        <div className="userHomeContainer">
            <NavBar currentUser={currentUser} userSignOut={userSignOut}/>
            <Routes>
                <Route path="/" element={<HomeBody />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/log" element={<LogBody posts={currentUser.posts} onDeletePost={onDeletePost} />} />
                <Route path="/newForm" element={<NewEntryForm onPostSubmit={onPostSubmit} />} />
                <Route path="/stats" element={<StatsBody />} />
                <Route path="/profile" element={<ProfileBody />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}
export default UserHome;