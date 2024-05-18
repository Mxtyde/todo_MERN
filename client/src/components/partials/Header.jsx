import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

    const navigation = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const u = localStorage.getItem('user');
        setUser(u ? JSON.parse(u) : null);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigation('/login');
        window.location.reload(); // Force page refresh
    }

    return (
        <nav className="navbar fixed-top navbar-expand-sm mt-2 bg-dark opacity shadow-lg p-2 mb-50 rounded" style={{ marginLeft: "20px", marginRight: '20px' }}>
            <div className="container-fluid opacity-100">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {/* <a className="navbar-brand" href="#"></a> */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="" style={{ color: 'white' }}>
                                <b>Home</b>
                            </Link>
                        </li>
                        {
                            user ? (
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={handleLogout} style={{ color: 'white' }}>
                                        <b>Logout</b>
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login" style={{ color: 'white' }}>
                                            <b>Login</b>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register" style={{ color: 'white' }}>
                                            <b>SignUP</b>
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
