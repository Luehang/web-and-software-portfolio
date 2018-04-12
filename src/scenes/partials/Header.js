import React from 'react'
import PropTypes from 'prop-types'

export default function Header(props) {
    const {
        nav_settings,
        handleNavChange
    } = props;
    const home = nav_settings.current_page == "home" ? "nav-main-text home selected" : "nav-main-text home";
    const about = nav_settings.current_page == "about" ? "nav-main-text selected" : "nav-main-text";
    const portfolio = nav_settings.current_page == "portfolio" ? "nav-main-text selected" : "nav-main-text";
    const contact = nav_settings.current_page == "contact" ? "nav-main-text selected" : "nav-main-text";
    const isMobileDropdown = nav_settings.is_mobile_dropdown ? "dropdown-menu-enable" : "dropdown-menu-disable";
    return (
        <nav>
            <div className="list-icon-container">
                <div className="list-mobile-container">
                    <h3>Lue Hang's Portfolio</h3>
                    <a className="icon-list"
                        data-type="mobile"
                        onClick={handleNavChange}
                    >
                        <div className="list-bar"></div>
                        <div className="list-bar"></div>
                        <div className="list-bar"></div>
                    </a>
                </div>
            </div>
            <div className="main-list-container dropdown-menu menu-1">
                <div className="nav-container">
                    <div id="dropdown-menu-1" className={isMobileDropdown}>
                        <ul className="main-list">
                            <li>
                                <a className={home} 
                                    data-page="home"
                                    onClick={handleNavChange}
                                    href="#">HOME
                                </a>
                            </li>
                            <li>
                                <a className={about} 
                                    data-page="about"
                                    onClick={handleNavChange}
                                    href="#about">ABOUT
                                </a>
                            </li>
                            <li>
                                <a className={portfolio} 
                                    data-page="portfolio"
                                    onClick={handleNavChange}
                                    href="#portfolio">PORTFOLIO
                                </a>
                            </li>
                            <li>
                                <a className={contact} 
                                    data-page="contact"
                                    onClick={handleNavChange}
                                    href="#contact">CONTACT
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

Header.propTypes = {
    nav_settings: PropTypes.object.isRequired,
    handleNavChange: PropTypes.func.isRequired
}