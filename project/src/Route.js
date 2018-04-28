import React, { Component } from 'react';
import './App.css'
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import history from './History';
import Home from './components/home.js';
import studentpage from './components/studentpage';
import companypage from './components/companypage';
import admin from './components/admin';
import Jobpost from './components/jobpost';
import Studentdata from './components/studentdata';
import Companydata from './components/companydata';
import Adminsignin from './components/adminsignin';
import StudentProfile from "./components/studentprofile"
import Companyprofile from "./components/companyprofile"
import MycompanyPostedJobs from "./components/mycompanypostedjobs"
import Notfound from './components/notFound';
import firebase from 'firebase'


function PrivateRoute2({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/companypage', state: { from: props.location } }} />}
        />
    )
}


function PrivateRoute3({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/studentpage', state: { from: props.location } }} />}
        />
    )
}


function PrivateRoute4({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/studentpage', state: { from: props.location } }} />}
        />
    )
}


function PrivateRoute5({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/companypage', state: { from: props.location } }} />}
        />
    )
}


function PrivateRoute6({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/companypage', state: { from: props.location } }} />}
        />
    )
}


function PrivateRoute7({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/adminsignin', state: { from: props.location } }} />}
        />
    )
}



function PrivateRoute8({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/companypage', state: { from: props.location } }} />}
        />
    )
}


class Routers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authed: false,
            loader: false,
        }
    }

    componentWillMount() {
        let that = this
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                that.setState({
                    authed: true,
                    loader: true,
                })
                let type = localStorage.getItem("type")
                let convertype = JSON.parse(type)
                if (convertype !== null) {
                    history.push(convertype)
                }
            }

            else {
                console.log(user)
                that.setState({
                    authed: false
                })
            }
        });
    }


    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/studentpage" component={studentpage} />
                        <Route path="/companypage" component={companypage} />
                        <Route path="/adminsignin" component={Adminsignin} />
                        <PrivateRoute2 authed={this.state.authed} path="/companydata" component={Companydata} />
                        <PrivateRoute3 authed={this.state.authed} path="/studentdata" component={Studentdata} />
                        <PrivateRoute4 authed={this.state.authed} path="/studentprofile" component={StudentProfile} />
                        <PrivateRoute5 authed={this.state.authed} path="/companyprofile" component={Companyprofile} />
                        <PrivateRoute6 authed={this.state.authed} path="/jobpost" component={Jobpost} />
                        <PrivateRoute7 authed={this.state.authed} path="/admin" component={admin} />
                        <PrivateRoute8 authed={this.state.authed} path="/mycompanypostedjobs" component={MycompanyPostedJobs} />
                        <Route path="*" component={Notfound} />
                    </Switch>
                </Router>
            </div >
        )

    }
}


export default Routers;