import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './css/App.css';
import Create_user from './components/Create_user'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Route from "react-router/es/Route";
import axios from "axios";

let data = axios.get('https://carnet-api.herokuapp.com/', {
})
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });
const App = () => (
    <Router>
        <div>
            <p>testing testing {data}</p>
            <Route exact path="/" component={Home} />
            <Route path="/create_user" component={Create_user} />
            <Route path="/dashboard" component={Dashboard} />
        </div>
    </Router>
);



export default App;
