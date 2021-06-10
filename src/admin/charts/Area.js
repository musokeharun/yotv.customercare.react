import React, {Component, Fragment} from 'react';
import ReactApexChart from "react-apexcharts";


class Area extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                colors: [
                    "#2c7be5",
                ],
                tickPlacement: "on",
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: []
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },


        };
    }


    render() {
        const {options} = this.state;
        const {title, data} = this.props;

        options.xaxis.categories = data.map(i => i['label']);
        const series = [{name: title, data: data.map(i => i['value'])}];
        return (
            <Fragment>
                <div className="card shadow">
                    <div className="card-header">
                        <h4 className="card-header-title">{title}</h4>
                    </div>
                    <div className={"card-body"}>
                        <ReactApexChart options={options} series={series} type="area" height={350}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Area;