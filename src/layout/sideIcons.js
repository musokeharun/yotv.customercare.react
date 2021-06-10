import React, {Fragment} from "react";
import logoCompact from "../assets/logo-compact.jpeg";
import {Link, NavLink} from "react-router-dom";
import {getTokenData} from "../auth/auth";

export default function SideIcons() {

    const {email} = getTokenData();

    return (
        <Fragment>
            <nav className="navbar navbar-vertical fixed-start navbar-expand-md border-0">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarCollapse"
                        aria-controls="sidebarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon fa fa-align-justify fa-2x"/>
                    </button>

                    <a className="navbar-brand" href={"#"}>
                        <img src={logoCompact} className="navbar-brand-img me-auto rounded d-none d-md-flex"
                             alt="Logo"/>
                    </a>

                    {/* user*/}
                    <div className="navbar-user d-md-none">
                        <div className="dropdown">
                            <a
                                href="#"
                                id="sidebarIcon"
                                className="dropdown-toggle align-top text-dark"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <div className="avatar avatar-sm avatar-online">
                                    <img
                                        src={logoCompact}
                                        className="avatar-img rounded-circle"
                                        alt="User"
                                    />
                                </div>
                                {
                                    email
                                }
                            </a>

                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarIcon">
                                <a className="dropdown-item">Profile</a>
                                <a className="dropdown-item">Settings</a>
                                <hr className="dropdown-divider"/>
                                <Link to={"/login"} className="dropdown-item">Logout</Link>
                            </div>
                        </div>
                    </div>

                    {/*NAVIGATION*/}
                    <div className="collapse navbar-collapse" id="sidebarCollapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark"
                                    href="#sidebarDashboards"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="sidebarDashboards"
                                >
                                    Dashboards
                                </a>
                                <div className="collapse show" id="sidebarDashboards">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <NavLink to={"/admin/overview"}
                                                     className="nav-link text-dark"> Overview </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark"
                                    href="#sidebarUsers"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="sidebarDashboards"
                                >
                                    Users
                                </a>
                                <div className="collapse" id="sidebarUsers">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <NavLink to={"/admin/users/"} className="nav-link text-dark"> All
                                                Users </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to={"/admin/users/add"} className="nav-link text-dark"> Add
                                                User </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark"
                                    href="#sidebarReports"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="sidebarDashboards"
                                >
                                    Reports
                                </a>
                                <div className="collapse" id="sidebarReports">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <NavLink to={"/admin/reports"} className="nav-link text-dark">
                                                Build Report
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to={"/admin/reports/generate"} className="nav-link text-dark">
                                                Generate Report
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark"
                                    href="#sidebarData"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="sidebarDashboards"
                                >
                                    Data
                                </a>
                                <div className="collapse" id="sidebarData">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <NavLink to={"/admin/not/called/file"} className="nav-link text-dark">
                                                Upload Not Called Data
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to={"/admin/called/file"} className="nav-link text-dark">
                                                Upload Called Data
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to={"/admin/data/sync"} className="nav-link text-dark">
                                                Recent Sync
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <hr className="navbar-divider my-2"/>
                    <div className="mt-auto"/>
                    <div data-content="Start Calling or View the UI!" title="Go to App!">
                        <Link className="btn w-100 btn-primary mb-4" to={"/app"}>
                            <i className="fa fa-dashboard me-2"/> App
                        </Link>
                    </div>

                    {/*USER*/}
                    <div className="navbar-user d-none d-md-flex" id="sidebarUser">
                        <div className="dropup">
                            <a
                                id="sidebarIconCopy"
                                className="dropdown-toggle text-dark align-baseline"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <div className="avatar avatar-sm avatar-online">
                                    <img
                                        src={logoCompact}
                                        className="avatar-img rounded-circle"
                                        alt="..."
                                    />
                                </div>
                                {
                                    email
                                }
                            </a>

                            <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                                <a className="dropdown-item">Profile</a>
                                <a className="dropdown-item">Settings</a>
                                <hr className="dropdown-divider"/>
                                <Link to={"/login"} className="dropdown-item">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}
