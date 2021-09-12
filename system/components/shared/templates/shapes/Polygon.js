import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";

export default function Polygon(props) {

    const getPolygonPoints = useMemo(() => {
        let res
        switch (props.shape) {
            case 'triangle': {
                res = `${props.dimensions.width},${props.dimensions.height} 0,${props.dimensions.height} ${props.dimensions.width / 2},0`
                break
            }
            case 'relationship': {
                res = `0,${props.dimensions.height / 2} ${props.dimensions.width / 2},${props.dimensions.height} ${props.dimensions.width},${props.dimensions.height / 2} ${props.dimensions.width / 2},0`
                break
            }
            case 'parallelogram': {
                res = `0,${props.dimensions.height} ${props.dimensions.width / 4},0 ${props.dimensions.width},0 ${props.dimensions.width * (3 / 4)},${props.dimensions.height}`
                break
            }
            case 'trapezoid': {
                res = `${props.dimensions.width},${props.dimensions.height} 0,${props.dimensions.height} ${props.dimensions.width / 4},0 ${props.dimensions.width * (3 / 4)},0`
                break
            }
            default:
                break
        }
        return res
    }, [props.dimensions])

    return (
        <g

            cursor={props.cursor}
            id={props.id + '-*svg'} overflow={'visible'}>
            <polygon
                strokeDasharray={props.styles.strokeDasharray}
                fill={props.styles.fill !== undefined ? props.styles.fill : 'white'}
                stroke={props.styles.stroke !== undefined ? props.styles.stroke : '#0095ff'}
                vectorEffect={"non-scaling-stroke"}
                points={getPolygonPoints}
                x={0} y={0}
                filter={'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
                strokeWidth={props.styles.strokeWidth}
            />

        </g>
    )
}

Polygon.propTypes = {
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
    shape: PropTypes.oneOf(['triangle', 'parallelogram', 'trapezoid'])
}