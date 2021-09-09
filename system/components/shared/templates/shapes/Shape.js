import PropTypes from 'prop-types'
import styles from "../../styles/Node.module.css";
import React, {useEffect, useRef, useState} from "react";
import Ellipse from "./Ellipse";
import Rect from "./Rect";
import Polygon from "./Polygon";


export default function Shape(props) {

    const [open, setOpen] = useState(false)
    const ref = useRef()
    let openRef = false
    const getShape = () => {
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
    }

    const handleMouseDown = (event) => {
        let closest
        try {
            closest = event.target?.closest('.' + styles.entityContainer)
        } catch (e) {
        }

        if (openRef && closest === null) {
            setOpen(false)
            openRef = false
        }
    }
    const handleDoubleClick = () => {
        setOpen(true)
        openRef = true
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        ref.current?.addEventListener('dblclick', handleDoubleClick)
        return () => {
            ref.current?.removeEventListener('dblclick', handleDoubleClick)
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])

    return (
        <g
            ref={ref} cursor={props.cursor}
            onMouseDown={event => props.onMouseDown(event, open)}
        >
            {getShape()}
            {props.children}
        </g>
    )
}
Shape.propTypes = {
    shapeVariant: PropTypes.oneOf(['rect', 'polygon', 'ellipse']),
    shape: PropTypes.oneOf(['triangle', 'parallelogram', 'trapezoid']),
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
    cursor: PropTypes.string
}