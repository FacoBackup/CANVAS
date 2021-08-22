import PropTypes from 'prop-types'
import styles from "../../styles/Node.module.css";
import NodePropsTemplate from "../../../../templates/NodePropsTemplate";
import React, {useEffect, useRef, useState} from "react";

export default function EllipseShape(props) {
    const [viewBox, setViewBox] = useState({})
    const [open, setOpen] = useState(false)
    const ref = useRef()
    let openRef = false

    const handleViewBox = () => {
        if (props.node.dimensions.width > props.node.dimensions.height)
            setViewBox({
                x: 100,
                y: (props.node.dimensions.height / props.node.dimensions.width) * 100,
            })
        else if (props.node.dimensions.width < props.node.dimensions.height)
            setViewBox({
                x: (props.node.dimensions.width / props.node.dimensions.height) * 100,
                y: 100
            })
        else
            setViewBox({
                x: 100,
                y: 100
            })
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
        handleViewBox()
        document.addEventListener('mousedown', handleMouseDown)
        ref.current?.addEventListener('dblclick', handleDoubleClick)
        return () => {
            ref.current?.removeEventListener('dblclick', handleDoubleClick)
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [props.node.dimensions])

    return (
        <g
            ref={ref}
            onMouseDown={event => {
                if(event.button === 0){
                    if (!open)
                        props.move(event)
                    props.setSelected(props.node)
                }
            }}
        >
            <svg
                width={props.node.dimensions.width} height={props.node.dimensions.height}
                onMouseDown={event => {
                    props.move(event)
                    props.setSelected(props.node)
                }}
                onDoubleClick={() => {
                    props.openOverview()
                }}
                viewBox={`0 0 ${viewBox.x} ${viewBox.y}`} id={props.node.id + '-*svg'} overflow={'visible'}>
                <ellipse
                    fill={'white'} strokeDasharray={props.node.styling.strokeDasharray}
                    rx={viewBox.x / 2}
                    ry={viewBox.y / 2}
                    vectorEffect={"non-scaling-stroke"}
                    cx={'50%'} cy={'50%'} filter={'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
                    stroke={props.node.styling.color} strokeWidth={props.node.styling.strokeWidth}
                />
            </svg>
            <foreignObject
                x={0} y={0}
                overflow={'visible'}
                width={props.node.dimensions.width} height={props.node.dimensions.height}
                className={props.linkable ? styles.pulse : undefined}
            >
                <div className={styles.nodeShapeContainer} id={props.node.id + '-*wrapper'}
                     onClick={() => {
                         props.setSelected(props.node)
                     }}
                >
                    <input
                        style={{display: open ? undefined : 'none'}}
                        value={props.node.title}
                        className={styles.nodeInput}
                        onChange={event => props.setNode({
                            ...props.node,
                            title: event.target.value
                        })}
                    />
                    <div
                        style={{display: !open ? undefined : 'none'}}
                        className={styles.header} id={props.node.id + '-*header'}
                    >
                        {props.node.title}
                    </div>
                </div>
                <div className={styles.nodePosition} id={props.node.id + '-placement'} style={{
                    opacity: props.onMove ? '1' : '0',
                    visibility: props.onMove ? 'visible' : 'hidden',
                }}/>
            </foreignObject>
        </g>
    )
}
EllipseShape.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}