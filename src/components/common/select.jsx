import React from "react";

const Select = ({name, label, options, handleChange, currentValue, ...rest}) => {
    return (
        <div className="form-group">
            {label && <label className="form-label fs-6 fw-bolder text-dark" htmlFor={name}>{label}</label>}
            <select value={currentValue} name={name} {...rest} onChange={(e) => handleChange(e)}
                    className="form-select form-select-solid form-control form-control-lg">
                <option defaultValue={true} value=""/>
                {options.map((option, index) => (
                    <option value={option.value} key={index} selected={currentValue === option.value}>
                        {String(option.label).toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
