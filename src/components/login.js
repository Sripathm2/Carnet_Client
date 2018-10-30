import React from 'react';
import '../css/signup-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios';
import logo from '../res/Logo(4).JPG';
import {Link} from "react-router-dom";


const login = () => (
    <div className="App body page-index clearfix">
        <div className="container12132332e"></div>
        <div className="container2323">
            <img className="logo" src={logo} alt="logo"/>
        </div>
        <input id="username" className="_input _input-13" placeholder="Username" type="text"/>
        <input id="password" className="_input _input-16" placeholder="Password" type="password"/>
        <button className="_button _button-2" onClick={enter}>Login</button>
        <p className="text text-3">Forgot Password? <a onClick={forgotPassword}>Click Here</a></p>
        <Link className="text text-32" to="/create_user" >New to Carnet? </Link>
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