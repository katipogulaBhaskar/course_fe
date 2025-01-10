import React, { useState } from "react";
import API from "../api"; // Assuming you have an axios instance for API calls
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
    const [formData, setFormData] = useState({ token: "", newPassword: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Optional: Retrieve token from URL (if token is passed as a query parameter)
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");

    // If a token exists in the URL, set it to the form data
    if (tokenFromUrl && !formData.token) {
        setFormData((prev) => ({ ...prev, token: tokenFromUrl }));
    }

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/reset-password", formData);
            window.alert(response.data.message);  // Set the success message from backend response
            // Redirect to login page after successful reset
            setTimeout(() => {
                navigate("/login");
            }, 2000); // Redirect after 2 seconds for user to see the message
        } catch (error) {
            setMessage(error.response?.data?.message || "Error resetting password.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleReset}>
                <input
                    type="text"
                    placeholder="Enter reset token"
                    value={formData.token}
                    onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <button type="submit">Reset Password</button>
            </form>
            <p>{message}</p> {/* Display success or error message */}
        </div>
    );
};

export default ResetPassword;
