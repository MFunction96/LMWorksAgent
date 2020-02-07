/*
	Create by MFunction at 06/13/2019.
	The root of react page.
*/

import * as React from "react";
import {Route} from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import {HollowAtaraxia} from "./components/HollowAtaraxia"

import "./App.css";

export default () => (
	<Layout>
		<Route exact path='/' component={Home}/>
		<Route exact path='/HollowAtaraxia' component={HollowAtaraxia}/>
	</Layout>
);
