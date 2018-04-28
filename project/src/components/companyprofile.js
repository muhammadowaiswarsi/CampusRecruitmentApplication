import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout, companycurrentuserdata } from '../store/action/action';
import "../App.css"
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'



class companyprofile extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    signout = () => {
        this.props.signout()
    }

    componentWillUpdate() {
        localStorage.setItem("type", JSON.stringify("/companyprofile"))
    }


    componentWillMount() {
        this.props.companycurrentuserdata()
    }


    render() {

        return (
            <div className='center'>

                <AppBar className="center" title="Campus Reqruitment System" onLeftIconButtonClick={() => this.handleToggle()} iconElementRight={<RaisedButton label="Signout" primary={true} className="style1" onClick={this.signout} />} >
                </AppBar>

                <Drawer open={this.state.open}>

                    <Link to='/jobpost'>
                        <MenuItem>
                            Post Jobs Here
                        </MenuItem>
                    </Link>


                    <Link to='/studentdata'>
                        <MenuItem>
                            Student Data Here
                        </MenuItem>
                    </Link>


                    <Link to='/mycompanypostedjobs'>
                        <MenuItem>
                            Your Company Posted Jobs Here
                        </MenuItem>
                    </Link>


                    <Link to='/companyprofile'>
                        <MenuItem>
                            Your Profile Data Here
                                </MenuItem>
                    </Link>

                    <br />
                    <RaisedButton label="Close" primary={true} className="style1" onClick={() => this.setState({ open: false })} />

                </Drawer>


                <h1 className="mainh">Your Profile</h1>
                <div className="center">
                    <Paper className="box123" zDepth={5}>
                        <li className="left red">Company Name: <span className="blue">{this.props.companyprofiledata1.companyname}</span></li >
                        <br />
                        <hr />
                        <li className="left red">Username: <span className="blue">{this.props.companyprofiledata1.username}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Email: <span className="blue">{this.props.companyprofiledata1.email}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Number: <span className="blue">{this.props.companyprofiledata1.number}</span></li>
                        <br />
                        <hr />
                    </Paper>
                </div >

            </div >
        )
    }
}


function mapStateToProp(state) {
    return ({
        companyprofiledata1: state.root.companyprofiledata
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        companycurrentuserdata: () => dispatch(companycurrentuserdata()),
        signout: () => dispatch(signout())
    })
}



export default connect(mapStateToProp, mapDispatchToProp)(companyprofile);