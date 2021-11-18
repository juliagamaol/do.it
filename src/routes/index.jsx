import { Route,Switch } from "react-router";

import React from 'react'
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signUp" component={SignUp}/>
        </Switch>
    )
}
