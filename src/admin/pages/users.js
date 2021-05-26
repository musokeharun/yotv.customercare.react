import React, {Component} from 'react';
import axios from "../../services/http";
import {baseUrl} from "../../config.json";
import {toast} from "react-toastify";
import {v1} from "uuid";
import Header from "../../layout/header";

class Users extends Component {

    state = {
        users: []
    }


    async componentDidMount() {
        try {
            let {data} = await axios.post(baseUrl + "/admin/users");

            let state = {...this.state};
            state.users = data;
            this.setState(state);

        } catch (e) {
            console.log(e);
            toast("Could not load users", {
                type: "error"
            })
        }

    }


    render() {

        const {users} = this.state;

        return (
            <div className={"container"}>
                <Header preTitle={"Users"} title={"All"}/>
                <div className={"w-100 px-md-3"}>
                    <table className="table table-sm table-nowrap table-hover table-rounded gy-7 gs-7 w-100">
                        <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                            <td scope="col">#</td>
                            <th scope="col">User</th>
                            <th scope="col">Date Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !!users && users.map((user, index) => (
                                <tr scope="row" key={v1()}>
                                    <td>{++index}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(Date.parse(user.createdAt.toString())).toDateString()}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Users;