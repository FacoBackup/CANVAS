import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function Rect(props) {
    const [viewBox, setViewBox] = useState({})
    const handleViewBox = () => {
        if (props.dimensions.width > props.dimensions.height)
            setViewBox({
                x: 100,
                y: (props.dimensions.height / props.dimensions.width) * 100,
            })
        else if (props.dimensions.width < props.dimensions.height)
            setViewBox({
                x: (props.dimensions.width / props.dimensions.height) * 100,
                y: 100
            })
        else
            setViewBox({
                x: 100,
                y: 100
            })
    }

    useEffect(() => {
        handleViewBox()
    }, [props.dimensions])
    return (
        <svg
            width={props.dimensions.width} height={props.dimensions.height}
            viewBox={`0 0 ${viewBox.x} ${viewBox.y}`} id={props.id + '-*svg'} overflow={'visible'}>
            <rect
                strokeDasharray={props.styles.strokeDasharray}
                rx={props.styles.borderRadius}
                ry={props.styles.borderRadius}
                x={0} width={viewBox.x}
                y={0} height={viewBox.y}
                vectorEffect={"non-scaling-stroke"}
                filter={'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
                fill={props.styles.fill !== undefined ? props.styles.fill : 'white'}
                stroke={props.styles.stroke !== undefined ? props.styles.stroke : '#0095ff'}
                strokeWidth={props.styles.strokeWidth}
            />

        </svg>
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