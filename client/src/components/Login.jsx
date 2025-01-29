
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; 
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in both email and password.",
            });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, formData);
            if (response.status === 200) {
               
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                await Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                });
                navigate("/");
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error during login:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.response?.data?.message || "Please check your credentials.",
            });
        }
    };

    return (
        <section
            className="signin-area signin-one"
            style={{
                backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/023/977/557/non_2x/front-view-dark-silhouette-of-a-modern-sport-black-car-isolated-on-black-background-ai-generated-free-photo.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="login-container"
                style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    padding: "30px",
                    borderRadius: "12px",
                    maxWidth: "400px",
                    width: "100%",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    color: "#fff",
                }}
            >
                <h1 className="text-center py-3" style={{ fontSize: "28px", fontWeight: "bold" }}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Login
                    </button>
                </form>
                <p className="login-text">
                    New User?{" "}
                    <span onClick={() => navigate("/signup")} className="login-link">
                        Sign Up
                    </span>
                </p>
                <p className="test-credentials">
                    <span className="text-danger">Test email:</span> shivamsingh@gmail.com <br />
                    <span className="text-danger">Test password:</span> password123
                </p>
                <p className="note">Note: If you face login issues, refresh the page once or twice or go to '/' path.</p>
            </div>

         
            <style>
                {`
                .form-group {
                    margin-bottom: 15px;
                }
                .form-input {
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    border: none;
                    outline: none;
                    font-size: 16px;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    transition: 0.3s;
                }
                .form-input::placeholder {
                    color: #ddd;
                }
                .form-input:focus {
                    background: rgba(255, 255, 255, 0.3);
                }
                .submit-btn {
                    width: 100%;
                    padding: 12px;
                    background: #ff6600;
                    border: none;
                    border-radius: 8px;
                    font-size: 18px;
                    color: white;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .submit-btn:hover {
                    background: #e65c00;
                }
                .login-text {
                    margin-top: 15px;
                    font-size: 14px;
                }
                .login-link {
                    color: #ffcc00;
                    cursor: pointer;
                    font-weight: bold;
                    text-decoration: underline;
                }
                .login-link:hover {
                    color: #ffaa00;
                }
                .test-credentials {
                    font-size: 14px;
                    margin-top: 10px;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 10px;
                    border-radius: 8px;
                }
                .note {
                    font-size: 14px;
                    margin-top: 10px;
                    color: #ddd;
                }
                `}
            </style>
        </section>
    );
};

export default Login;

