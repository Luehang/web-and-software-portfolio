import React from 'react'

export default function About() {
    return (
        <section className="body-container" id="about">
            <h1>ABOUT</h1>
            <div className="line-separation"></div>
            <div className="card"><img src="img/lue_hang2018.jpg" alt="Lue Hang" style={{width: '100%'}}/>
                <div className="profile-container">
                    <div className="profile-top">
                        <h1>Lue Hang</h1>
                        <p className="title">Full-Stack Web and Software Developer, Fitness Trainer</p>
                        <p>"Mern Stack," mobile and game developer.  I am able to write codes for React JS, React Native, Redux, Node JS, Express JS, JavaScript, jQuery, SASS, CSS, HTML5,  Mongo DB, MySql, Java, C#, Webpack and Gulp.  On my free time, I love to work out and practice Mauy Thai.</p><a href="mailto:luehang17@gmail.com"><i className="fa fa-envelope"></i></a><a href="https://github.com/luehang"><i className="fa fa-github"></i></a><a href="https://facebook.com/lue.hang"><i className="fa fa-facebook"></i></a><a href="https://www.linkedin.com/in/lue-hang-8ba684153"><i className="fa fa-linkedin"></i></a>
                    </div>
                    <div className="profile-bottom">
                        <a href="#contact"><button>Contact</button></a>
                    </div>
                </div>
            </div>
        </section>
    );
}