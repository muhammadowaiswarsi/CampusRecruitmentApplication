import React, { Component } from 'react';
import { connect } from 'react-redux';
import { studentdatarecv, signout } from '../store/action/action';
import "../App.css"
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'


class Studentdata extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });


    signout = () => {
        this.props.signout()
    }

    componentWillUpdate() {
        localStorage.setItem("type", JSON.stringify("/studentdata"))
    }


    componentWillMount() {
        this.props.studentdatarecv()
    }


    render() {
        console.log(this.props.studentdataforcompany1)
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


                <h1 className="mainh">My company posted jobs</h1>
                {this.props.studentdataforcompany1 ? this.props.studentdataforcompany1.map((value, index) => {
                    console.log(value.uid)
                    return <Paper className="box123 datastyle" key={index} zDepth={5}>
                        <li className="left red">Username: <span className="blue">{value.username}</span></li >
                        <br />
                        <hr />
                        <li className="left red">Email: <span className="blue">{value.email}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Qualification: <span className="blue">{value.qualification}</span></li>
                        <br />
                        <hr />
                        <li className="left red">Number: <span className="blue">{value.number}</span></li>
                        <br />
                        <hr />
                    </Paper>
                }) : "No Data to Show"}


            </div >


        )
    }
}



function mapStateToProp(state) {
    return ({
        studentdataforcompany1: state.root.studentdataforcompany,
        
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        studentdatarecv: () => {
            dispatch(studentdatarecv());
        },
        signout: () => dispatch(signout()),

    })
}



export default connect(mapStateToProp, mapDispatchToProp)(Studentdata);