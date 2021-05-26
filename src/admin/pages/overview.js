import React, {Component, Fragment} from "react";
import axios from "../../services/http";
import {baseUrl} from "../../config.json";
import {v1} from "uuid";
import {startLoad, stopLoad} from "../../main";
import ReactApexChart from "react-apexcharts";
import Header from "../../layout/header";

class Overview extends Component {
    state = {
        statics: [],
        graphs: [],
    };

    async componentDidMount() {
        startLoad();

        let {data} = await axios.post(baseUrl + "/admin/dashboard");
        let state = {...this.state};

        Object.getOwnPropertyNames(data).forEach((p) => {
            if (typeof data[p] !== "object") {
                state.statics.push({
                    key: p,
                    value: data[p],
                });
            } else {
                state.graphs.push(data[p]);
            }
        });
        this.setState(state);
        stopLoad();
        // setInterval(() => {
        //     this.forceUpdate()
        // }, 180000);
    }

    render() {
        const {statics, graphs} = this.state;
        console.log(statics);

        return (
            <Fragment>
                <Header preTitle={"Home"} title={"Overview"}/>
                <div className="row g-5 px-md-3">
                    {!!statics &&
                    statics.map(({key, value}) => (
                        <div className="col-12 col-lg-6 col-xl" key={v1()}>
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
                <div className={"row g-3 mx-md-2"}>
                    {!!graphs &&
                    graphs.map((graph, index) => {
                        const {data, title, type, x, y} = graph;
                        const labels = [];
                        const values = [];
                        data.forEach(({label, value}) => {
                            labels.push(label);
                            values.push(value);
                        });
                        let demo = {};
                        let style = "";

                        if (type === "bar") {
                            demo = {
                                series: [
                                    {
                                        name: y,
                                        data: values,
                                    },
                                ],
                                options: {
                                    chart: {
                                        type: "bar",
                                    },
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            endingShape: "rounded",
                                            columnWidth: "20%",
                                            borderRadius: 4,
                                        },
                                    },
                                    colors: [
                                        "#403294",
                                        "#f3b53e",
                                        "#55bb89",
                                        "#df3323",
                                        "#67e4ed",
                                    ],

                                    dataLabels: {
                                        enabled: false,
                                    },
                                    stroke: {
                                        show: true,
                                        width: 2,
                                        colors: ["transparent"],
                                    },
                                    xaxis: {
                                        categories: labels,
                                        labels: {
                                            formatter: function (value, timestamp, opts) {
                                                if (value.includes("@"))
                                                    return value
                                                        .substr(0, value.indexOf("@"))
                                                        .toUpperCase();
                                                return value;
                                            },
                                        },
                                    },
                                    yaxis: {
                                        title: {
                                            text: y,
                                        },
                                    },
                                    fill: {
                                        opacity: 1,
                                    },
                                },
                            };
                            style = "bar";
                            return (
                                <div className={"col-md-6"} key={index}>
                                    <div className="card shadow mb-5">
                                        <div className="card-header">
                                            <h4 className="card-header-title">{title}</h4>
                                        </div>
                                        <div className="card-body">
                                            <ReactApexChart
                                                options={demo.options}
                                                series={demo.series}
                                                type={style}
                                                height={350}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (type === "donut") {
                            demo = {
                                series: values,
                                options: {
                                    labels: labels,
                                    chart: {
                                        type: "donut",
                                        height: "400px",
                                    },
                                    colors: [
                                        "#403294",
                                        "#f3b53e",
                                        "#55bb89",
                                        "#df3323",
                                        "#67e4ed",
                                    ],
                                },
                            };
                            style = "donut";
                            return (
                                <div className={"col-md-6"} key={index}>
                                    <div className="card shadow mb-5">
                                        <div className="card-header">
                                            <h4 className="card-header-title">{title}</h4>
                                        </div>
                                        <div className="card-body">
                                            <ReactApexChart
                                                options={demo.options}
                                                series={demo.series}
                                                type={style}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (type === "area") {
                            demo = {
                                series: [
                                    {
                                        name: y,
                                        data: values,
                                    },
                                ],
                                options: {
                                    chart: {
                                        type: "area",
                                        height: 350,
                                        zoom: {
                                            enabled: false,
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false,
                                    },
                                    stroke: {
                                        curve: "smooth",
                                    },
                                    labels: labels,
                                    xaxis: {
                                        type: "datetime",
                                    },
                                    yaxis: {
                                        opposite: false,
                                    },
                                    legend: {
                                        horizontalAlign: "left",
                                    },
                                },
                            };
                            return (
                                <div className={"col-md-6"} key={index}>
                                    <div className="card shadow mb-5">
                                        <div className="card-header">
                                            <h4 className="card-header-title">{title}</h4>
                                        </div>
                                        <div className="card-body">
                                            <ReactApexChart
                                                options={demo.options}
                                                series={demo.series}
                                                type={"area"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </Fragment>
        );
    }
}

export default Overview;
