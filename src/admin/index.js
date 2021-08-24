import React, {Fragment} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import SideIcons from "../layout/sideIcons";
import Users from "./pages/users";
import UserAdd from "./pages/userAdd";
import NoCalled from "./pages/notCalled";
import Overview from "./pages/overview";
import DataSync from "./pages/dataSync";
import Reports from "./pages/reports";
import FreeTrial from "./pages/freeTrial";

function Admin() {

    return (
        <Fragment>
            <SideIcons/>
            <div className="main-content">
                <div className="container-fluid">
                    <Switch>
                        <Route path={"/admin/reports/"} render={() => <Reports/>}/>
                        <Route path={"/admin/users/add"} exact component={UserAdd}/>
                        <Route path={"/admin/users/"} exact component={Users}/>
                        <Route path={"/admin/not/called/file/"} exact component={NoCalled}/>
                        <Route path={"/admin/overview"} exact render={() => <Overview/>}/>
                        <Route path={"/admin/data/sync"} exact render={() => <DataSync/>}/>
                        <Route path={"/admin/data/free-trial"} exact render={() => <FreeTrial/>}/>
                        <Redirect to={"/app"}/>
                    </Switch>
                </div>
            </div>
        </Fragment>
    );
}

export default Admin;
