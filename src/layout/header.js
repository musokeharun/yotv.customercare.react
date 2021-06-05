import React from "react";

export default function Header({preTitle, title, btn}) {

    return (
        <div className="header">
            <div className="container-fluid">
                <div className="header-body">
                    <div className="row align-items-end">
                        <div className="col">
                            <h6 className="header-pretitle">{preTitle}</h6>
                            <h1 className="header-title">{title}</h1>
                        </div>
                        {btn &&
                        <div className="col-auto">
                            <a href="#" className="btn btn-primary lift"> Create Report </a>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

Header.defaultProps = {
    title: "Customer Care",
    btn: false
}