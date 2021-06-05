import React from "react";

function Footer() {
  return (
    <div className="footer py-4 d-flex flex-lg-column">
      <div className="container-fluid d-flex flex-column flex-md-row flex-stack">
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted fw-bold me-2">
            {new Date().getFullYear()}
          </span>
          <a href="#" className="text-gray-800 text-hover-primary">
            Harn.s.inc
          </a>
        </div>
        <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">
          <li className="menu-item">
            <a href="#" className="menu-link px-2">
              &copy;
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link px-2">
              YOTVChannels
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link px-2">
              UG.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
