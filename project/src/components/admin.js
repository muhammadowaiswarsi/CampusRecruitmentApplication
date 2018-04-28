import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout, admindelFuncstudent, studentdatarecv, deletejobfunc, companydatarecv, companyusers, deletecompusers } from '../store/action/action';
import "../App.css";
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';




class Datapage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader: false
        }
    }

    componentWillUpdate() {
        localStorage.setItem("type", JSON.stringify("/admin"))
    }

    signout = () => {
        this.props.signout()
    }


    deletebtncomp(uid, index) {
        this.props.deletecompusers(uid, index)
    }

    deletebtnjob(uid, index) {
        let key = this.props.pushkeys1[index];
        this.props.deletejobfunc(uid, key)
    }


    deletebtnstudent(valueid, index) {
        this.props.deletefunc(valueid, index)
    }

    componentWillMount() {
        this.props.companyusers()
        this.props.companydatarecv()
        this.props.studentdatarecv()
    }



    render() {
        return (
            <div>

                <AppBar className="center" title="Campus Reqruitment System" showMenuIconButton={false} iconElementRight={<RaisedButton label="Signout" primary={true} className="style1" onClick={this.signout} />} >
                </AppBar>

                <h1 className="mainh" style={{ color: "red" }}>Welcome to Admin Page</h1>

                <h2 className="mainh" style={{ color: "blue" }}>Student data</h2>

                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} className="bold">
                        <TableRow>
                            <TableRowColumn>Username</TableRowColumn>
                            <TableRowColumn>Email</TableRowColumn>
                            <TableRowColumn>Number</TableRowColumn>
                            <TableRowColumn>Qualification</TableRowColumn>
                            <TableRowColumn>Delete</TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.props.studentdataforcompany1 ? this.props.studentdataforcompany1.map((value, index) => {
                            let valueid = value.uid
                            return <TableRow key={index}>
                                <TableRowColumn>{value.username}</TableRowColumn>
                                <TableRowColumn>{value.email}</TableRowColumn>
                                <TableRowColumn>{value.number}</TableRowColumn>
                                <TableRowColumn>{value.qualification}</TableRowColumn>
                                <TableRowColumn><RaisedButton label="Delete" primary={true} className="style1" onClick={this.deletebtnstudent.bind(this, valueid, index)} /></TableRowColumn>
                            </TableRow>
                        }) : "No Data To Show"
                        }
                    </TableBody>
                </Table>



                <h2 className="mainh" style={{ color: "purple" }}>Company Users</h2>
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} className="bold">
                        <TableRow>
                            <TableRowColumn>Username</TableRowColumn>
                            <TableRowColumn>Company Name</TableRowColumn>
                            <TableRowColumn>Email</TableRowColumn>
                            <TableRowColumn>Number</TableRowColumn>
                            <TableRowColumn>Delete</TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.props.companyusers1 ? this.props.companyusers1.map((value, index) => {
                            let uid = value.uid
                            return <TableRow key={index}>
                                <TableRowColumn>{value.username}</TableRowColumn>
                                <TableRowColumn>{value.companyname}</TableRowColumn>
                                <TableRowColumn>{value.email}</TableRowColumn>
                                <TableRowColumn>{value.number}</TableRowColumn>
                                <TableRowColumn><RaisedButton label="Delete" primary={true} className="style1" onClick={this.deletebtncomp.bind(this, uid, index)} /></TableRowColumn>
                            </TableRow>
                        }) : "No Data To Show"
                        }
                    </TableBody>
                </Table>



                <h2 className="mainh" style={{ color: "green" }}>Job data</h2>
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} className="bold">
                        <TableRow>
                            <TableRowColumn>Company Name</TableRowColumn>
                            <TableRowColumn>Job Description</TableRowColumn>
                            <TableRowColumn>Job Designation</TableRowColumn>
                            <TableRowColumn>Salary</TableRowColumn>
                            <TableRowColumn>Delete</TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.props.jobpostdata1 ? this.props.jobpostdata1.map((value, index) => {
                            let uid = value.uid
                            return <TableRow key={index}>
                                {/* <TableRow> */}
                                <TableRowColumn>{value.companyname}</TableRowColumn>
                                <TableRowColumn>{value.jobdesc}</TableRowColumn>
                                <TableRowColumn>{value.jobdesignation}</TableRowColumn>
                                <TableRowColumn>{value.salary}</TableRowColumn>
                                <TableRowColumn><RaisedButton label="Delete" primary={true} className="style1" onClick={this.deletebtnjob.bind(this, uid, index)} /></TableRowColumn>
                            </TableRow>
                        }) : "No Data To Show"
                        }
                    </TableBody>
                </Table>

            </div >


        )
    }
}



function mapStateToProp(state) {
    return ({
        companyusers1: state.root.companyusers,
        jobpostdata1: state.root.jobpostdata,
        pushkeys1: state.root.datapushkey,
        jobuidkeys1: state.root.jobuidkeys,
        studentdataforcompany1: state.root.studentdataforcompany
    })
}




function mapDispatchToProp(dispatch) {
    return ({
        companyusers: () => {
            dispatch(companyusers());
        },
        deletecompusers: (uid, index) => {
            dispatch(deletecompusers(uid, index))
        },
        companydatarecv: () => {
            dispatch(companydatarecv());
        },
        deletejobfunc: (valueid, index) => { dispatch(deletejobfunc(valueid, index)) },
        studentdatarecv: () => {
            dispatch(studentdatarecv())
        },
        deletefunc: (valueid, index) => {
            dispatch(admindelFuncstudent(valueid, index))
        },
        signout: () => { dispatch(signout()) }

    })
}




export default connect(mapStateToProp, mapDispatchToProp)(Datapage);