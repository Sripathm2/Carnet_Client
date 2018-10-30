import React from 'react';
import '../css/forgetpassword-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios';
import logo from '../res/Logo(4).JPG';


const forgot = () => (
        <div onLoad={load} className="App body page-forgetpassword clearfix">
            <div className="container _element container-3"></div>
            <div className="containerLogo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="container"></div>
            <input id = "Q" className="_input _input-5" placeholder="Enter Security Question" type="text"/>
            <input id = "A" className="_input _input-7" placeholder="Answer" type="text"/>
            <input id = "password" className="_input _input-10" placeholder="Password" type="password"/>
            <input id = "repass" className="_input _input-14" placeholder="Re-Enter Password" type="password"/>
            <button className="_button _button-1" onClick={reset}>Reset</button>
            <p className="text1">Reset Password</p>
            <p className="text text-4"><a  href="/login">Login</a></p>


        </div>
);

function reset(){
    let user;
    user = document.cookie.split(';');
    let data={};
    data.user = user[0].substring(user[0].indexOf('=') + 1);
    data.Q = document.getElementById("Q").value;
    data.A = document.getElementById("A").value;
    data.password = document.getElementById("password").value;
    data.repass = document.getElementById("repass").value;

    let url='https://carnet-api.herokuapp.com/user/forgetPassword';

    axios({
        method: 'post',
        url:url,
        data:{
            userName:data.user,
            password:data.password,
            securityQuestion: data.Q,
            securityAnswer: data.A,

        }
    })
        .then(function (response) {
            window.location.replace("/login");
        })
        .catch(function (error) {
            alert('incorrect data please check.')
        });
}

function load(){
    if(document.cookie.indexOf("securityQuestion") === -1){
        window.location.replace("/login");
    }
    let user;
    user = document.cookie.split(';');

    document.getElementById("Q").value = user[1].substring(user[1].indexOf('=') + 1);
}
export default forgot;


