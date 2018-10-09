import React from 'react';
import '../css/landing.css';
import '../css/bootstrap.css';
import '../css/bootstrap-grid.css';


const Home = () => (
    <div className="App">
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">

            <a class="navbar-brand" href="#landing">Carnet</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About</a>
                    </li>
                
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Feedback</a>
                    </li>
                </ul>
                
            </div>
            <ul class="nav justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Sign Up</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Login</a>
                    </li>
                    
            </ul>
        </nav>

        <div id= "landing" class="d-flex align-items-center">
            <div  class = "container-fluid" >
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <img class="landingimg" src={require("../res/logo.png")} alt="cannot display"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h3>Create • Share • Educate</h3>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="about" class="d-flex align-items-center"> 
            <div class = "container-fluid">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h2>About</h2>
                    </div>
                </div>
                <hr></hr>
                <div class="row">
                    
                </div>
               
                <div class="row">
                    <div class="col-sm">
                        <h4>Create</h4>
                        <img src={require("../res/create.jpg")} alt="..." class="img-thumbnail"/>

                        <p>Create online notebooks and pages within the notebook.</p>
                    </div>
                    <div class="col-sm">
                        <h4>Share</h4>
                        <img src={require("../res/share.jpg")} alt="..." class="img-thumbnail"/>
                        <p>Share the notebooks with other users or keep them private.</p>
                    </div>
                    <div class="col-sm">
                        <h4>Educate</h4>
                        <img src={require("../res/educate.jpg")} alt="..." class="img-thumbnail"/>
                        <p>Help educate users around the world through this application.</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="contact" class="d-flex align-items-center" >
            <div class = "container-fluid">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h2>Feedback</h2>
                    </div>
                </div>
                <hr></hr>
                <p>Have any questions, comments, or concerns? Send us your feedback below!</p>
                <form>
                    <div class="form-group">
                        
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>
                    <hr></hr>
                    <button type="submit" class="btn btn-light">Submit</button>
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

export default Home;