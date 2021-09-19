import React from "react";
import PropTypes from "prop-types";

export default function Rect(props) {
    return (
        <g
            cursor={props.cursor}
            id={props.id + '-*svg'} overflow={'visible'}
        >
            <rect
                strokeDasharray={props.styles.strokeDasharray}
                rx={props.styles.borderRadius}
                ry={props.styles.borderRadius}
                x={0}
                y={0}

                width={props.dimensions.width} height={props.dimensions.height}
                // style={{transition: '150ms linear'}}
                vectorEffect={"non-scaling-stroke"}
                filter={'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
                fill={props.styles.fill !== undefined ? props.styles.fill : 'white'}
                stroke={props.styles.stroke !== undefined ? props.styles.stroke : '#0095ff'}
                strokeWidth={props.styles.strokeWidth}
            />

        </g>
    )
}

Rect.propTypes = {
    id: PropTypes.string,
    dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    styles: PropTypes.shape({
        strokeDasharray: PropTypes.string,
        strokeWidth: PropTypes.any,
        stroke: PropTypes.string,
        fill: PropTypes.string,
        borderRadius: PropTypes.any
    }),
}