import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout, companysignupAction, companysigninAction } from '../store/action/action';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import "../App.css"
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, greenA200 } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';




const iconStyles = {
    width: 250,
    height: 50,
};

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);


class Companypage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email1: '',
            password1: '',
            email: '',
            userName: '',
            password: '',
            number: '',
            companyname: '',
            loader: false,
            loader1: false,
            open: false
        }

        this._onChangeEmail1 = this._onChangeEmail1.bind(this);
        this._onChangePassword1 = this._onChangePassword1.bind(this);
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangecompanyname = this._onChangecompanyname.bind(this)
        this._onChangenumber = this._onChangenumber.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
    }

    handleToggle = () => this.setState({ open: !this.state.open });


    signin = (e) => {
        e.preventDefault()
        let user = {
            email1: this.state.email1,
            password1: this.state.password1
        }
        this.props.companysigninWithEmailPassword(user);
        this.setState({
            loader: true
        })
        setTimeout(() => {
            this.setState({
                loader: false
            })
        }, 3000)
    }



    _onChangePassword1(event) {
        this.setState({
            password1: event.target.value
        })
    }

    _onChangeEmail1(event) {
        this.setState({
            email1: event.target.value
        })
    }



    signup = (e) => {
        e.preventDefault()
        let user = {
            email: this.state.email,
            username: this.state.userName,
            password: this.state.password,
            number: this.state.number,
            companyname: this.state.companyname,
        }
        this.setState({
            userName: '',
            email: '',
            password: '',
            number: '',
            companyname: '',
        })
        this.props.companysignupwithEmailPassword(user);
        this.setState({
            loader1: true
        })
        setTimeout(() => {
            this.setState({
                loader1: false
            })
        }, 3000)
    }



    _onChangeEmail(event) {
        this.setState({
            email: event.target.value.trim()
        })
    }


    _onChangeUserName(event) {
        this.setState({
            userName: event.target.value.trim()
        })
    }


    _onChangePassword(event) {
        this.setState({
            password: event.target.value.trim()
        })
    }


    _onChangenumber(event) {
        this.setState({
            number: event.target.value.trim()
        })
    }

    _onChangecompanyname(event) {
        this.setState({
            companyname: event.target.value.trim()
        })
    }



    render() {
        let { loader, loader1 } = this.state

        return (
            <div>

                <AppBar className="center" title="Campus Reqruitment System" showMenuIconButton={false} />

                <div className="center">

                    <Link to="/">
                        <HomeIcon style={iconStyles} color={red500} hoverColor={greenA200} />
                    </Link>

                    <h1 className="mainh">Company Representator Page</h1>

                    <div className="allbox">

                        <div className="box">

                            <form onSubmit={this.signin}>
                                <Paper className="style" style={{ padding: '10px', width: "300px" }} zDepth={5}>
                                    <h2>Signin Here....</h2>
                                    <TextField hintText="Type your email here..." floatingLabelText="email" type='email' name='email1' value={this.state.email1} onChange={this._onChangeEmail1} required />
                                    <br />
                                    <TextField hintText="Type your password here..." floatingLabelText="Password" type='password' name='password1' value={this.state.password1} onChange={this._onChangePassword1} required />
                                    <br /><br />
                                    <span style={{ color: "red" }}>{this.props.errorcompanysn1}</span>
                                    <br /><br />
                                    <RaisedButton type="submit" label="Signin" primary={true} className="style1" />
                                    <br /><br />
                                    {loader &&
                                        <CircularProgress size={80} thickness={5} />
                                    }
                                </Paper >
                            </form>

                        </div >



                        <div className="box1">
                            <form onSubmit={this.signup}>
                                <Paper className="style" style={{ padding: '10px', width: "300px" }} zDepth={5}>
                                    <h2>Create Account</h2>
                                    <TextField hintText="Type your name here..." floatingLabelText="User Name" type='text' name='username' value={this.state.userName} onChange={this._onChangeUserName} required />
                                    <br />
                                    <TextField hintText="Type your Company Name here..." floatingLabelText="Company Name" type='text' name='companyname' value={this.state.companyname} onChange={this._onChangecompanyname} required />
                                    <br />
                                    <TextField hintText="Type your email address here..." floatingLabelText="Email" type='email' name='email' value={this.state.email} onChange={this._onChangeEmail} required />
                                    <br />
                                    <TextField hintText="Type your password here..." floatingLabelText="Password" type='password' name='password' value={this.state.password} onChange={this._onChangePassword} required />
                                    <br />
                                    <TextField hintText="(+92)XXXXXXXXX" floatingLabelText="Contact No." >
                                        <input type='text' name='number' value={this.state.number} onChange={this._onChangenumber} required />
                                    </TextField>
                                    <br /><br />
                                    <span style={{ color: "red" }}>{this.props.errorcompanysu1}</span>
                                    <br /><br />
                                    <RaisedButton type="submit" label="Signup" primary={true} className="style1" />
                                    <br /><br />
                                    {loader1 &&
                                        <CircularProgress size={80} thickness={5} />
                                    }
                                </Paper >
                            </form>

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}



function mapStateToProp(state) {
    return ({
        errorcompanysn1: state.root.errorcompanysn,
        errorcompanysu1: state.root.errorcompanysu
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        companysigninWithEmailPassword: (user) => {
            dispatch(companysigninAction(user))
        },
        companysignupwithEmailPassword: (userDetails) => {
            dispatch(companysignupAction(userDetails));
        },
        signout: () => dispatch(signout())

    })
}



export default connect(mapStateToProp, mapDispatchToProp)(Companypage);