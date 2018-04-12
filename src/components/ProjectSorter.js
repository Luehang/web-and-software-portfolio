import React from 'react'
import PropTypes from 'prop-types'

import ContentImagesRow from './ContentImagesRow.js'
import portfolioData from './../data/portfolioData.js'
  
export default function ProjectSorterContainer(props) {
    const {
        handleProjectSortChange,
        sorter_settings
    } = props;
    const all = sorter_settings.type == "all" ? "button sort-selected" : "button";
    const node = sorter_settings.type == "node" ? "button sort-selected" : "button";
    const react = sorter_settings.type == "react" ? "button sort-selected" : "button";
    const javascript = sorter_settings.type == "javascript" ? "button sort-selected" : "button";
    return (
        <div className="sort-image-container">
            <div className="tab">
                <a 
                    className={all}
                    style={{display: 'block'}}
                    data-sort="all"
                    onClick={handleProjectSortChange}>ALL</a>
            </div>
            <div className="tab"> 
                <a 
                    className={node} 
                    style={{display: 'block'}}
                    data-sort="node"
                    onClick={handleProjectSortChange}>NODE JS</a>
            </div>
            <div className="tab"> 
                <a 
                    className={react}
                    style={{display: 'block'}}
                    data-sort="react"
                    onClick={handleProjectSortChange}>REACT JS</a>
            </div>
            <div className="tab">
                <a 
                    className={javascript}
                    style={{display: 'block'}}
                    data-sort="javascript"
                    onClick={handleProjectSortChange}>JAVASCRIPT</a>
            </div>
            <ContentImagesRow
                projectsData={portfolioData}
                sortType={sorter_settings.type}
            />
        </div>
    );
}

ProjectSorterContainer.propTypes = {
    handleProjectSortChange: PropTypes.func.isRequired,
    sorter_settings: PropTypes.object.isRequired
}