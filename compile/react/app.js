import React from 'react'
import ReactDOM from 'react-dom'

class ContentImage extends React.Component {
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
  
class ContentImagesRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let row = [];
        let sortType = "";
        if (this.props.isAll) {
            sortType = "all";
        } else if (this.props.isNode) {
            sortType = "node";
        } else if (this.props.isReact) {
            sortType = "react";
        } else if (this.props.isJavascript) {
            sortType = "javascript";
        }
        this.props.data.map((data) => {
            if (sortType === "all") {
                row.push(
                    <ContentImage data={data} key={row.length++} />
                );
            }
            if (sortType === data.type) {
                row.push(
                    <ContentImage data={data} key={row.length++} />
                );
            }
        });
        return (
            <div className="sort-row">
                {row}
            </div>
        );
    }
}
  
class FilterableImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioData: this.props.portfolioData,
            all: true,
            node: false,
            react: false,
            javascript: false
        }
        this.onClickAll = this.onClickAll.bind(this);
        this.onClickNode = this.onClickNode.bind(this);
        this.onClickReact = this.onClickReact.bind(this);
        this.onClickJavascript = this.onClickJavascript.bind(this);
    }
    onClickAll() {
        if (!this.state.all) {
            this.setState({
            all: true,
            node: false,
            react: false,
            javascript: false
            });
        }
    }
    onClickNode() {
        if (!this.state.node) {
            this.setState({
                all: false,
                node: true,
                react: false,
                javascript: false
            });
        }
    }
    onClickReact() {
        if (!this.state.react) {
            this.setState({
                all: false,
                node: false,
                react: true,
                javascript: false
            });
        }
    }
    onClickJavascript() {
        if (!this.state.javascript) {
            this.setState({
                all: false,
                node: false,
                react: false,
                javascript: true
            });
        }
    }
    render() {
        const all = this.state.all ? "button sort-selected" : "button";
        const node = this.state.node ? "button sort-selected" : "button";
        const react = this.state.react ? "button sort-selected" : "button";
        const javascript = this.state.javascript ? "button sort-selected" : "button";
        return (
            <div className="sort-image-container">
                <div className="tab">
                    <div 
                    className={all}
                    onClick={this.onClickAll}>ALL</div>
                </div>
                <div className="tab"> 
                    <div 
                    className={node} 
                    onClick={this.onClickNode}>NODE JS</div>
                </div>
                <div className="tab"> 
                    <div 
                    className={react}
                    onClick={this.onClickReact}>REACT JS</div>
                </div>
                <div className="tab">
                    <div 
                    className={javascript}
                    onClick={this.onClickJavascript}>JAVASCRIPT</div>
                </div>
                <ContentImagesRow
                    data={this.state.portfolioData}
                    isAll={this.state.all}
                    isNode={this.state.node}
                    isReact={this.state.react}
                    isJavascript={this.state.javascript}
                />
            </div>
        );
    }
}
  
const portfolioData = [
    {
        title: "Riverside Pizza",
        description: "Node JS/Express JS/MongoDB",
        type: "node",
        image_location: "./img/riverside-pizza.jpg",
        path_location: "https://www.manitowocsriversidepizza.com"
    },
    {
        title: "Game Of Life",
        description: "React JS/jQuery",
        type: "react",
        image_location: "./img/game_of_life.jpg",
        path_location: "https://codepen.io/Luehang/full/gGobqM/"
    },
    {
        title: "Simon",
        description: "Javascript/jQuery",
        type: "javascript",
        image_location: "./img/simon.jpg",
        path_location: "https://codepen.io/Luehang/full/Kqaedo/"
    },
    {
        title: "Recipe Box",
        description: "React JS",
        type: "react",
        image_location: "./img/recipe_box.jpg",
        path_location: "https://codepen.io/Luehang/full/WEeLMY/"
    },
    {
        title: "Leaderboard",
        description: "React JS",
        type: "react",
        image_location: "./img/camper_leaderboard.jpg",
        path_location: "https://codepen.io/Luehang/full/PjvBKQ/"
    },
    {
        title: "Markdown Previewer",
        description: "React JS",
        type: "react",
        image_location: "./img/markdown.jpg",
        path_location: "https://codepen.io/Luehang/full/WOaYEj/"
    },
    {
        title: "Wiki Viewer",
        description: "Javascript/jQuery",
        type: "javascript",
        image_location: "./img/wiki.jpg",
        path_location: "https://codepen.io/Luehang/pen/vmqNaY"
    },
    {
        title: "Tic Tac Toe",
        description: "Javascript/jQuery",
        type: "javascript",
        image_location: "./img/tic_tac_toe.jpg",
        path_location: "https://codepen.io/Luehang/full/EXNeVR/"
    },
    {
        title: "Basic Calculator",
        description: "Javascript/jQuery",
        type: "javascript",
        image_location: "./img/calc.jpg",
        path_location: "https://codepen.io/Luehang/full/GEqmvX/"
    },
    {
        title: "Pomodoro",
        description: "Javascript/jQuery",
        type: "javascript",
        image_location: "./img/pomodoro.jpg",
        path_location: "https://codepen.io/Luehang/full/QgKPqO/"
    },
    {
        title: "Forecast",
        description: "Javascript/jQuery",
        type: "javascript",
        image_location: "./img/weather.jpg",
        path_location: "https://codepen.io/Luehang/full/zwXBBy/"
    },
    {
        title: "Twitch Users",
        description: "Javascript/jQuery",
        type: "javascript",
        image_location: "./img/twitch.jpg",
        path_location: "https://codepen.io/Luehang/full/YVboxm/"
    },
    {
        title: "Flickr Search",
        description: "Javascript/jQuery",
        type: "javascript",
        image_location: "./img/quote.jpg",
        path_location: "https://codepen.io/Luehang/full/wdOePp/"
    },
];
  
ReactDOM.render(
    <FilterableImages portfolioData={portfolioData} />,
    document.getElementById('app')
);