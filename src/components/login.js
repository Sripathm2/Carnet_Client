import React from 'react';
import '../css/signup-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios'


const login = () => (
    <div className="App body page-index clearfix">
        <div class="container12132332e"></div>
        <div class="container2323"></div>
        <input id="username" className="_input _input-13" placeholder="Username" type="text"/>
            <input id="password" className="_input _input-16" placeholder="Password" type="password"/>
                <button class="_button _button-2" onClick={enter}>Login</button>
                <p class="text text-3">Forgot Password? <a>Click Here</a></p>
                <p class="text text-6">New to Carnet? <a>Register</a></p>
    </div>
);

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
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default login;