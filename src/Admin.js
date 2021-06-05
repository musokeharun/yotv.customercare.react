import React, {Fragment} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import SideIcons from "./layout/sideIcons";
import Users from "./admin/pages/users";
import UserAdd from "./admin/pages/userAdd";
import NoCalled from "./admin/pages/notCalled";
import Overview from "./admin/pages/overview";
import DataSync from "./admin/pages/dataSync";

function Admin() {

    return (
        <Fragment>
            <SideIcons/>
            <div className="main-content">
                <div className="container-fluid">
                    <Switch>
                        <Route path={"/admin/users/add"} exact component={UserAdd}/>
                        <Route path={"/admin/users/"} exact component={Users}/>
                        <Route path={"/admin/not/called/file/"} exact component={NoCalled}/>
                        <Route path={"/admin/overview"} exact render={() => <Overview/>}/>
                        <Route path={"/admin/data/sync"} exact render={() => <DataSync/>}/>
                        <Redirect to={"/app"}/>
                    </Switch>
                </div>
            </div>
        </Fragment>
    );
}

export default Admin;
