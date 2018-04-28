import React, { Component } from 'react';
import { connect } from 'react-redux';
import { studentprofileupdate, studentprofiledata, signout } from '../store/action/action';
import "../App.css"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'



class StudentProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editname: "",
            editnumber: "",
            editqualification: "",
            open: false,
            open1: false
        }
    }

    handleToggle = () => this.setState({ open1: !this.state.open1 });

    onChangeHandler(ev) {
        this.setState({
            [ev.target.name]: ev.target.value,
        })
    }


    signout = () => {
        this.props.signout()
    }


    componentWillUpdate() {
        localStorage.setItem("type", JSON.stringify("/studentprofile"));
    }


    componentWillMount() {
        this.props.studentprofiledata();
    }

    componentWillReceiveProps(props) {
        this.setState({
            editname: props.studentprofiledata1.username,
            editnumber: props.studentprofiledata1.number,
            editqualification: props.studentprofiledata1.qualification
        })
    }


    update = () => {
        let value = {
            editname: this.state.editname,
            editnumber: this.state.editnumber,
            editqualification: this.state.editqualification
        }
        this.props.studentprofileupdate(value)
        this.setState({
            open: false
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {

        return (
            <div className='center'>

                <AppBar className="center" title="Campus Reqruitment System" onLeftIconButtonClick={() => this.handleToggle()} iconElementRight={<RaisedButton label="Signout" primary={true} className="style1" onClick={this.signout} />} >
                </AppBar>

                <Drawer open={this.state.open1}>

                    <Link to='/companydata'>
                        <MenuItem>
                            Companies Jobs Here
                    </MenuItem>
                    </Link>

                    <Link to='/studentprofile'>
                        <MenuItem>
                            Your Profile Data Here
                    </MenuItem>
                    </Link>

                    <br />
                    <RaisedButton label="Close" primary={true} className="style1" onClick={() => this.setState({ open1: false })} />

                </Drawer>


                <h1 className="mainh">Your Profile</h1>

                <div className="center">
                    <Paper className="box123" style={{ fontSize: "20px", marginTop: '5%' }} zDepth={5}>
                        <li className="left red">Username: <span className="blue">{this.props.studentprofiledata1.username}</span></li >
                        <br />
                        <hr />
                        <li className="left red">Number: <span className="blue">{this.props.studentprofiledata1.number}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Email: <span className="blue">{this.props.studentprofiledata1.email}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Qualification: <span className="blue">{this.props.studentprofiledata1.qualification}</span></li>
                        <br />
                        <hr />

                        <RaisedButton className="center style2" label="Edit" primary={true} onClick={this.handleOpen} />
                    </Paper>
                </div >


                <Dialog
                    title="Your Profile Edit Here...."
                    open={this.state.open}
                    style={styles.dialog}
                    onRequestClose={this.handleClose}>
                    <div className="center">
                        <TextField ref="editname" floatingLabelText="Edit Username" hintText='edit Username' defaultValue={this.props.studentprofiledata1.username} name='editname' onChange={this.onChangeHandler.bind(this)} />
                        <br />

                        <TextField ref="editnumber" type='number' floatingLabelText="Edit Number" hintText='edit Number' defaultValue={this.props.studentprofiledata1.number} name='editnumber' onChange={this.onChangeHandler.bind(this)} />
                        <br />

                        <TextField ref="editqualification" floatingLabelText="Edit Qualification" hintText='edit qualification' defaultValue={this.props.studentprofiledata1.qualification} name='editqualification' onChange={this.onChangeHandler.bind(this)} />

                        <br />
                        <RaisedButton label="Update" primary={true} className="style2" onClick={this.update} />

                        <br /><br />
                        <RaisedButton label="Cancel" primary={true} className="style2" onClick={this.handleClose} />
                    </div>

                </Dialog>


            </div >
        )
    }
}

function mapStateToProp(state) {
    return ({
        studentprofiledata1: state.root.studentprofiledata,
    })
}



function mapDispatchToProp(dispatch) {
    return ({
        studentprofiledata: () => {
            dispatch(studentprofiledata());
        },
        signout: () => {
            dispatch(signout());
        },
        studentprofileupdate: (value) => {
            dispatch(studentprofileupdate(value))
        }

    })
}

const styles = {
    dialog: {
        height: "auto",
        width: "400px",
        textAlign: "center",
        display: "inline-block",
        marginLeft: '36%',
    }
}


export default connect(mapStateToProp, mapDispatchToProp)(StudentProfile);