import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const [user, setUser] = useState(null);
    const location = useLocation();

    const updateUser = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        updateUser();
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = '/';
    };

    const routes = [
        { path: "/services", name: "Services" },
        { path: "/installations", name: "Installations" },
        { path: "/products", name: "Products" },
        { path: "/about", name: "About Us" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light p-4 fixed-top shadow-sm">
            <div className="container">
                <Link className="navbar-brand text-dark" to="/">
                    <strong>Dern Support IT</strong>
                </Link>
                <button
                    className="navbar-toggler bg-dark"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="offcanvas offcanvas-end text-dark" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Dern Support IT</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-dark"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                            {routes.map((route, index) => (
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link text-dark text-uppercase" to={route.path}>
                                        {route.name}
                                    </Link>
                                </li>
                            ))}

                            {user ? (
                                <>
                                    {user.role === "admin" ? (
                                        <li className="nav-item">
                                            <Link className="nav-link text-dark text-uppercase" to="/admin-dashboard">
                                                Admin Dashboard
                                            </Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <Link className="nav-link text-dark text-uppercase" to="/user-dashboard">
                                                User Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button
                                            className="nav-link text-dark text-uppercase btn btn-link"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link text-dark text-uppercase" to="/auth">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;