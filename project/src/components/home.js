import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Adminpic from '../images/admin.png'
import Student from '../images/graduationcap.jpg'
import Company from '../images/companydata.png'
import AppBar from 'material-ui/AppBar';


class Home extends Component {

    render() {
        return (
            <div className="center">

                <AppBar className="center" title="Campus Reqruitment System" showMenuIconButton={false}/>

                <div className="inline" style={{ width: "20%" }}>
                    <Link to="/studentpage">
                        <h1 style={{ color: "red" }}>I am a Student </h1>
                        <img src={Student} alt="I am a Student" />
                    </Link>
                </div >

                <div className="inline" style={{ width: "20%" }}>
                    <Link to="/companypage">
                        <h1 style={{ color: "purple" }}>I am a Company Representator</h1>
                        <img src={Company} alt="I am a Company Representator" />
                    </Link>
                </div>

                <div>
                    <Link to="/adminsignin">
                        <h1 style={{ color: "green" }}>I am a Admin</h1>
                        <img src={Adminpic} alt="I am Admin" />
                    </Link>
                </div>


            </div>
        )
    }
}



export default Home;

