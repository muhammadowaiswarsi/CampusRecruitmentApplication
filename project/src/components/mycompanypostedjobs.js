import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appliedstudents, companydatarecv, mycompanyjobpostdata, signout } from '../store/action/action';
import "../App.css"
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'




class MycompanyPostedJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            open1: false
        }
    }

    handleToggle = () => this.setState({ open1: !this.state.open1 });

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    signout = () => {
        this.props.signout()
    }

    appliedstudents(uid, index) {
        console.log(uid)
        console.log(index)
        console.log(this.props.pushkeys1)
        this.setState({
            open: true
        })
        let key = this.props.pushkeys1[index]
        console.log(key)
        this.props.appliedstudents(uid, key)
    }

    componentWillMount() {
        this.props.mycompanyjobpostdata();
        this.props.companydatarecv()
    }

    componentWillUpdate() {
        localStorage.setItem("type", JSON.stringify("/mycompanypostedjobs"))
    }

    render() {
        console.log(this.props.mycompanyjobpostdata1)
        console.log(this.props.appliedstudents1)
        return (
            <div className='center'>

                <AppBar className="center" title="Campus Reqruitment System" onLeftIconButtonClick={() => this.handleToggle()} iconElementRight={<RaisedButton label="Signout" primary={true} className="style1" onClick={this.signout} />} >
                </AppBar>

                <Drawer open={this.state.open1}>

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
                    <RaisedButton label="Close" primary={true} className="style1" onClick={() => this.setState({ open1: false })} />

                </Drawer>


                <h1 className="mainh">My company posted jobs</h1>
                {this.props.mycompanyjobpostdata1 ? this.props.mycompanyjobpostdata1.map((value, index) => {
                    console.log(value.uid)
                    return <Paper className="datastyle" style={style} key={index} zDepth={5}>
                        <li className="left red">Company Name: <span className="blue">{value.companyname}</span></li >
                        <br />
                        <hr />
                        <li className="left red">Job Description: <span className="blue">{value.jobdesc}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Job Designation: <span className="blue">{value.jobdesignation}</span></li>
                        <br />
                        <hr />
                        <li className="left red">salary: <span className="blue">{value.salary}</span></li>
                        <br />
                        <hr />
                        <RaisedButton label="View Applied" primary={true} className="style1" onClick={this.appliedstudents.bind(this, value.uid, index)} />
                    </Paper>
                }) : "No Data to Show"}


                <Dialog
                    title="Applied Students Here...."
                    modal={false}
                    open={this.state.open}
                    style={styles.dialog}
                    onRequestClose={this.handleClose}>
                    <div className="center">
                        {this.props.appliedstudents1.map((value, index) => {
                            return <div key={index} style={{ margin: "5%" }}>
                                <li className="left red">Username: <span className="blue">{value.username}</span></li>
                                <br />
                                <li className="left red">Email: <span className="blue">{value.email}</span></li>
                                <br />
                                <li className="left red">Qualification: <span className="blue">{value.qualification}</span></li>
                                <br />
                                <li className="left red">Number: <span className="blue">{value.number}</span></li>
                                <br />
                                <br />
                            </div>
                        })}
                        <RaisedButton label="Cancel" primary={true} className="style1" onClick={this.handleClose} />

                    </div>
                </Dialog>

            </div >
        )
    }
}

const styles = {
    dialog: {
        height: "auto",
        width: "400px",
        textAlign: "center",
        display: "inline-block",
        marginLeft: '34.25%',
        padding: "5px"
    }
}


const style = {
    height: "auto",
    padding: "10px",
    textAlign: "center",
    display: "inline-block",
};


function mapStateToProp(state) {
    return ({
        mycompanyjobpostdata1: state.root.mycompanyjobpostdata,
        pushkeys1: state.root.datapushkey,
        jobuidkeys1: state.root.jobuidkeys,
        appliedstudents1: state.root.appliedstudents
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        mycompanyjobpostdata: () => dispatch(mycompanyjobpostdata()),
        signout: () => dispatch(signout()),
        companydatarecv: () => dispatch(companydatarecv()),
        appliedstudents: (uid, key) => dispatch(appliedstudents(uid, key))
    })
}



export default connect(mapStateToProp, mapDispatchToProp)(MycompanyPostedJobs);