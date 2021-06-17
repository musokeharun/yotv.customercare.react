import React, {Component} from "react";
import {v1} from "uuid";
import Axios from "../services/http";
import {baseUrl} from "../config.js";
import {toast} from "react-toastify";
import Radio from "../components/common/Radio";
import Select from "../components/common/select";
import Input from "../components/common/input";
import {startLoad, stopLoad} from "../main";
import TopNav from "../layout/TopNav";
import RadioButton from "../components/common/RadioButton";
import $ from "jquery";

export default class User extends Component {

    state = {
        responses: {},
        number: "0000000000",
        id: 0,
        others: {},
        data: {
            availability: "",
            gender: "",
            likely: 0,
            other: "",
            suggestion: "",
            resolution: "",
            subCategoryId: ""
        },
        vendor: "",
        category: ""
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        startLoad();
        let {data, number, id} = {...this.state};
        data['firstResponse'] = data.availability;
        data.id = id;
        data.contact = number;

        if (number.startsWith("00000"))
            return await this.fetchNumber();

        try {
            await Axios.post(baseUrl + "/user/response", data);
            this.reset();
            await this.fetchNumber();
        } catch (e) {
            console.log(e);
            toast("Could not respond,Please check the responses.", {
                type: "error"
            })
        } finally {
            stopLoad();
        }
    };

    reset = () => {
        let state = {...this.state};
        state.category = "";
        Object.getOwnPropertyNames(state.data).forEach(prop => {

            if (prop.toUpperCase() === "LIKELY")
                state.data[prop] = 0;
            else
                state.data[prop] = "";

        });
        this.setState(state);
    };

    fetchNumber = async () => {

        let vendor = this.state.responses['vendors'].find(v => v.title === this.state.vendor);
        try {
            let {data} = await Axios.post(baseUrl + "/user/call" + (vendor ? `?v=${vendor.id}` : ""));
            let {contact, id, others} = data;

            let state = {...this.state};
            state.number = contact;
            state.id = id;
            if (others)
                state.others = others;

            toast("Number Added", {
                type: "info"
            })

            this.setState(state);
        } catch (e) {
            console.log(e)
            toast("Could not add new number, may be re::login", {
                type: "error"
            });
        } finally {
            stopLoad();
        }
    };

    handleChange = (name, value, surface = false, alterState) => {
        let state = {...this.state};

        if (surface) {
            state[name] = value;
        } else {
            state.data[name] = value;
        }

        if (alterState)
            state = alterState(state);

        // console.log(state);
        this.setState(state);
        let availability = state.data.availability;
        console.log(availability);
        if (availability.toUpperCase() !== "RECEIVED")
            this.otherFadeAway();
        else this.otherFadeAway(false);
    };

    async componentDidMount() {
        let {data} = await Axios.post(baseUrl + "/user/options");
        let response = data;
        let state = {...this.state};
        state.responses = response;
        this.setState(state);
        this.otherFadeAway();
    }

    otherFadeAway = (fadeAway = true) => {
        let $other = $("#other");
        fadeAway ? $other.fadeOut() : $other.fadeIn();
    };

    render() {
        let {number, responses, others, data, vendor, category} = this.state;
        // const {email} = this.props;
        console.log(this.state);

        let numberArray = [];

        if (number) {

            if (number.substr(0, 3) === "256") {
                number = "0" + number.substr(3);
            }

            for (let i = 0; i < number.length; i++) {
                numberArray.push(number.charAt(i));
            }
        }


        let responsesLength = Object.getOwnPropertyNames(responses).length;
        let currentCategory = responses['categories'] ? responses['categories'].find(c => Number(c.id) === Number(category)) : {};
        let subCategories = currentCategory ? currentCategory['subCategories'] : [];
        console.log("Cat", data.subCategoryId);
        return (
            <div className="main-content">
                <TopNav/>
                <div className="container-fluid">
                    <form id={"appForm"} onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="content fs-6 d-flex flex-column flex-column-fluid">

                            {/*NUMBER*/}
                            <div className={"card my-2"}>
                                <div
                                    className={"row justify-content-center align-items-center rounded bg-transparent"}>

                                    {!!numberArray.length &&
                                    numberArray.map(i => (
                                        <div
                                            key={v1()}
                                            className="col-auto flex-center px-3 text-hover-inverse-primary bg-hover-primary align-middle">
                                            <h1 className={"display-1"}>{i}</h1>
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className={"mx-auto d-inline-block"}>

                                    {
                                        !!others && Object.getOwnPropertyNames(others).map(p => (
                                            <span key={v1()} className={"badge bg-primary-soft float-left"}>{p}:{
                                                (typeof others[p] === "string" && others[p].includes("-")) ? new Date(others[p]).toDateString() : others[p]
                                            }</span>
                                        ))
                                    }

                                </div>
                            </div>

                            {
                                !!responsesLength &&
                                <div className="card">
                                    <div className="card-body">

                                        <div className="btn-group-toggle mx-auto d-flex justify-content-center">

                                            {
                                                responses["availability"].map((option, i) =>
                                                    (
                                                        <RadioButton value={option}
                                                                     name={"availability"}
                                                                     key={"availabilityQ" + i}
                                                                     currentValue={data.availability}
                                                                     handleChange={(name, value) => this.handleChange(name, value)}
                                                        />
                                                    )
                                                )
                                            }

                                        </div>

                                    </div>
                                </div>
                            }
                            <div id={"other"} className={"other w-100"}>
                                {
                                    !!responsesLength &&
                                    <div className={"card"}>
                                        <div className={"row my-md-2 my-1 justify-content-between px-2"}>

                                            <div className={"col-md-6 col-12 mb-3"}>

                                                <div className="card bg-transparent shadow-none border-0 border-end">
                                                    <div className="card-header ">
                                                        <h4 className="card-header-title ">
                                                            Gender
                                                        </h4>
                                                    </div>
                                                    <div className="card-body border-0">
                                                        <div
                                                            className="btn-group-toggle mx-auto d-flex justify-content-center">

                                                            {
                                                                responses["gender"].map((option, i) =>
                                                                    (
                                                                        <RadioButton value={option}
                                                                                     name={"gender"}
                                                                                     key={"gender" + i}
                                                                                     currentValue={data.gender}
                                                                                     handleChange={(name, value) => this.handleChange(name, value)}
                                                                        />
                                                                    )
                                                                )
                                                            }

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className={"col-md-6 col-12 mb-3"}>

                                                <div className="card bg-transparent shadow-none border-0">
                                                    <div className="card-header ">
                                                        <h4 className="card-header-title ">
                                                            Likely
                                                        </h4>
                                                    </div>
                                                    <div className="card-body border-0 py-1">

                                                        <Input name={"likely"} value={data.likely}
                                                               onChange={(e) => this.handleChange("likely", Number(e.target.value))}
                                                               placeholder={""} className={"form-range"}
                                                               type={"range"}
                                                               step={1} max={5}
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className={"col-md-6 col-12 mb-3"}>

                                                <div className="card bg-transparent shadow-none border-0">
                                                    <div className="card-header ">
                                                        <h4 className="card-header-title ">
                                                            Category
                                                        </h4>
                                                    </div>
                                                    <div className="card-body border-0">

                                                        <Select
                                                            handleChange={({currentTarget}) => this.handleChange(currentTarget.name, currentTarget.value, true, (state) => {
                                                                state.data.subCategoryId = null;
                                                                return state;
                                                            })}
                                                            name={"category"}
                                                            currentValue={category}
                                                            options={responses['categories'].map(i => ({
                                                                label: i.title,
                                                                value: i.id
                                                            }))}
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className={"col-md-6  col-12 mb-3"}>

                                                <div className="card bg-transparent shadow-none border-0">
                                                    <div className="card-header ">
                                                        <h4 className="card-header-title ">
                                                            SubCategory
                                                        </h4>
                                                    </div>
                                                    <div className="card-body border-0">

                                                        <Select
                                                            handleChange={({currentTarget}) => this.handleChange(currentTarget.name, currentTarget.value)}
                                                            name={"subCategoryId"}
                                                            currentValue={data.subCategoryId}
                                                            options={subCategories.map(i => ({
                                                                label: i.title,
                                                                value: i.id
                                                            }))}
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className={"col-md-6 col-lg-4 col-12 mb-3"}>

                                                <div className="card bg-transparent shadow-none border-0">
                                                    <div className="card-header ">
                                                        <h4 className="card-header-title ">
                                                            Resolution
                                                        </h4>
                                                    </div>
                                                    <div className="card-body border-0 py-1">

                                                        <Input name={"resolution"} value={data.resolution}
                                                               onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                                                               placeholder={"Type here ...."}
                                                               type={"text"}
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className={"col-md-6 col-lg-4 col-12 mb-3"}>

                                                <div className="card bg-transparent shadow-none border-0">
                                                    <div className="card-header ">
                                                        <h4 className="card-header-title ">
                                                            Suggestion
                                                        </h4>
                                                    </div>
                                                    <div className="card-body border-0 py-1">

                                                        <Input name={"suggestion"} value={data.suggestion}
                                                               onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                                                               placeholder={"Type here ...."}
                                                               type={"text"}
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className={"col-md-6 col-lg-4 col-12 mb-3"}>

                                                <div className="card bg-transparent shadow-none border-0">
                                                    <div className="card-header ">
                                                        <h4 className="card-header-title ">
                                                            Other
                                                        </h4>
                                                    </div>
                                                    <div className="card-body border-0 py-1">

                                                        <Input name={"other"} value={data.other}
                                                               onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                                                               placeholder={"Type here ...."}
                                                               type={"text"}
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                }
                            </div>

                            <div className={"d-flex justify-content-center"}>

                                <div className="btn-group mb-3" role="group"
                                     aria-label="Button group with nested dropdown">
                                    <button type={"submit"}
                                            className="btn btn-outline-primary mx-4 btn-lg">Submit &amp; Next
                                    </button>
                                    {!!responsesLength &&
                                    <div className="btn-group" role="group">
                                        <button type="button"
                                                className="btn btn-secondary" data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                            Select Vendor
                                        </button>
                                        <div className="dropdown-menu">
                                            <div className={"bg-transparent"}>
                                                <div className={"card-body"}>
                                                    <div className={"flex-row mt-md-3 mt-1"}>
                                                        {
                                                            responses["vendors"].map((option, i) =>
                                                                (
                                                                    <span title={JSON.stringify(option.codes)}>
                                                                        <Radio value={option.title}
                                                                               name={"vendor"}
                                                                               key={"vendor" + i}
                                                                               currentValue={vendor}
                                                                               handleChange={(name, value) => this.handleChange(name, value, true)}
                                                                        />
                                                                    </span>
                                                                )
                                                            )
                                                        }
                                                        <span title={"ANY"}>
                                                                        <Radio value={"ANY"}
                                                                               name={"vendor"}
                                                                               currentValue={vendor}
                                                                               handleChange={(name, value) => this.handleChange(name, value, true)}
                                                                        />
                                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                                `
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
