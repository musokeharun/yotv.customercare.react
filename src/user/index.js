import React, {Component, Fragment} from "react";
import {v1} from "uuid";
import axios from "../services/http";
import {baseUrl} from "../config.json";
import {toast} from "react-toastify";
import {formatResponse} from "../utild/utils";
import Radio from "../components/common/Radio";
import Select from "../components/common/select";
import Input from "../components/common/input";
import {startLoad, stopLoad} from "../main";
import TopNav from "../layout/TopNav";

export default class User extends Component {

    state = {
        responses: {},
        number: "000000000",
        id: 0,
        others: {}
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        startLoad();
        let state = {...this.state};

        Object.getOwnPropertyNames(state.responses).forEach(property => {
            if (state.responses[property].options) {
                state[property] = state.responses[property].value;
            } else {
                state[property] = state.responses[property];
            }
        })

        delete state.responses;
        delete state.others;

        try {
            let {} = await axios.post(baseUrl + "/user/response", state);
            // console.log(responded);
            await this.fetchNumber();
        } catch (e) {
            console.log(e);
            toast("Could not respond,Please check the responses.", {
                type: "error"
            })
        } finally {
            stopLoad();
        }

    }

    fetchNumber = async () => {

        try {
            let {data} = await axios.post(baseUrl + "/user/call");
            let {contact, id, others} = data;

            let state = {...this.state};
            state.number = contact;
            state.id = id;
            if (others)
                state.others = others

            toast("Number Added", {
                type: "info"
            })

            this.setState(state);
        } catch (e) {
            console.log(e)
            toast("Could not add new number, may be re::login", {
                type: "error"
            });
        }
    }

    handleChange = (name, value) => {
        let state = {...this.state};
        // console.log(state);
        if (typeof state.responses[name] == "object") {
            state.responses[name].value = value;
        } else {
            state.responses[name] = value;
        }
        // console.log(state);
        this.setState(state);
    }

    async componentDidMount() {

        let {data} = await axios.post(baseUrl + "/user/options");
        if (!Array.isArray(data)) {
            toast("No responses", {
                type: "warning"
            })
            return;
        }

        let response = formatResponse(data);
        let state = {...this.state};
        state.responses = response;
        this.setState(state);
        await this.fetchNumber();
    }

    render() {
        let {number, responses, others} = this.state;
        // const {email} = this.props;

        let numberArray = [];

        if (number) {

            if (number.substr(0, 3) === "256") {
                number = "0" + number.substr(3);
            }

            for (let i = 0; i < number.length; i++) {
                numberArray.push(number.charAt(i));
            }
        }

        let ownPropertyNames = Object.getOwnPropertyNames(responses);

        return (
            <div className="main-content">
                <TopNav/>
                <div className="container-fluid">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="content fs-6 d-flex flex-column flex-column-fluid">

                            {/*NUMBER*/}
                            <div
                                className={"row g-3 justify-content-center align-items-center rounded bg-light"}>

                                {!!numberArray.length &&
                                numberArray.map(i => (
                                    <div
                                        key={v1()}
                                        className="col-auto flex-center px-3 text-hover-inverse-primary bg-hover-primary">
                                        <h1 className={"display-1 fs-1"}>{i}</h1>
                                    </div>
                                ))
                                }
                                {/*OTHERS*/}

                            </div>

                            <div className={"mx-auto card d-inline-block"}>

                                {
                                    !!others && Object.getOwnPropertyNames(others).map(p => (
                                        <span key={v1()} className={"badge bg-primary-soft float-left"}>{p}:{
                                            (typeof others[p] === "string" && others[p].includes("-")) ? new Date(others[p]).toDateString() : others[p]
                                        }</span>
                                    ))
                                }

                            </div>

                            {/*RESPONSES*/}
                            <div className={"row my-md-2 my-1 justify-content-center"}>

                                {!!ownPropertyNames.length &&
                                ownPropertyNames.map((property, index) => {
                                    if (typeof responses[property] === "object" && responses[property].options && responses[property].options.length <= 4) {
                                        return (
                                            <div className={"col-md-auto col-12 mb-3"} key={"input1" + index}>
                                                <div className={"card"}>
                                                    <div className={"card-body"}>
                                                        <h6>{property.toUpperCase()}</h6>
                                                        <div className={"flex-row mt-md-3 mt-1"}>
                                                            {
                                                                responses[property].options.map((option, i) =>
                                                                    (
                                                                        <Radio value={option}
                                                                               name={property}
                                                                               key={"input2" + i}
                                                                               currentValue={responses[property].value}
                                                                               handleChange={(name, value) => this.handleChange(name, value)}
                                                                        />
                                                                    )
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    } else if (typeof responses[property] === "object" && responses[property].options && responses[property].options.length > 4) {
                                        return (
                                            <div className={"col-md-auto col-12 mb-3"} key={"input3" + index}>
                                                <div className={"card"}>
                                                    <div className={"card-body"}>
                                                        <h6>{property.toUpperCase()}</h6>
                                                        <Select
                                                            handleChange={({currentTarget}) => this.handleChange(currentTarget.name, currentTarget.value)}
                                                            name={property} label={property}
                                                            currentValue={responses[property].value}
                                                            options={responses[property].options}/>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else if (typeof responses[property] === "string") {
                                        return (
                                            <div className={"col-md-auto col-12 mb-3"} key={"input4" + index}>
                                                <div className={"card"}>
                                                    <div className={"card-body"}>
                                                        <h6>{property.toUpperCase()}</h6>
                                                        <Input name={property} value={responses[property]}
                                                               onChange={(e) => this.handleChange(property, e.target.value)}
                                                               placeholder={""} type={"text"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else if (typeof responses[property] === "number") {
                                        return (
                                            <div className={"col-md-auto col-12 mb-3"} key={"input5" + index}>
                                                <div className={"card"}>
                                                    <div className={"card-body"}>
                                                        <h6>{property.toUpperCase() + "HOOD TO PAY"}</h6>
                                                        <Input name={property} value={responses[property]}
                                                               onChange={(e) => this.handleChange(property, Number(e.target.value))}
                                                               placeholder={""} className={"form-range"}
                                                               type={"range"}
                                                               step={1} max={5}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return <Fragment/>
                                })}

                            </div>

                            <div className={"d-flex justify-content-center"}>
                                <button type={"submit"}
                                        className="btn btn-outline-primary mx-4 btn-lg">Submit &amp; Next
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
