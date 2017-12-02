import React, { Component } from 'react'
import ContentImage from './ContentImage.js'

class ContentImagesRow extends Component {
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

export default ContentImagesRow;