import React from 'react'

export default function Footer() {
    return (
        <footer>
            <div className="body-container">
                <div className="top-button"><a href="#about"><i className="fa fa-arrow-up" aria-hidden="true"></i></a></div>
                <div className="icons-link">
                    <a href="mailto:luehang17@gmail.com"><i className="fa fa-envelope"></i></a>
                    <a href="https://github.com/luehang"><i className="fa fa-github"></i></a>
                    <a href="https://facebook.com/lue.hang"><i className="fa fa-facebook"></i></a>
                    <a href="https://www.linkedin.com/in/lue-hang-8ba684153"><i className="fa fa-linkedin"></i></a>
                </div>
                <p>LUE HANG&copy;2018</p>
            </div>
        </footer> 
    );
}