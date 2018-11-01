import React from 'react';
import axios from 'axios';
import '../css/landing.css';
import '../css/bootstrap.css';
import share from '../res/share.jpg';
import educate from '../res/educate.jpg';
import create from '../res/create.jpg';

const Home = () => (
    <div className="App">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">

            <a className="navbar-brand" href="#landing">Carnet</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#about">About</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#contact">Feedback</a>
                    </li>
                </ul>

            </div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link" href="/create_user">Sign Up</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>

            </ul>
        </nav>

        <div id="landing" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <img className="landingimg" src={require("../res/logo.png")} alt="cannot display"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h3>Create • Share • Educate</h3>
                    </div>
                </div>
            </div>
        </div>

        <div id="about" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h2>About</h2>
                    </div>
                </div>
                <hr></hr>
                <div className="row">

                </div>

                <div className="row">
                    <div className="col-sm">
                        <h4>Create</h4>
                        <img src={create} alt="create"/>
                        <p>Create online notebooks and pages within the notebook.</p>
                    </div>
                    <div className="col-sm">
                        <h4>Share</h4>
                        <img src={share} alt="share"/>
                        <p>Share the notebooks with other users or keep them private.</p>
                    </div>
                    <div className="col-sm">
                        <h4>Educate</h4>
                        <img src={educate} alt="educate"/>
                        <p>Help educate users around the world through this application.</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="contact" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h2>Feedback</h2>
                    </div>
                </div>
                <hr></hr>
                <p>Have any questions, comments, or concerns? Send us your feedback below!</p>
                <form>
                    <div className="form-group">

                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>
                    <hr></hr>
                    <button type="submit" className="btn btn-light" onClick={feedback}>Submit</button>
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
);

function feedback(){

    axios({
        method:'post',
        url:'https://carnet-api.herokuapp.com/feedback/',
        data:{
            feedbackText:document.getElementById("exampleFormControlTextarea1").value,
        }
    })
        .then(function (response) {
            alert("Feedback submitted, Thank You!");
            console.log(response.data);
            window.location.replace("/");

        })
        .catch(function (error) {
            alert("Error: Feedback was not submitted please try again!");
            console.log(error + '1');
        });
}

export default Home;
