import React, {Component, Fragment} from 'react';
import ReactApexChart from "react-apexcharts";

class Donut extends Component {

    state = {
        options: {
            labels: [],
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
            options : {
                donut : {
                    size : "100%",
                }
            }
        }
    };

    render() {
        const {title,data} = this.props;
        const {options} = this.state;
        options.labels = data.map(i => i['label']);
        const series = data.map(i => i['value']);

        return (
            <Fragment>
                <div className="card shadow">
                    <div className="card-header">
                        <h4 className="card-header-title">{title}</h4>
                    </div>
                    <div className="card-body">
                        <ReactApexChart
                            options={options}
                            series={series}
                            type={"donut"}
                            height={360}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Donut;