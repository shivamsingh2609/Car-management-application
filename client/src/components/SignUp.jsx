
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
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
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, formData);
            if (response.status === 201) {
                toast.success("Signup successful! Please login.", { position: "top-center" });
                navigate("/login");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Signup failed. Please try again.",
                { position: "top-center" }
            );
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
            
            <ToastContainer />

            <div
                className="signup-container"
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
                <h1 className="text-center py-3" style={{ fontSize: "28px", fontWeight: "bold" }}>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your name"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>
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
                        Sign Up
                    </button>
                </form>
                <p className="login-text">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="login-link">
                        Login
                    </span>
                </p>
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
                `}
            </style>
        </section>
    );
};

export default SignUp;

