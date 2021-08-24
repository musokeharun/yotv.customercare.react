import React, {useEffect, useState} from 'react';
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import Header from "../../layout/header";
import http from "../../services/http";
import {baseUrl} from "../../config";
import Swal from 'sweetalert2'
import {exportCSVFile} from "../../services/csv";

const fetchApi = async (date = "") => {
    return await http.get(baseUrl + "/admin/freetrial/generate?day=" + date);
}

const FreeTrial = () => {

    const [date, setDate] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        let effect = async () => {

            if (!date) return;

            let mixin = Swal.mixin({title: 'Loading', position: 'top-end',});
            Swal.showLoading();

            let {data: users} = await fetchApi(date.getTime())

            const headers = {
                msisdn: "msisdn",
                created: "created",
                amount: "amount",
                id: 'ID'.replace(/,/g, ''), // remove commas to avoid errors
                subscribed: "subscribed"
            };

            const itemsFormatted = users.map(user => {
                return {
                    msisdn: "256" + user['Contact'].slice(1),
                    created: user['Created'],
                    amount: 0,
                    id: user['ID'],
                    subscribed: user['subscription'].length === 2 ? user['subscription'][1]['From'] : "N/A"
                }
            });

            let fileTitle = date.toDateString();
            exportCSVFile(headers, itemsFormatted, fileTitle);
            mixin.close();
            setData(users);
        };
        effect();
    }, [date,])

    return (
        <div className={"container-fluid w-100"}>
            <Header preTitle={"Extract"} title={"Free Trial"}/>
            <div className={"row justify-content-center align-items-center"}>
                <div className={"col-5"}>
                    <h4 className={"text-right"}>Pick a day</h4>
                </div>
                <div className={"col-5"}>
                    <Flatpickr
                        className={"form-control"}
                        value={date}
                        onChange={([date]) => {
                            console.log(date, typeof date, date.toLocaleString())
                            setDate(date);
                        }}
                    />
                </div>
            </div>
            <div className={"row py-2 px-2"}>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Created</th>
                        <th scope="col">Created</th>
                        <th scope="col">Subscribed At</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default FreeTrial;