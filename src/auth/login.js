import React from "react";
import Form from "../components/common/form";
import * as Joi from "joi-browser";
import axios from "../services/http";
import {baseUrl} from "../config.json";
import {getTokenData, setToken} from "./auth";
import {toast} from "react-toastify";
import {startLoad, stopLoad} from "../main";

export default class Login extends Form {

    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {},
        processing: false
    }

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        password: Joi.string()
            .required()
            .min(5)
            .label("Password"),
    };

    doSubmit = async () => {
        startLoad();
        try {
            let {data} = await axios.post(baseUrl + "/user/login", {
                ...this.state.data
            });
            toast("Success", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
            setToken(data);
            let tokenData = getTokenData();
            localStorage.setItem("USER_DATA", JSON.stringify(tokenData));
            if (!tokenData['isAdmin'])
                this.props.history.push("/app");
            else
                this.props.history.push("/admin/overview");
        } catch (e) {
            toast("Email or Password incorrect", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });
            // console.log(e);
        } finally {
            stopLoad()
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-xl-4 my-5">

                        <h1 className="display-4 text-center mb-3">
                            Sign in
                        </h1>

                        <p className="text-muted text-center mb-5">
                            To access the dashboard.
                        </p>

                        <form className="form w-100" noValidate="novalidate"
                              action="#" onSubmit={(e) => this.handleSubmit(e)}>
                            {
                                this.renderInput("email", "Email", "email")
                            }

                            {
                                this.renderInput("password", "Password", "password")
                            }

                            <button type="submit" className="btn btn-lg btn-primary fw-bolder me-3 my-2 d-block w-100">
                                <span className="indicator-label">Sign In</span>
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}
