import React from 'react';
import '../css/DashboardStyle.css';
import '../css/dashboard-grid.css';
import axios from "axios";

let token ='';

const Dashboard = () =>(
    load(),
    <div className="App">
        <div className="containerhead clearfix">
            <div className="containerlogo"></div>
            <input className="_input" type="text"/>
            <button className="_button">Search</button>
        </div>
        <div className="containerside clearfix">
            <div className="containeruserimage"></div>
            <label className="textname" id = "name">Name of the User</label>
            <label className="textsubs" id = "subscriber">Subscribers: NaN</label>
            <label className="textemail" id = "email">Email Address of the User&nbsp;</label>
        </div>
        <div className="containermain clearfix">
            <button className="_button _button-2">Notebook</button>
            <button className="_button _button-3">Notifications</button>
            <div className="containernotebook"></div>
        </div>
    </div>
);

function load(){
    console.log("fgnfgn");
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