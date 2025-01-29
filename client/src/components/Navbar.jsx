import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCarSportSharp } from "react-icons/io5";


const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
       
        const storedUser = JSON.parse(localStorage.getItem('user')); 
        console.log("storedUser", storedUser);
        if (storedUser) {
            setLoggedIn(true);
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
       
        localStorage.removeItem('authtoken');
        localStorage.removeItem('user');
        setUser(null); 
        navigate('/login'); 
        setLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom border-gray">
            <div className="container-fluid my-2">
                <a className="navbar-brand fs-4" href="/"><IoCarSportSharp /> Car Management </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                    </ul>

                    <div className="d-flex gap-1">
                       
                        {!loggedIn ? (
                            <>

                                <button onClick={() => navigate('/login')} className="btn btn-danger" type="button">Login</button>
                                <button onClick={() => navigate('/signup')} className="btn btn-success" type="button">SignUp</button>
                            </>
                        ) : (
                            <>
                                <span className="navbar-text me-2 fw-bold"><i class="bi bi-person-circle"></i> {user?.username}</span> 
                                <button onClick={handleLogout} className="btn btn-danger" type="button">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
