import React from "react";
import { v1 } from "uuid";
import _ from "lodash";

const Radio = ({ value, name, currentValue, handleChange, label }) => {
  let id = v1();
  return (
    <div className="form-check form-check-solid form-check-inline">
      <input
        name={name}
        className="form-check-input h-40px w-40px"
        type="radio"
        onChange={(e) => handleChange(name, value)}
        value={value}
        id={id}
        checked={value === currentValue}
      />
      <label className="form-check-label" htmlFor={id}>
        {label || value.toUpperCase()}
      </label>
    </div>
  );
};

export default Radio;
