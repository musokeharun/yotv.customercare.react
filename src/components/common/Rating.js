import React, {Fragment} from 'react';

const Rating = () => {
    return (
        <Fragment>

            <div className="rating">
                <label className="rating-label" htmlFor="kt_rating_2_input_1">
                    <span className="svg-icon svg-icon-1"><svg>....</svg></span>
                </label>
                <input className="rating-input" name="rating2" value="1" type="radio" id="kt_rating_2_input_1"/>
                <label className="rating-label" htmlFor="kt_rating_2_input_2">
                    <span className="svg-icon svg-icon-1"><svg>....</svg></span>
                </label>
                <input className="rating-input" name="rating2" value="2" type="radio" id="kt_rating_2_input_2"/>
                <label className="rating-label" htmlFor="kt_rating_2_input_3">
                    <span className="svg-icon svg-icon-1"><svg>....</svg></span>
                </label>
                <input className="rating-input" name="rating2" value="3" type="radio" checked="checked"
                       id="kt_rating_2_input_3"/>
                <label className="rating-label" htmlFor="kt_rating_2_input_4">
                    <span className="svg-icon svg-icon-1"><svg>....</svg></span>
                </label>
                <input className="rating-input" name="rating2" value="4" type="radio" id="kt_rating_2_input_4"/>
                <label className="rating-label" htmlFor="kt_rating_2_input_5">
                    <span className="svg-icon svg-icon-1"><svg>....</svg></span>
                </label>
                <input className="rating-input" name="rating2" value="5" type="radio" id="kt_rating_2_input_5"/>
            </div>

        </Fragment>
    );
};

export default Rating;
