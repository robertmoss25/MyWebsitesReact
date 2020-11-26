import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import About from "./components/About";
import Search from "./components/Search";
import AddNewWebsite from "./components/AddNewWebsite";
import Home from "./components/Home";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/About" component={About} />
                    <Route path="/Search" component={Search} />
                    <Route path="/AddNewWebsite" component={AddNewWebsite} />
                </Switch>
            </Router>
        )
    }
}