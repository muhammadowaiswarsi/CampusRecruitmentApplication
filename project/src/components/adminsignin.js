import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminsigninAction } from '../store/action/action';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import "../App.css"
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import AppBar from 'material-ui/AppBar';
import { red500, greenA200 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import SvgIcon from 'material-ui/SvgIcon';


const iconStyles = {
    width: 250,
    height: 50,
};

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);


class Adminsignin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loader: false
        }

        this.signin = this.signin.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
    }




    signin = (e) => {
        e.preventDefault()
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.signinWithEmailPassword(user);
        this.setState({
            email: '',
            password: '',
            loader: true
        })
        setTimeout(() => {
            this.setState({
                loader: false
            })
        }, 3000)
    }





    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }


    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }



    LinearProgressExampleSimple = () => (
        <LinearProgress mode="indeterminate" />
    );


    render() {
        let { loader } = this.state
        return (
            <div className='center'>

                <AppBar className="center" title="Campus Reqruitment System" showMenuIconButton={false} />

                <Link to="/">
                    <HomeIcon style={iconStyles} color={red500} hoverColor={greenA200} />
                </Link>

                <div className="center" style={{ marginTop: "10%" }}>

                    <form onSubmit={this.signin}>
                        <Paper style={style} zDepth={5}>
                            <h1>Signin Here....</h1>
                            <TextField hintText="Type your email here..." floatingLabelText="email" type='email' name='email' value={this.state.email} onChange={this._onChangeEmail} required />
                            <br />
                            <TextField hintText="Type your password here..." floatingLabelText="Password" type='password' name='password' value={this.state.password} onChange={this._onChangePassword} required />
                            <br /><br />
                            <span style={{ color: "red" }}>{this.props.erroradminsn1}</span>
                            <br />
                            {loader &&
                                <LinearProgress mode="indeterminate" />
                            }
                            <br />
                            <RaisedButton label="Signin" primary={true} className="style1" type="submit" />
                            <br />
                        </Paper >
                    </form>

                </div >

            </div>
        )
    }
}

const style = {
    height: "auto",
    width: "300px",
    padding: "10px",
    textAlign: "center",
    display: "inline-block",
};

function mapStateToProp(state) {
    return ({
        erroradminsn1: state.root.erroradminsn
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        signinWithEmailPassword: (user) => {
            dispatch(adminsigninAction(user))
        },

    })
}



export default connect(mapStateToProp, mapDispatchToProp)(Adminsignin);