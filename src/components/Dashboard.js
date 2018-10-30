import React from 'react';
import '../css/DashboardStyle.css';
import '../css/dashboard-grid.css';
import logo from '../res/logo.jpg';
import user from '../res/user.jpg';
import axios from "axios";

let token ='';

const Dashboard = () => (
    <div onLoad={load} className="App">
        <div className="containerhead clearfix">
            <div className="containerlogo">
                <img src={logo} alt="logo" style={{width: 100, height: 84}}/>
            </div>
            <input className="_input" type="text"/>
            <button className="_button">Search</button>
        </div>
        <div className="containerside clearfix">
            <div className="containeruserimage">
                <img src={user} alt="user" style={{width: 100, height: 100}}/>
            </div>
            <label className="textname" id="name">Name of the User</label>
            <label className="textsubs" id="subscriber">Subscribers: NaN</label>
            <label className="textemail" id="email">Email Address of the User&nbsp;</label>
        </div>
        <div className="containermain clearfix">
            <button className="_button _button-2">Notebook</button>
            <button className="_button _button-5">Notifications</button>
            <div className="containernotebook"></div>
        </div>
    </div>
);

function load(){
    if(document.cookie.indexOf("token") === -1){
        window.location.replace("/login");
    }
    let user;
    user = document.cookie.split(';');
    token = user[0].substring(6);

    let url='https://carnet-api.herokuapp.com/user/getData?token='+token;

    axios({
        method:'get',
        url:url,
    })
        .then(function (response) {
            console.log(response.data.name);
            document.getElementById("name").innerHTML = response.data.name;
            document.getElementById("subscriber").innerHTML = '0';
            document.getElementById("email").innerHTML = response.data.email;
        })
        .catch(function (error) {
            alert(error);
        });
}

export default Dashboard;