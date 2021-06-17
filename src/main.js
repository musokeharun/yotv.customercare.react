import React, {Fragment, useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Admin from "./admin";
import Loader from "react-loader-spinner";
import {getToken} from "./auth/auth";
import Login from "./auth/login";
import User from "./user";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/theme.bundle.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Main() {

    useEffect(() => {
        stopLoad();
    });
    return (
        <Fragment>
            <div id={"loader"}
                 className={"min-vh-100"}
                 style={{position: "fixed", top: "40vh", left: "45vw", zIndex: "2500"}}
            >
                <Loader
                    type="Grid"
                    color="#000"
                    height={100}
                    width={100}
                    timeout={0}
                />
            </div>
            <Switch>
                <Route path="/login" render={(props) => <Login {...props} />} exact/>
                <Route path="/admin" render={(props) => {
                    let token1 = getToken();
                    if (!token1) return <Redirect to={"/login"}/>;
                    return <Admin {...props} />;
                }}/>
                <Route path="/app" render={(props) => {
                    if (!getToken()) return <Redirect to={"/login"}/>;
                    return <User {...props} />;
                }}
                />
                <Redirect to={"/app"}/>
            </Switch>
        </Fragment>
    );
}

export const startLoad = () => {
    document.getElementById("loader").style.display = "";
    setTimeout(function () {
        stopLoad()
    }, 15000)
}

export const stopLoad = () => {
    document.getElementById("loader").style.display = "none";
};

export default Main;
