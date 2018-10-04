import React from 'react';
import '../css/signup-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios'

const Create_user = () => (
    <div className="App body page-signup clearfix">
        <div className="container _element container-1"></div>
        <div className="container _element container-2"></div>
        <input className="_input _input-1" placeholder="First Name" type="text"/>
        <input className="_input _input-2" placeholder="Last Name" type="text"/>
        <label>
            email:
            <input className="_input _input-3" placeholder="Email Address" type="email"/>
        </label>
        <label>
            username:
            <input className="_input _input-4" placeholder="User Name" type="text"/>
        </label>
        <label>
            pass:
            <input className="_input _input-6" placeholder="Password" type="password"/>
        </label>
        <input className="_input _input-9" placeholder="Re-Enter Password" type="password"/>
        <label>
            securityQ:
            <input className="_input _input-12" placeholder="Enter Security Question" type="text"/>
        </label>
        <p className="text text-2">Welcome!</p>
        <label>
            securityA:
            <input className="_input _input-18" placeholder="Answer" type="text"/>
        </label>
        <button className="_button _button-4" onClick={signUp}>Sign Up</button>
        <p className="text text-5">Already have a Account ? <a>Login</a></p>
    </div>
);

function signUp() {
    axios.post('https://carnet-api.herokuapp.com/user/register', {
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default Create_user;
