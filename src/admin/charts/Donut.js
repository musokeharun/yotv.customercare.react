import React, {Component, Fragment} from 'react';
import ReactApexChart from "react-apexcharts";

class Donut extends Component {

    state = {

    };

    render() {
        const {title} = this.props;
        const {options,series} = this.state;

        return (
            <Fragment>
                <div className="card shadow mb-5">
                    <div className="card-header">
                        <h4 className="card-header-title">{title}</h4>
                    </div>
                    <div className="card-body">
                        <ReactApexChart
                            options={options}
                            series={series}
                            type={"donut"}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Donut;