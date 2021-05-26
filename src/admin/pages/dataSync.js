import React, {Component} from 'react';
import Header from "../../layout/header";
import axios from "../../services/http";
import {baseUrl} from "../../config.json";
import {toast} from "react-toastify";
import classNames from "classnames";
import {v1} from "uuid";

class DataSync extends Component {

    state = {
        list: [],
        page: 1
    }

    fetchData = async (page) => {
        let state = {...this.state};
        try {
            let {data} = await axios.post(baseUrl + "/bulk/list/" + page);

            if (Array.isArray(data) && data.length) {
                if (page !== 1)
                    state.list = [...state.list, ...data];
                else
                    state.list = data;
                state.page = page;
                this.setState(state);
            }
        } catch (e) {
            console.log(e);
            toast("Could not load data list", {
                type: "error"
            })
        }
    }

    async componentDidMount() {
        await this.fetchData(1);
    }

    handleDataSourceChange = async (id) => {

        if (!window.confirm("Do you want to change the datasource.")) {
            return;
        }

        try {
            await axios.post(baseUrl + "/bulk/set/" + id);

            toast("DataSource Changed", {
                type: "success"
            })

            await this.fetchData(1);
        } catch (e) {
            console.log(e);
            toast("Could change data source", {
                type: "error"
            })
        }
    }

    async handlePageChange() {
        let {page} = this.state;
        await this.fetchData(page + 1);
    }

    render() {

        const {list,} = this.state;

        return (
            <div className={"container"}>
                <Header preTitle={"Data"} title={"Sync"}/>

                <table className="table table-sm table-nowrap">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date Added</th>
                        <th scope="col">Tag</th>
                        <th scope="col">Used</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {list.length &&
                    list.map((item, index) => {

                        const {id, status, popIndex, tag, createdAt, data} = item;
                        let timestamp = Date.parse(createdAt);

                        let date = new Date(timestamp);
                        return (
                            <tr key={v1()}>
                                <th scope="row">{index + 1}</th>
                                <td>{date.toDateString() + " " + date.toLocaleTimeString()}</td>
                                <td>{tag}</td>
                                <td>{popIndex}</td>
                                <td>{data}</td>
                                <td>
                                <span className={classNames("badge", {
                                    "bg-success": status,
                                    "bg-danger": !status
                                })}>{status ? "Active" : "Inactive"}</span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-rounded-circle btn-outline-info"
                                            onClick={(e) => this.handleDataSourceChange(id)}
                                    >
                                        <i className={"fa fa-plus"}/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>

                <nav aria-label="Page navigation example" className={"w-100"}>
                    <ul className="pagination mx-auto justify-content-center">
                        <li className="page-item">
                            <a className="page-link"
                               style={{
                                   cursor: "pointer"
                               }}
                               onClick={(e) => {
                                   e.preventDefault();
                                   this.handlePageChange()
                               }}
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
        );
    }
}

export default DataSync;