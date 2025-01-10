import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/loginUser", formData);
            localStorage.setItem("userToken", response.data.token);
            window.alert("Login successful!");
            navigate("/enroll");
        } catch (error) {
            setMessage("Login failed. Check your credentials.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>

            {/* Navigate to reset-request route */}
            <button onClick={() => navigate("/reset-request")} style={{ marginTop: "10px" }}>
                Reset Password
            </button>

            <p>
                Don't have an account?{" "}
                <button
                    onClick={() => navigate("/signup")}
                    style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                >
                    Click here
                </button>
            </p>
        </div>
    );
};

export default Login;
