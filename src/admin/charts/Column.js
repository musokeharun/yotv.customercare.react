import React, {Fragment} from "react";
import ReactApexChart from "react-apexcharts";

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: [],
                },
                colors: [
                    "#2c7be5",
                ],
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
                        <ReactApexChart options={options} series={series} type="bar" height={350}/>
                    </div>
                </div>
            </Fragment>);
    }
}

export default Column;