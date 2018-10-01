import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './css/App.css';
import Create_user from './components/Create_user'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Route from "react-router/es/Route";

const App = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create_user">Create User</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/create_user" component={Create_user} />
            <Route path="/dashboard" component={Dashboard} />
        </div>
    </Router>
);

export default App;
