import React from 'react';

const Dashboard = () => (
    <div className="App">
        <head>
            <meta charSet="utf-8"/>
                <title>Carnet Inc.</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/>
                    <link rel="stylesheet" href="../css/dashboard.css"/>
        </head>
        <body>
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

            <div id="menu">
                <ul>
                    <li><a href="#">Feed</a></li>
                    <li><a href="#">Add Notes</a></li>
                    <li><a href="#">Edit Notes</a></li>
                    <li><a href="#">Subscribers</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </div>

            <div id="introduction">
                <h3>Online Notes Service</h3>
                <p>Carnet makes it easy to create notes and organize them into notebooks. Notes can also be sorted with
                    custom tags, which is a great way to pull up all of your "study notes" or "recipes" with a couple of
                    clicks of the mouse. We have been studying and applying the best user experience in our work.</p>
            </div>

            <div id="mainbox" className="sidebar">

                <ul>
                    <li><a href="*">Private</a></li>
                    <li><a href="*">Public</a></li>
                </ul>

            </div>


            <footer className="footer">
                <div>
                    <p>Carnet Inc. Copyright &copy; 2018. Pooja Tewari, Shivangi Chand, Siddharth Dhar, Sripath Mishra,
                       </p>
                </div>
            </footer>


        </div>

        </body>
    </div>
);

export default Dashboard;