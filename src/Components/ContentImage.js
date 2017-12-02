import React, { Component } from 'react'

class ContentImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: false
        }
        this.onListClick = this.onListClick.bind(this);
    }
    onListClick() {
        if (this.state.list !== true) {
            this.setState({
                list: true
            });
        } else {
            this.setState({
                list: false
            });
        }
    }
    render() {
        const list = this.state.list ?
            {
                animationName: "top-slide-in",
                animationDuration: "200ms",
                animationTimingFunction: "cubic-bezier(0, 1.69, 0.76, 0.5)",
                animationFillMode: "forwards"
            } 
            : {display: ""};
        const data = this.props.data;
        return(
            <div className="sort">
                <div className="browser-container">
                    <div className="row">
                        <div className="column left">
                            <span className="dot" style={{background:'#ED594A'}}></span>
                            <span className="dot" style={{background:'#FDD800'}}></span>
                            <span className="dot" style={{background:'#5AC05A'}}></span>
                        </div>
                        <div className="column middle">
                            <div className="browser-input">{data.title}</div>
                        </div>
                        <div className="column right">
                            <div className="bar-list" style={{float:'right'}} onClick={this.onListClick}>
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                        </div>
                    </div>
                    <div className="browser-content">
                        <div className="image-container">
                            <img className="image" src={data.image_location}/>
                            <div className="image-overlay" style={list}>
                                <div className="text-container">
                                    <p>{data.title}</p>
                                    <p>{data.description}</p>
                                    <div className="more-button">
                                        <a href={data.path_location}>
                                            <i className="fa fa-external-link" aria-hidden="true"> 
                                                <p>VIEW SITE</p>
                                            </i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentImage;