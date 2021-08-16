import PropTypes from 'prop-types'
import styles from "../../styles/Node.module.css";
import NodePropsTemplate from "../../../../templates/NodePropsTemplate";
import React, {useEffect, useState} from "react";

export default function EllipseShape(props) {
    const [viewBox, setViewBox] = useState({})
    useEffect(() => {
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
    }, [props.node.dimensions])
    return (
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
                fill={'white'}
                rx={viewBox.x / 2}
                ry={viewBox.y / 2}
                vectorEffect={"non-scaling-stroke"}
                cx={'50%'} cy={'50%'} filter={'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
                stroke={props.node.styling.color} strokeWidth={props.node.styling.borderWidth}
            />
            <foreignObject
                x={0} y={0}
                width={'100%'} overflow={'visible'}
                height={'100%'}
                className={props.toBeLinked !== undefined ? styles.pulse : undefined}
            >
                <div className={styles.nodeShapeContainer} id={props.node.id + '-*wrapper'}
                     onClick={() => {
                         props.setSelected(props.node)
                     }}
                >
                    <div className={styles.header} id={props.node.id + '-*header'}>
                        {props.node.title}
                    </div>
                </div>
                <div className={styles.nodePosition} id={props.node.id + '-placement'} style={{
                    opacity: props.onMove ? '1' : '0',
                    visibility: props.onMove ? 'visible' : 'hidden',
                }}/>
            </foreignObject>
        </svg>
    )
}
EllipseShape.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}