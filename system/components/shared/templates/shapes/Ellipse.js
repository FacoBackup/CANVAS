import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function Ellipse(props) {

    return (
        <g
            cursor={props.cursor}
            id={props.id + '-*svg'} overflow={'visible'}
        >
            <ellipse

                strokeDasharray={props.styles.strokeDasharray}
                rx={props.dimensions.width / 2}
                ry={props.dimensions.height / 2}
                cx={props.dimensions.width / 2}
                cy={props.dimensions.height / 2}
                style={{transition: '150ms linear'}}

                vectorEffect={"non-scaling-stroke"}
                 filter={'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
                fill={props.styles.fill !== undefined ? props.styles.fill : 'white'}
                stroke={props.styles.stroke !== undefined ? props.styles.stroke : '#0095ff'}
                strokeWidth={props.styles.strokeWidth}
            />
        </g>
    )
}

Ellipse.propTypes = {
    id: PropTypes.string,
    dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    styles: PropTypes.shape({
        strokeDasharray: PropTypes.string,
        strokeWidth: PropTypes.any,
        stroke: PropTypes.string,
        fill: PropTypes.string
    }),
    // onMouseDown: PropTypes.func
}