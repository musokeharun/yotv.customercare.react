import React from 'react';
import Form from "../../components/common/form";
import * as Joi from "joi-browser";
import {startLoad, stopLoad} from "../../main";
import axios from "../../services/http";
import {baseUrl} from "../../config.js";
import {toast} from "react-toastify";
import classNames from "classnames";

class NotCalled extends Form {

    fileInput;

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    state = {
        data: {
            msisdn: "",
        },
        errors: {},
        processing: false,
        stay: true,
        file: null
    }

    schema = {
        msisdn: Joi.string()
            .allow(null, '')
            .label("Msisdn Key"),
        tag: Joi.string()
            .label("Data Tag")
    };


    componentDidMount = () => {

    }


    doSubmit = async () => {

        let dataFile = this.fileInput.current.files[0];
        if (!dataFile) {
            toast("No file to upload", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });
            return;
        }

        try {
            startLoad()
            let state = {...this.state.data};
            state.dataFile = dataFile;

            let formData = new FormData();
            formData.append("dataFile", dataFile, dataFile.name);
            Object.getOwnPropertyNames(state).forEach(p => formData.set(p, state[p]));

            let {data} = await axios.post(baseUrl + "/bulk/upload", formData);
            toast("Data Synced.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
        } catch (e) {
            toast("Could not sync user", {
                position: "top-right",
                autoClose: 3000,
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

    handleFileChange = (e) => {
        let file = this.fileInput.current.files;
        if (file) {
            let state = {...this.state};
            state.file = file[0].name;
            this.setState(state);
        }
    }


    render() {
        let fileName = this.state.file;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-xl-4 my-md-7">
                        <h1 className="display-4 text-center mb-3">
                            Sync Data File
                        </h1>
                        <form className="form w-100" noValidate="novalidate"
                              action="#" onSubmit={(e) => this.handleSubmit(e)}>

                            <div className={"w-100 mb-md-3 mb-1 d-block"}>
                                <label htmlFor={"fileId"} style={{cursor: "pointer"}}
                                       className="btn btn-outline btn-outline-dashed btn-outline-info btn-active-light-info d-block">
                                    {classNames({"Upload File": !fileName, [fileName]: fileName})}
                                </label>
                                <input hidden type="file" ref={this.fileInput} id={"fileId"}
                                       onChange={(e) => this.handleFileChange(e)}/>
                            </div>

                            {
                                this.renderInput("tag", "Add Tag", "text")
                            }

                            {
                                this.renderInput("msisdn", "Msisdn Key", "text")
                            }

                            <button type="submit" className="btn btn-lg btn-primary fw-bolder me-3 my-2 d-block w-100">
                                <span className="indicator-label">Submit</span>
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default NotCalled;