import React, { Component } from 'react'

import Header from './partials/Header'
import Footer from './partials/Footer'
import HomeContainer from './../containers/HomeContainer'
import AboutContainer from './../containers/AboutContainer'
import PortfolioContainer from './../containers/PortfolioContainer'
import ContactContainer from './../containers/ContactContainer'
  
export default class PortfolioScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_settings: {
                current_page: "about",
                is_mobile_dropdown: false
            },
            sorter_settings: {
                type: "all"
            }
        }
        this.handleNavChange = this.handleNavChange.bind(this);
        this.handleProjectSortChange = this.handleProjectSortChange.bind(this);
    }
    handleNavChange(e) {
        const { type, page } = e.target.dataset;
        const { nav_settings } = this.state;
        if ( "mobile" == type ) {
            nav_settings.is_mobile_dropdown = !nav_settings.is_mobile_dropdown;
            nav_settings.current_page = "";
        } else if ( "home" == page ) {
            nav_settings.is_mobile_dropdown = false;
            nav_settings.current_page = "about";
        } else {
            nav_settings.is_mobile_dropdown = false;
            nav_settings.current_page = page;
        }
        this.setState({
            nav_settings
        });
    }
    handleProjectSortChange(e) {
        const { sort } = e.target.dataset;
        const { sorter_settings } = this.state;
        if ( "all" == sort ) {
            sorter_settings.type = "all";
        } else if ( "node" == sort ) {
            sorter_settings.type = "node";
        } else if ( "react" == sort ) {
            sorter_settings.type = "react";
        } else if ( "javascript" == sort ) {
            sorter_settings.type = "javascript";
        }
        this.setState({
            sorter_settings
        });
    }
    render() {
        const {
            sorter_settings,
            nav_settings
        } = this.state;
        return (
            <div className="screen">
                <div className="slide">
                    <div className="belt">
                        <div className="state state-1">
                            <HomeContainer />
                            
                        </div>

                        <div className="state state-2">
                            <Header 
                                nav_settings={nav_settings}
                                handleNavChange={this.handleNavChange}
                            />
                            
                            <div className="alert"></div>

                            <AboutContainer />

                            <PortfolioContainer 
                                handleProjectSortChange={this.handleProjectSortChange}
                                sorter_settings={sorter_settings}
                            />

                            <ContactContainer />

                            <Footer />
                            
                        </div> {/* end state-2 */}

                    </div> {/* end belt */}
                </div> {/* end slide */}
            </div> 
        );
    }
}