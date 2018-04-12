import React from 'react'
import PropTypes from 'prop-types'

import ContentImage from './ContentImage.js'

export default function ContentImagesRow(props) {
    const {
        projectsData,
        sortType
    } = props;
    const rows = projectsData.map((project, i) => {
        if (sortType == "all") {
            return (
                <ContentImage data={project} key={i + 1} />
            );
        }
        if (sortType == project.type) {
            return (
                <ContentImage data={project} key={i + 1} />
            );
        }
    });
    return (
        <div className="sort-row">
            {rows}
        </div>
    );
}

ContentImagesRow.propTypes = {
    projectsData: PropTypes.array.isRequired,
    sortType: PropTypes.string.isRequired
}

