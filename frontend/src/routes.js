import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/login';
import Dashboard from './pages/Dashboard/dashboard';
import Spot from './pages/Spot/spot';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/spot' component={Spot} />
            </Switch>
        </BrowserRouter>
    );
}