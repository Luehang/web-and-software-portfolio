import './styles/application.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ContentImagesRow from './Components/ContentImagesRow.js'
import portfolioData from './data/portfolioData.js'
  
class FilterableImages extends Component {
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
  
ReactDOM.render(
    <FilterableImages portfolioData={portfolioData} />,
    document.getElementById('app')
);