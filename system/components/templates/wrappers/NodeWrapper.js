import React, {useRef, useState} from "react";
import NodePropsTemplate from "../props/NodePropsTemplate";
import SelectedWrapper from "./SelectedWrapper";
import Shape from "../shapes/Shape";
import styles from '../../styles/Node.module.css'
import PlaceNode from "../../utils/placement/PlaceNode";


export default function NodeWrapper(props) {
    const ref = useRef()
    const [onMove, setOnMove] = useState(false)

    const moveNode = (event) => {
        PlaceNode({
            scale: props.scale,
            node: props.node,
            event: event,
            setSelectedNode: props.setSelected,
            setOnMove: setOnMove,
            savePlacement: props.savePlacement,
            noPlacementIndicator: props.noPlacementIndicator
        })
    }

    return (
        <g
            id={props.node.id + '-node'} overflow={'visible'}
            transform={`translate(${props.node.placement.x}, ${props.node.placement.y})`}
            ref={ref}
            fill={'transparent'}
            className={styles.entityContainer}
        >
            <SelectedWrapper {...props}/>

            {props.controlComponents.map(element => element)}

            <Shape
                id={props.node.id}
                shapeVariant={props.node.shapeVariant}
                shape={props.node.styling.shape}
                dimensions={{...props.node.dimensions}}
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
                }}
            >

                {props.children({
                    ...props, onMove: onMove, setOnMove: setOnMove, moveNode: moveNode
                })}
            </Shape>

        </g>
    )
}

NodeWrapper.propTypes = NodePropsTemplate