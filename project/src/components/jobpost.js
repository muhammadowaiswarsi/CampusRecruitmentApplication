import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jobpostdata, signout } from '../store/action/action';
import { Link } from 'react-router-dom'
import "../App.css"
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';





class Jobpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyname: '',
            jobdesc: '',
            jobdesignation: '',
            salary: '',
            open: false
        }
        this._onChangejob = this._onChangejob.bind(this);
        this._onChangejobdesc = this._onChangejobdesc.bind(this);
        this._onChangejobdesignation = this._onChangejobdesignation.bind(this);
        this.salary = this.salary.bind(this)
    }

    handleToggle = () => this.setState({ open: !this.state.open });


    componentWillMount() {
        localStorage.setItem("type", JSON.stringify("/jobpost"))
    }

    _onChangejob(event) {
        this.setState({
            companyname: event.target.value
        })
    }


    _onChangejobdesc(event) {
        this.setState({
            jobdesc: event.target.value
        })
    }


    _onChangejobdesignation(event) {
        this.setState({
            jobdesignation: event.target.value
        })
    }

    salary(event) {
        this.setState({
            salary: event.target.value.trim()
        })
    }



    jobpost = (e) => {
        e.preventDefault()
        let user = {
            companyname: this.state.companyname,
            jobdesc: this.state.jobdesc,
            jobdesignation: this.state.jobdesignation,
            salary: this.state.salary,
        }
        this.props.jobpost(user)
        this.setState({
            companyname: '',
            jobdesc: '',
            jobdesignation: '',
            salary: '',
        })
    }


    render() {
        return (
            <div className='center'>

                <AppBar className="center" title="Campus Reqruitment System" onLeftIconButtonClick={() => this.handleToggle()} iconElementRight={<RaisedButton label="Signout" primary={true} className="style1" onClick={() => this.props.signout()} />} >
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
                            Your Posted Jobs Here
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




                <div className="center" style={{ marginTop: "6%" }}>

                    <Paper style={style} zDepth={5}>

                        <h1>Post Job Here</h1>
                        <form onSubmit={this.jobpost}>
                            <TextField hintText="Type Company Name here..." floatingLabelText="Company Name"
                                type='text' name='companyname' value={this.state.companyname} onChange={this._onChangejob} required />
                            <br />

                            <TextField hintText="Type Job Description here..." floatingLabelText="Job Description"
                                type='text' name='jobdesc' value={this.state.jobdesc} onChange={this._onChangejobdesc} required />
                            <br />

                            <TextField hintText="Type Designation here..." floatingLabelText="Job Designation"
                                type='text' name='Designation' value={this.state.jobdesignation} onChange={this._onChangejobdesignation} required />
                            <br />

                            <TextField hintText="Salary..." floatingLabelText="Salary" type='number'
                                name='salary' value={this.state.salary} onChange={this.salary} required />
                            <br />

                            <RaisedButton type="submit" label="Job Post" primary={true} className="style1" />
                            <br /><br />

                        </form>


                    </Paper >

                </div>

            </div >
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


function mapDispatchToProp(dispatch) {
    return ({
        jobpost: (data) => {
            dispatch(jobpostdata(data));
        },
        signout: () => {
            dispatch(signout())
        }
    })
}

export default connect(null, mapDispatchToProp)(Jobpost);

