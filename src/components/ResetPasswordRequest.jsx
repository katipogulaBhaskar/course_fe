import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import API from "../api"; // Import your axios instance or API function

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/reset-password-request", { email });
            window.alert(response.data.message); // Show success message
            navigate("/reset"); // Redirect to the reset route
        } catch (error) {
            setMessage(error.response?.data?.message || "Error sending reset token.");
        }
    };

    return (
        <div>
            <h2>Request Password Reset</h2>
            <form onSubmit={handleRequest}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send Reset Link</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ResetPasswordRequest;
