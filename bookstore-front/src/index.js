import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import {Provider} from "react-redux";
import {createBrowserHistory} from 'history';
import 'antd-mobile/dist/antd-mobile.css'; 

import Main from "./containers/main/main.jsx";
import Register from "./containers/register/register.jsx";
import Login from "./containers/login/login.jsx";
import Mine from "./containers/mine/mine.jsx";
import ModifyPass from "./containers/modify-pass/modify-pass.jsx";
import HistoryOrders from "./containers/history-orders/history-orders";
import BookDetails from "./containers/book-details/book-details";
import Sys from "./containers/sys/sys";
import Buy from "./containers/buy/buy";
import Chart from "./containers/chart/chart";
import Success from "./containers/success/success";
import Fail from "./containers/fail/fail";

import "./sass/index.scss";
export const history = createBrowserHistory();
ReactDOM.render(
    <Provider store={store} history={history}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/mine" component={Mine}/>
                <Route exact path="/modifypass" component={ModifyPass}/>
                <Route exact path="/historyorders" component={HistoryOrders}/>
                <Route exact path="/bookdetails" component={BookDetails}/>
                <Route exact path="/sys" component={Sys}/>
                <Route exact path="/chart" component={Chart}/>
                <Route exact path="/buy" component={Buy}/>
                <Route exact path="/success" component={Success}/>
                <Route exact path="/fail" component={Fail}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
