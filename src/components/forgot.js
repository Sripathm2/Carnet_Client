import React from 'react';
import '../css/forgetpassword-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios';



const forgot = () => (
        <div onLoad={load} className="App body page-forgetpassword clearfix">
            <div class="containermainforgot clearfix">
                <div class="containerlogoforgot"></div>
                <input id = "Q" class="inputsecurityforgot" placeholder="Enter Security Question" type="text"/>
                <input id = "A" class="inputanswerforgot" placeholder="Answer" type="text"/>
                <input id = "password" class="inputpassforgot" placeholder="Password" type="password"/>
                <input class="inputrepassforgot" placeholder="Re-Enter Password" type="password"/>
                <button class="resetforgot" onClick={reset}>Reset</button>
                <p class="textloginforgot"><a href = "/login">Login</a></p>
                <p class="texttitleforgot">Reset Password</p>
            </div>

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


