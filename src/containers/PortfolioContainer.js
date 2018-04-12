import React from 'react'
import PropTypes from 'prop-types'

import ProjectSorter from './../components/ProjectSorter'

export default function PortfolioContainer(props) {
    const {
        handleProjectSortChange,
        sorter_settings
    } = props;
    return (
        <section className="body-container" id="portfolio">
            <h1>PROJECTS</h1>
            <div className="line-separation"></div>
            <ProjectSorter
                handleProjectSortChange={handleProjectSortChange}
                sorter_settings={sorter_settings}
            />
        </section> 
    );
}

PortfolioContainer.propTypes = {
    handleProjectSortChange: PropTypes.func.isRequired,
    sorter_settings: PropTypes.object.isRequired
}