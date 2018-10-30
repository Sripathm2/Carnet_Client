import React from 'react';
import '../css/signup-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios';
import {Link} from "react-router-dom";


const login = () => (
    <div className="App body page-index clearfix">
        <div className="containermainlogin clearfix">
            <div className="containerlogologin"></div>
                <input  id = "username" className="inputusernamelogin" placeholder="Username" type="text"/>
                <input id = "password" className="inputpasswordlogin" placeholder="Password" type="password"/>
                <p className="buttonlogin" onClick={enter}><span>Login</span></p>
                <p className="textforgotlogin">Forgot Password? <a onClick={forgotPassword}>Click Here</a></p>
                <p className="textcreatelogin">New to Carnet? <Link to ="/create_user">Register</Link></p>
        </div>
    </div>
);

function forgotPassword(){
    let userdata = {};
    userdata.userName = document.getElementById("username").value;

    if(userdata.userName.length < 6){
        alert('Please enter your username before proceeding for forgotPassword.');
        return;
    }

    let url='https://carnet-api.herokuapp.com/user/forgetPassword?userName='+userdata.userName;

    axios({
        method:'get',
        url:url,
    })
        .then(function (response) {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = 'user=' + userdata.userName + ';path=/';
            document.cookie = 'securityQuestion=' + response.data.securityQuestion + ';path=/';
            window.location.replace("/forgot");

        })
        .catch(function (error) {
            alert(error);
        });
}

function enter(){
    let userdata = {};
    userdata.userName = document.getElementById("username").value;
    userdata.password = document.getElementById("password").value;

    let url='https://carnet-api.herokuapp.com/auth/token?userName='+userdata.userName+'&password='+userdata.password;

    axios({
        method:'get',
        url:url,
    })
        .then(function (response) {
            let token = response.data.token;
            document.cookie = 'token=' + token + ';path=/';
            window.location.replace('/dashboard');
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default login;