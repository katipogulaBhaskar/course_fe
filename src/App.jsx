import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import ResetPasswordRequest from "./components/ResetPasswordRequest.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import CourseEnrollment from "./components/CourseEnrollment.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Default route */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-request" element={<ResetPasswordRequest />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/enroll" element={<CourseEnrollment />} />
            </Routes>
        </Router>
    );
};

export default App;
