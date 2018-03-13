import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jobapply, signout, companydatarecv } from '../store/action/action';
import "../App.css"
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'



class Companydata extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });



    apply(uid, index) {
        let key = this.props.pushkeys1[index]
        console.log(key)
        this.props.jobapply(uid, key)

    }

    signout = () => {
        this.props.signout()
    }

    componentWillUpdate() {
        localStorage.setItem("type", JSON.stringify("/companydata"))
    }


    componentWillMount() {
        this.props.companydatarecv()
    }

    render() {
        console.log(this.props.jobpostdata)
        return (
            <div className='center'>

                <AppBar className="center" title="Campus Reqruitment System" onLeftIconButtonClick={() => this.handleToggle()} iconElementRight={<RaisedButton label="Signout" primary={true} className="style1" onClick={this.signout} />} >
                </AppBar>

                <Drawer open={this.state.open}>

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
                    <RaisedButton label="Close" primary={true} className="style1" onClick={() => this.setState({ open: false })} />
                </Drawer>

                <h1 className="mainh">Company data</h1>

                {this.props.jobpostdata !== [] ? this.props.jobpostdata.map((value, index) => {
                    return <Paper className="box123 datastyle" zDepth={5} key={index}>
                        <li className="left red">Company Name: <span className="blue">{value.companyname}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Job Description: <span className="blue">{value.jobdesc}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Job Designation: <span className="blue">{value.jobdesignation}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Salary: <span className="blue">{value.salary}</span></li>
                        <br />
                        <hr />
                        <RaisedButton label="Apply" primary={true} className="style1" onClick={this.apply.bind(this, value.uid, index)} />
                    </Paper>
                }) : <h1>NO Data to Show</h1>}


            </div >


        )
    }
}



function mapStateToProp(state) {
    return ({
        jobpostdata: state.root.jobpostdata,
        pushkeys1: state.root.datapushkey,
        jobuidkeys1: state.root.jobuidkeys,
        studentprofiledata1: state.root.studentprofiledata
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        companydatarecv: () => {
            dispatch(companydatarecv())
        },
        signout: () => dispatch(signout()),
        jobapply: (uid, key) => dispatch(jobapply(uid, key)),
    })
}



export default connect(mapStateToProp, mapDispatchToProp)(Companydata);