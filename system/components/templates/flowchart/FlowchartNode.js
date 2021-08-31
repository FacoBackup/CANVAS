import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import NodePropsTemplate from "../props/NodePropsTemplate";
import SelectedWrapper from "./modules/SelectedWrapper";
import ConnectionsWrapper from "./modules/ConnectionsWrapper";
import Shape from "../shapes/Shape";
import styles from '../../styles/Node.module.css'
import Content from "./modules/Content";
import PlaceNode from "../../utils/placement/PlaceNode";


export default function FlowchartNode(props) {
    const ref = useRef()
    const [onMove, setOnMove] = useState(false)

    const moveNode = (event) => {
        PlaceNode({
            scale: props.scale,
            node: props.node,
            event: event,
            setSelectedNode: props.setSelected,
            setOnMove: setOnMove,
            savePlacement: props.savePlacement
        })
    }


    return (
        <g
            id={props.node.id + '-node'} overflow={'visible'}
            transform={`translate(${props.node.placement.x}, ${props.node.placement.y})`}
            ref={ref}

            className={styles.entityContainer}
        >


            <SelectedWrapper {...props}/>
            <ConnectionsWrapper {...props}/>

            <Shape
                id={props.node.id}
                shapeVariant={props.node.shapeVariant}
                shape={props.node.styling.shape}
                dimensions={props.node.dimensions}
                styles={{
                    fill: props.node.styling.fill,
                    stroke: props.node.styling.color,
                    strokeDasharray: props.node.styling.strokeDasharray,
                    strokeWidth: props.node.styling.strokeWidth
                }}
                onMouseDown={(event, open) => {
                    if (event.button === 0) {
                        if (!open)
                            moveNode(event)
                        props.setSelected(props.node)
                    }
                }}>
                <foreignObject
                    x={0} y={0}
                    overflow={'visible'}
                    width={props.node.dimensions.width} height={props.node.dimensions.height}
                    // className={props.linkable ? styles.pulse : undefined}
                >
                    <div className={styles.nodeShapeContainer} id={props.node.id + '-*wrapper'}
                         onClick={() => {
                             props.setSelected(props.node)
                         }}
                    >
                        <Content
                            node={props.node} setNode={props.setNode}
                            currentTextStyles={props.currentTextStyles}
                        />
                    </div>
                    <div className={styles.nodePosition} id={props.node.id + '-placement'} style={{
                        opacity: onMove ? '1' : '0',
                        visibility: onMove ? 'visible' : 'hidden',
                    }}/>
                </foreignObject>
            </Shape>

        </g>
    )
}

FlowchartNode.propTypes = NodePropsTemplate