import React from 'react';
import {HashRouter, Route, NavLink} from 'react-router-dom'
import Me from './me/Index'
import Shop from './shop/Index'
import Home from './home/Index';

const Index = () =>
    <HashRouter>
        <div>
            <div className="nav">
                <NavLink to="/Home" activeClassName="selected" exact>首页</NavLink>&nbsp;
                <NavLink to="/Shop" activeClassName="selected" exact>商城</NavLink>&nbsp;
                <NavLink to="/Me" activeClassName="selected" exact>个人中心</NavLink>
            </div>
            <Route path="/Shop" component={Shop}/>
            <Route path="/Me" component={Me}/>
            <Route path="/Home" component={Home}/>
        </div>
    </HashRouter>

export default Index;