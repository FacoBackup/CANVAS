import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function Polygon(props) {
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
    const getPolygonPoints = () => {
        let res
        switch (props.shape) {
            case 'triangle': {
                res = `${viewBox.x},${viewBox.y} 0,${viewBox.y} ${viewBox.x / 2},0`
                break
            }
            // case 'relationship': {
            //     res = `0,${viewBox.y / 2} ${viewBox.x / 2},${viewBox.y} ${viewBox.x},${viewBox.y / 2} ${viewBox.x / 2},0`
            //     break
            // }
            case 'parallelogram': {
                res = `0,${viewBox.y} ${viewBox.x / 4},0 ${viewBox.x},0 ${viewBox.x * (3 / 4)},${viewBox.y}`
                break
            }
            case 'trapezoid': {
                res = `${viewBox.x},${viewBox.y} 0,${viewBox.y} ${viewBox.x / 4},0 ${viewBox.x * (3 / 4)},0`
                break
            }
            default:
                break
        }
        return res
    }
    useEffect(() => {
        handleViewBox()
    }, [props.dimensions])
    return (
        <svg
            width={props.dimensions.width} height={props.dimensions.height}
            viewBox={`0 0 ${viewBox.x} ${viewBox.y}`} id={props.id + '-*svg'} overflow={'visible'}>
            <polygon
                strokeDasharray={props.styles.strokeDasharray}
                fill={props.styles.fill !== undefined ? props.styles.fill : 'white'}
                stroke={props.styles.stroke !== undefined ? props.styles.stroke : '#0095ff'}
                vectorEffect={"non-scaling-stroke"}
                points={getPolygonPoints()}
                x={0} y={0}
                filter={'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
                strokeWidth={props.styles.strokeWidth}
            />

        </svg>
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