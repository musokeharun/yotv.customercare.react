import React, {Component, Fragment} from 'react';
import ReactApexChart from "react-apexcharts";

class BarChart extends Component {

    state = {
        toggled: false,
        options: {
            chart: {
                type: "bar",
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: "rounded",
                    columnWidth: "45%",
                    borderRadius: 5,
                },
            },
            colors: [
                "#b0c2e0","#2c7be5","rgba(44,123,229,0.39)"
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
                categories: [],
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
                    text: "",
                },
            },
            fill: {
                opacity: 1,
            },
        },
    };


    toggleSeries = () => {
        const state = {...this.state}
        state.toggled = !this.state.toggled;
        this.setState(state);
    };


    render() {
        const {toggled, options} = this.state;
        const {title, toggleText, toggler, data, toggleData} = this.props;
        console.log(data);

        options.xaxis.categories = data[0].map(i => i['label']);
        const series = [{name: data[2], data: data[0].map(i => i['value'])},{name: data[3], data: data[1].map(i => i['value'])}];
        if (toggled) {
            series.push({name: toggleText, data: toggleData.map(i => i['value'])});
        }

        return (
            <Fragment>
                <div className={"card shadow"}>
                    <div className="card-header">
                        <h4 className="card-header-title">{title}</h4>
                        {!!toggler &&
                        <Fragment>
                        <span
                            className="text-muted me-3">{toggleText}</span>
                            <div className="form-check form-switch">
                                <input className="form-check-input" checked={toggled} type="checkbox"
                                       onChange={e => this.toggleSeries()}/>
                            </div>
                        </Fragment>
                        }
                    </div>
                    <div className={"card-body"}>
                        <ReactApexChart
                            options={options}
                            series={series}
                            type={"bar"}
                            height={350}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default BarChart;