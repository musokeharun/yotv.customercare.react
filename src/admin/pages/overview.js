import React, {Component, Fragment} from "react";
import axios from "../../services/http";
import {baseUrl} from "../../config.js";
import {startLoad, stopLoad} from "../../main";
import Header from "../../layout/header";
import BarChart from "../charts/BarChart";
import Donut from "../charts/Donut";
import Column from "../charts/Column";
import Others from "../charts/Others";
import Area from "../charts/Area";
import $ from "jquery";
import {element} from "prop-types";


class Overview extends Component {
    state = {
        data: {}
    };

    async componentDidMount() {
        startLoad();
        let {data} = await axios.post(baseUrl + "/admin/dashboard");
        let state = {...this.state};
        state.data = data;
        this.setState(state);
        stopLoad();

        let $chart = $(".chart-div");
        let height = $chart.toArray().reduce((p, c) => p > $(c).outerHeight() ? p : $(c).outerHeight(), 0);
        console.log(height);
        $chart.each((index, element) => {
            $(element).outerHeight(height);
        })
    }

    render() {
        const {today, yesterday, lastWeek, usage, total} = this.state.data;

        if (!today && !yesterday && !lastWeek) {
            return <Fragment/>;
        }

        console.log(today);
        const totalCalled = today.gender.reduce((i, c) => i + Number(c.value), 0) || 0;

        stopLoad();
        return (
            <Fragment>
                <Header preTitle={"Home"} title={"Overview"}/>

                {/*STATIC FIGURES*/}
                <div className="row g-5 px-md-3">
                    <div className="col-12 col-lg-6 col-xl h-100">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted mb-2">TODAY</h6>
                                        <span className="h2 mb-0"> {today.total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl h-100">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="row g-0">
                                            <div className="col-6 text-center">
                                                <h6 className="text-uppercase text-muted">
                                                    Male
                                                </h6>
                                                <h2 className="mb-0"
                                                    title={today.gender[0] ? today.gender[0]['value'] : 0}>{Math.round(((today.gender[0] ? today.gender[0]['value'] : 0) / totalCalled) * 100)}%</h2>
                                            </div>
                                            <div className="col-6 text-center">
                                                <h6 className="text-uppercase text-muted">
                                                    FeMale
                                                </h6>
                                                <h2 className="mb-0"
                                                    title={today.gender[1] ? today.gender[1]['value'] : 0}>{Math.round(((today.gender[1] ? today.gender[1]['value'] : 0) / totalCalled) * 100)}%</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl h-100">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted mb-2">USAGE</h6>
                                        <span
                                            className="h2 mb-0"> {usage.toLocaleString()} / {total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*GRAPHS*/}
                <h1 className={"text-muted px-md-5"}>Today</h1>
                <div className={"row g-3 px-md-3"}>

                    <div className={"col-lg-7 chart-div col-md-6 col-12"}>
                        <BarChart title={"Calls"}
                                  toggler={true}
                                  toggleText={"Comparison"}
                                  data={[today['totalCalls'], today['customerCalls'], "Total", "Calls"]}
                                  toggleData={yesterday['customerCalls']}/>
                    </div>

                    <div className={"col-lg-5 chart-div col-md-6 col-12 h-100"}>
                        <Donut title={"Device Availability"}
                               data={today['deviceAvailability']}
                        />
                    </div>


                    <div className={"col-lg-7 chart-div col-md-6 col-12"}>
                        <Column title={"Responses"}
                                data={today['customerResponse']}
                        />
                    </div>

                    <div className={"col-lg-5 chart-div col-md-6 col-12 h-100"}>
                        <Donut title={"LikelyHood"}
                               data={today['likely']}
                        />
                    </div>

                    <div className={"chart-div col-md-6 col-lg"}>
                        <Others title={"Others"} property={"other"} list={today["othersLog"]}/>
                    </div>
                    <div className={"chart-div col-md-6 col-lg"}>
                        <Others title={"Resolutions"} property={"resolution"} list={today["resolution"]}/>
                    </div>
                    <div className={"chart-div col-md-6 col-lg"}>
                        <Others title={"Suggestions"} property={"suggestion"} list={today["suggestions"]}/>
                    </div>

                </div>

                {/*YESTERDAY*/}
                <h1 className={"text-muted px-md-5"}>Yesterday</h1>
                <div className={"row g-3 px-md-3"}>

                    <div className={"col-lg-7 chart-div col-md-6 col-12"}>
                        <BarChart title={"Calls"}
                                  data={[yesterday['totalCalls'], yesterday['customerCalls'], "Total", "Calls"]}
                        />
                    </div>

                    <div className={"col-lg-5 chart-div col-md-6 col-12 h-100"}>
                        <Donut title={"Device Availability"}
                               data={yesterday['deviceAvailability']}
                        />
                    </div>

                </div>

                {/*YESTERDAY*/}
                <h1 className={"text-muted px-md-5"}>Past Week</h1>
                <div className={"row g-3 px-md-3"}>
                    <div className={"col-12 chart-div"}>
                        <Area title={"Total Calls"} data={lastWeek['totals']}/>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default Overview;
