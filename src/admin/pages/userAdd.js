import React from 'react';
import Form from "../../components/common/form";
import * as Joi from "joi-browser";
import axios from "../../services/http";
import {baseUrl} from "../../config.js";
import {toast} from "react-toastify";
import {startLoad, stopLoad} from "../../main";

class UserAdd extends Form {

    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {},
        processing: false,
        stay: true
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
        try {
            startLoad()
            let {data} = await axios.post(baseUrl + "/admin/register", {
                ...this.state.data
            });
            toast(data.email + " created.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
            if (!this.state.stay)
                this.props.history.push("/users")
            else {
                let state = {...this.state};
                state.data.email = "";
                state.data.password = "";
                this.setState(state);
            }

        } catch (e) {
            toast("Could not register user", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });
            console.log(e);
        } finally {
            stopLoad()
        }
    }

    render() {

        const {stay} = this.state;

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-xl-4 my-5">
                        <h1 className="display-4 text-center mb-3">
                            Register
                        </h1>

                        <form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate"
                              action="#" onSubmit={(e) => this.handleSubmit(e)}>
                            {
                                this.renderInput("email", "Email", "email")
                            }

                            {
                                this.renderInput("password", "Password", "password")
                            }

                            <button type="submit" className="btn btn-lg btn-primary fw-bolder me-3 my-2 d-block w-100">
                                <span className="indicator-label">Submit</span>
                            </button>
                            <div className="form-check form-check-custom form-check-solid">
                                <input className="form-check-input" type="checkbox" checked={stay}
                                       onChange={(e) => this.handleStayOnPage()}/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Stay On this Page
                                </label>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }

    handleStayOnPage = () => {
        let state = {...this.state};
        state.stay = !state.stay;
        this.setState(state);
    }
}

export default UserAdd;