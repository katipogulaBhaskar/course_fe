import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import ResetPasswordRequest from "./components/ResetPasswordRequest.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import CourseEnrollment from "./components/CourseEnrollment.jsx";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status from sessionStorage on initial load
    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem("isLoggedIn");
        if (loggedInStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-request" element={<ResetPasswordRequest />} />
                <Route path="/reset" element={<ResetPassword />} />

                {/* Protecting the /enroll route */}
                <Route
                    path="/enroll"
                    element={isLoggedIn ? <CourseEnrollment /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
