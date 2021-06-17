import React, {Fragment} from 'react';
import {v1} from "uuid";
import _ from "lodash";

const RadioButton = ({value, name, currentValue, handleChange}) => {

    let id = v1();
    return (
        <Fragment>
            <input name={name} className={"btn-check "} type="radio"
                   onChange={(e) => handleChange(name, value)}
                   value={value} id={id} checked={value === currentValue}/>
            <label className={"btn btn-white rounded-pill mx-1 btn-lg " + ((value === currentValue) ? "active" : "")}
                   htmlFor={id}>
                {
                    value.toUpperCase()
                }
            </label>
        </Fragment>

    );
};

export default RadioButton;
