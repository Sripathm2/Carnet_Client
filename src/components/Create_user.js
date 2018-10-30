import React from 'react';
import '../css/signup-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios';
import { Link } from "react-router-dom";

const Create_user = () => (
    <div className="App body page-signup clearfix">
        <div className="containermaincreate clearfix">
            <div className="containerlogocreate"></div>
            <input id = "firstName" className="inputfncreate" placeholder="First Name" type="text"/>
            <input id = "lastName" className="inputlncreate" placeholder="Last Name" type="text"/>
            <input id ="emailId" className="inputemailcreate" placeholder="Email Address" type="email"/>
            <input id = "userName" className="inputusercreate" placeholder="User Name" type="text"/>
            <input id = "password" className="inputpasscreate" placeholder="Password" type="password"/>
            <input id = "rePass" className="inputrepasscreate" placeholder="Re-Enter Password" type="password"/>
            <input id = "SQ" className="inputsecuritycreate" placeholder="Enter Security Question" type="text"/>
            <p className="texttitlecreate">Welcome!</p>
            <input id = "SA" className="inputanscreate" placeholder="Answer" type="text"/>
            <button className="signupcreate" onClick={signUp}>Sign Up</button>
            <p className="textlogincreate">Already have a Account ? <Link to = "/login">Login</Link></p>
        </div>
    </div>
);

function signUp() {
    let userdata = {};
    userdata.userName = document.getElementById("userName").value;
    userdata.password = document.getElementById("password").value;
    userdata.email = document.getElementById("emailId").value;
    userdata.securityQuestion = document.getElementById("SQ").value;
    userdata.securityAnswer = document.getElementById("SA").value;
    userdata.fname = document.getElementById("firstName").value;
    userdata.lname = document.getElementById("lastName").value;
    axios({
        method:'post',
        url:'https://carnet-api.herokuapp.com/user/register',
        data:{
            userName:userdata.userName,
            password:userdata.password,
            email: userdata.email,
            securityQuestion: userdata.securityQuestion,
            securityAnswer: userdata.securityAnswer,
            name: userdata.fname +" "+ userdata.lname,
        }
    })
        .then(function (response) {
            console.log(response.data);
            window.location.replace("/login");

        })
        .catch(function (error) {
            console.log(error + '1');
        });
}
export default Create_user;
