import React from 'react';
import '../css/bootstrap.css';
import '../css/landing.css';

const Home = () => (
    <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <a class="navbar-brand" href="#">Carnet</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact Us</a>
                    </li>
                    
                </ul>
            </div>
        </nav>

        <div class = "container-fluid" id= "landing">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 text-center">
                    <img class="img-responsive" src="../res/logo.jpg" title=""></img>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 text-center">
                    <h3>Create | Share | Educate</h3>
                </div>
            </div>
        </div>

        <div class = "container-fluid" id= "about">
            <div class="row">
                <h2>About</h2>
            </div>
            <div class="row" id="aboutp">
                <p>Carnet is an online notebook application where users can create public/private notebooks, share them with other users, and use the knowledge to succeed in school or university.</p>
            </div>
        </div>
    </div>
);

export default Home;