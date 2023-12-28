import React from "react";
// import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import logo from "../assets/logo.png";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

const NavbarComps = () => {
    const authState = useAuthContext();

    const { logout } = useLogout();

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    };

    return (
        <>
            <Navbar expand="lg" variant="dark" className="bg-trans navbar">
                <Container>
                    <Navbar.Brand
                        href="/"
                        className="text-light t-bold mx-auto"
                    >
                        <img src={logo} alt="logo" width="100 px" />
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className="mini-navbar">
                <p className="mini-nav-p text-white t-bold text-center">
                    {authState.user && (
                        <span>
                            Welcome {authState.user.email}!
                            <a onClick={handleLogout} className="btn-logout">
                                Logout
                            </a>
                        </span>
                    )}
                    {!authState.user && (
                        <span>
                            <a href="/signup" className="text-white t-bold">
                                Signup{" "}
                            </a>
                            or
                            <a href="/login" className="text-white t-bold">
                                {" "}
                                Login
                            </a>
                        </span>
                    )}
                </p>
            </div>
        </>
    );
};

export default NavbarComps;
