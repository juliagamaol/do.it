import { Route,Switch } from "react-router";

import React, { useEffect, useState } from 'react'
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard"

export default function Routes() {
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("@Doit:token"))

        if(token){
            return setAuthenticated(true)
        }
    },[authenticated])

    return (
        <Switch>
            <Route exact path="/">
                <Home authenticated={authenticated}/>
            </Route>
            <Route path="/login">
                <Login 
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}/>
            </Route>
            <Route path="/signUp">
                <SignUp authenticated={authenticated}/>
            </Route>
            <Route path="/dashboard">
                <Dashboard authenticated={authenticated}/>
            </Route>
        </Switch>
    )
}
