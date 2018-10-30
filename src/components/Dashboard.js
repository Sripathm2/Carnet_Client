import React from 'react';
import '../css/DashboardStyle.css';
import '../css/dashboard-grid.css';
import logo from '../res/logo.jpg';
import user from '../res/user.jpg'
const Dashboard = () => (
    <div className="App">
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
            <p className="textname"><span>Name of the User</span></p>
            <p className="textsubs">Subscribers: NaN</p>
            <p className="textemail">Email Address of the User&nbsp;</p>
        </div>
        <div className="containermain clearfix">
            <button className="_button _button-2">Notebook</button>
            <button className="_button _button-5">Notifications</button>
            <div className="containernotebook"></div>
        </div>
    </div>
);

export default Dashboard;