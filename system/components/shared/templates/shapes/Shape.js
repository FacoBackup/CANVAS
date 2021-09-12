import PropTypes from 'prop-types'
import React, {useMemo, useRef} from "react";
import Ellipse from "./Ellipse";
import Rect from "./Rect";
import Polygon from "./Polygon";

export default function Shape(props) {
    const ref = useRef()
    const getShape = useMemo(() => {
        let res
        switch (props.shapeVariant) {
            case 'ellipse': {
                res = (
                    <Ellipse {...props}/>
                )
                break
            }
            case 'rect': {
                res = <Rect {...props}/>
                break
            }
            case 'polygon': {
                res = <Polygon {...props}/>
                break
            }
            default:
                break
        }
        return res
    }, [props.shapeVariant, props.styles])

    return (
        <g
            ref={ref} cursor={props.cursor}
            onClick={props.onClick} overflow={'hidden'}
            onMouseDown={props.onMouseDown}
        >
            {getShape}
            {props.children}
        </g>
    )
}

Shape.propTypes = {
    shapeVariant: PropTypes.oneOf(['rect', 'polygon', 'ellipse']),
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
    onMouseDown: PropTypes.func,
    id: PropTypes.string,
    children: PropTypes.node,
    cursor: PropTypes.string,
    onClick: PropTypes.func
}