import React from "react";
import classNames from "classnames";

const Input = ({name, label, error, className, ...rest}) => {
    return (
        <div className="form-group py-0">
            <label className="form-label fs-6 fw-bolder text-dark" htmlFor={name}>{label}</label>
            <input {...rest} name={name} id={name} className={classNames("form-control form-control-lg", {
                [className]: !!className
            })}/>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};


export default Input;
