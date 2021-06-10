import React, {Component, Fragment} from "react";
import axios from "../../services/http";
import {baseUrl} from "../../config.json";
import {startLoad, stopLoad} from "../../main";
import Header from "../../layout/header";
import {v1} from "uuid";
import BarChart from "../charts/BarChart";
import Donut from "../charts/Donut";
import Column from "../charts/Column";
import Others from "../charts/Others";
import Area from "../charts/Area";


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
    }

    render() {
        const {today, yesterday, lastWeek, usage, total} = this.state.data;

        if (!today && !yesterday && !lastWeek) {
            return <Fragment/>;
        }

        const statics = [
            {key: "today", value: today.total},
            {key: "usage", value: usage},
            {key: "total", value: total}
        ];

        stopLoad();
        return (
            <Fragment>
                <Header preTitle={"Home"} title={"Overview"}/>

                {/*STATIC FIGURES*/}
                <div className="row g-5 px-md-3">
                    {!!statics &&
                    statics.map(({key, value}) => (
                        <div className="col-12 col-lg-6 col-xl h-100" key={v1()}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-muted mb-2">{key.toUpperCase()}</h6>
                                            <span className="h2 mb-0"> {value.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/*GRAPHS*/}
                <h1 className={"text-muted px-md-5"}>Today</h1>
                <div className={"row g-3 px-md-3"}>

                    <div className={"col-lg-7  col-md-6 col-12"}>
                        <BarChart title={"Calls"}
                                  toggler={true}
                                  toggleText={"Comparison"}
                                  data={today['customerCalls']}
                                  toggleData={yesterday['customerCalls']}/>
                    </div>

                    <div className={"col-lg-5  col-md-6 col-12 h-100"}>
                        <Donut title={"Device Availability"}
                               data={today['deviceAvailability']}
                        />
                    </div>


                    <div className={"col-lg-8  col-md-6 col-12"}>
                        <Column title={"Responses"}
                                data={today['customerResponse']}
                        />
                    </div>

                    <div className={"col-lg-4 col-md-6 col-12"}>

                        <Others title={"Others"} list={today["othersLog"]}/>

                    </div>

                </div>


                {/*YESTERDAY*/}
                <h1 className={"text-muted px-md-5"}>Yesterday</h1>
                <div className={"row g-3 px-md-3"}>

                    <div className={"col-lg-7 col-md-6 col-12"}>
                        <BarChart title={"Calls"}
                                  data={yesterday['customerCalls']}
                        />
                    </div>

                    <div className={"col-lg-5 col-md-6 col-12 h-100"}>
                        <Donut title={"Device Availability"}
                               data={yesterday['deviceAvailability']}
                        />
                    </div>

                </div>

                {/*YESTERDAY*/}
                <h1 className={"text-muted px-md-5"}>Past Week</h1>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <Area title={"Total Calls"} data={lastWeek.totals}/>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default Overview;
