import React from "react";

const Select = ({name, label, options, handleChange, currentValue, ...rest}) => {
    return (
        <select value={currentValue} name={name} {...rest} onChange={(e) => handleChange(name, e.target.value)}
                className="form-select form-select-solid">
            <option value=""/>
            {options.map((option, index) => (
                <option value={option} key={index}>
                    {String(option).toUpperCase()}
                </option>
            ))}
        </select>
    );
};

export default Select;
