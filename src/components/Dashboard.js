import React from 'react';
import '../css/dashboard.css'
const Dashboard = () => (
    <div className="App">
        <div id="container">
            <div id="header">
                <div id="brand">
                    <h1><a>Carnet Inc.</a></h1>
                </div>
                <div id="searchbox">
                    <form method="get">
                        <input type="text" className="text"/>
                            <input type="submit" value="Search" className="submit "/>
                    </form>
                </div>
            </div>

            <footer className="footer">
                <div>
                    <p>Carnet Inc. Copyright &copy; 2018. Pooja Tewari, Shivangi Chand, Siddharth Dhar, Sripath Mishra,
                       </p>
                </div>
            </footer>


        </div>

    </div>
);

export default Dashboard;