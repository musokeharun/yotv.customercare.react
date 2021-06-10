import React from 'react';
import Header from "../../layout/header";
import Form from "../../components/common/form";
import * as Joi from "joi-browser";

class Reports extends Form {

    state = {
        data: {
            user: "",
            from: "",
            to: "",
            step: ""
        },
        errors: {},
    };

    schema = {
        user: Joi.string()
            .required()
            .label("User"),
        from: Joi.string()
            .required()
            .label("From"),
        to: Joi.string()
            .required()
            .label("To"),
        step: Joi.string()
            .required()
            .label("Step"),
    };


    render() {
        return (
            <div className={"container-fluid w-100"}>
                <Header preTitle={"Build"} title={"Reports"}/>
                <form className="row form-inline" onSubmit={e => this.handleSubmit(e)}>
                    <div className={"col-md-3"}>{this.renderSelect("user", "User", ["All"])}</div>
                    <div className={"col-md-3"}>{this.renderInput("from", "From", "datetime")}</div>
                    <div className={"col-md-3"}>{this.renderInput("to", "To", "datetime")}</div>
                    <div className={"col-md-3"}>{this.renderSelect("step", "From", ["Hour", "Daily", "Weekly"])}</div>
                </form>
            </div>
        );
    }
}

export default Reports;