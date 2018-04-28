import React, { Component } from 'react';
import { connect } from 'react-redux';
import { studentsigninAction, studentsignupAction } from '../store/action/action';
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



class Studentpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email1: '',
            password1: '',
            email: '',
            userName: '',
            password: '',
            qualification: '',
            number: '',
            loader: false,
            loader1: false

        }
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangeEmail1 = this._onChangeEmail1.bind(this);
        this._onChangePassword1 = this._onChangePassword1.bind(this);
        this._onchangequalification = this._onchangequalification.bind(this)
        this._onChangenumber = this._onChangenumber.bind(this);
        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
    }


    signin = (e) => {
        e.preventDefault()
        let user = {
            email1: this.state.email1,
            password1: this.state.password1
        }
        this.props.studentsigninWithEmailPassword(user);
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
            qualification: this.state.qualification,
            number: this.state.number,
        }
        this.props.studentsignupwithEmailPassword(user);
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

_onchangequalification(event) {
    this.setState({
        qualification: event.target.value.trim()
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


                <h1 className="mainh">Student Page</h1>


                <div className="allbox">

                    <div className="box">

                        <form onSubmit={this.signin}>
                            <Paper className="style" style={{ padding: '10px', width: "300px" }} zDepth={5}>
                                <h2>Signin Here....</h2>
                                <TextField hintText="Type your email here..." floatingLabelText="email" type='email' name='email1' value={this.state.email1} onChange={this._onChangeEmail1} required />
                                <br />
                                <TextField hintText="Type your password here..." floatingLabelText="Password" type='password' name='password1' value={this.state.password1} onChange={this._onChangePassword1} required />
                                <br /><br />
                                <span style={{ color: "red" }}>{this.props.errorstudentsn1}</span>
                                <br />
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
                                <TextField hintText="Type your email address here..." floatingLabelText="Email" type='email' name='email' value={this.state.email} onChange={this._onChangeEmail} required />
                                <br />
                                <TextField hintText="Type your password here..." floatingLabelText="Password" type='password' name='password' value={this.state.password} onChange={this._onChangePassword} required />
                                <br />
                                <TextField hintText="Your Qualification here..." floatingLabelText="Qualification" type='text' name='qualification' value={this.state.qualification} onChange={this._onchangequalification} required />
                                <br />
                                <TextField hintText="(+92)XXXXXXXXX" floatingLabelText="Contact No." >
                                    <input type='number' name='number' value={this.state.number} onChange={this._onChangenumber} required />
                                </TextField>
                                <br /><br />
                                <span style={{ color: "red" }}>{this.props.errorstudentsu1}</span>
                                <br />
                                <RaisedButton type="submit" label="Signup" primary={true} className="style1" />
                                <br /><br />
                                {loader1 &&
                                    <CircularProgress size={80} thickness={5} />
                                }
                            </Paper >
                        </form>

                    </div>
                </div>
            </div >
        </div>

    )
}
}


function mapStateToProp(state) {
    return ({
        errorstudentsn1: state.root.errorstudentsn,
        errorstudentsu1: state.root.errorstudentsu
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        studentsigninWithEmailPassword: (user) => {
            dispatch(studentsigninAction(user))
        },
        studentsignupwithEmailPassword: (userDetails) => {
            dispatch(studentsignupAction(userDetails));
        }

    })
};



export default connect(mapStateToProp, mapDispatchToProp)(Studentpage);