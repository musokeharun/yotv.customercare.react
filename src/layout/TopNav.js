import React from 'react';
import {getTokenData} from "../auth/auth";
import logoCompact from "../assets/logo-compact.jpeg";
import {Link} from "react-router-dom";

const TopNav = () => {

    const {email} = getTokenData();

    return (
        <nav
            className="navbar navbar-expand-md navbar-light d-none d-md-flex"
            id="topbar"
        >
            <div className="container-fluid">
                <div className="navbar-user">
                    <div className="dropdown me-4 d-none d-md-flex">
                    </div>
                    <div className="dropend">
                        <a
                            href="#"
                            className="avatar avatar-sm avatar-online dropdown-toggle text-dark"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <img
                                src={logoCompact}
                                alt="user"
                                className="avatar-img rounded-circle mr-2"
                            />
                            {
                                email
                            }
                        </a>

                        <div className="dropdown-menu dropdown-menu-end">
                            <Link to={"/admin/overview"} className="dropdown-item">Dashboard</Link>
                            <a className="dropdown-item">Profile</a>
                            <a className="dropdown-item">Settings</a>
                            <hr className="dropdown-divider"/>
                            <Link to={"/login"} className="dropdown-item">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
