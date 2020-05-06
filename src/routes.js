import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import Home from './pages/Home';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Cases from './pages/Cases';
import EditCase from './pages/EditCase';
import NewIncident from './pages/NewCase';
import Politics from './pages/Politics';
import Messages from './pages/Messages';
import ListCases from './pages/ListCases';
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/login" component={Logon} />
                <Route path="/category/" exact component={Home} />
                <Route path="/category/cases/:id" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/cases/new" exact component={NewIncident} />
                <Route path="/cases/:id" exact component={Cases} />
                <Route path="/cases/:id" exact component={Cases} />
                <Route path="/cases/edit/:id" component={EditCase} />
                <Route path="/listcases" component={ListCases} />
                <Route path="/policy" component={Politics} />
                <Route path="/messages/:id" component={Messages} />               
            </Switch>
        </BrowserRouter>
        );
}