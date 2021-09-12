import React, {useEffect, useRef, useState} from "react";
import NodePropsTemplate from "../../../flowchart/templates/NodePropsTemplate";
import SelectedWrapper from "./SelectedWrapper";
import Shape from "../shapes/Shape";
import styles from '../../styles/Node.module.css'
import PlaceNode from "../../utils/PlaceNode";


export default function NodeWrapper(props) {
    const ref = useRef()

    const moveNode = (event) => {
        PlaceNode({
            scale: props.scale,
            node: props.node,
            event: event,
            setSelectedNode: props.setSelected,
            savePlacement: props.savePlacement,
            noPlacementIndicator: props.noPlacementIndicator
        })
    }

    return (
        <g
            id={props.node.id + '-node'}
            transform={`translate(${props.node.placement.x}, ${props.node.placement.y})`}
            ref={ref}
            overflow={'hidden'}
            fill={'none'}
            className={styles.entityContainer}
        >
            <Shape
                id={props.node.id}
                shapeVariant={props.node.shapeVariant}
                shape={props.node.styling.shape}
                dimensions={{...props.node.dimensions}}
                cursor={props.selected === props.node.id ? 'grab' : props.focusOnDouble ? 'pointer' : undefined}
                styles={{
                    fill: props.node.styling.fill,
                    stroke: props.node.styling.color,
                    strokeDasharray: props.node.styling.strokeDasharray,
                    strokeWidth: props.node.styling.strokeWidth,
                    borderRadius: props.node.styling.borderRadius,
                    dropShadow: props.node.styling.dropShadow
                }}
                onMouseDown={(event) => {
                    if (event.button === 0) {
                        if (props.selected === props.node.id)
                            moveNode(event)
                    }

                }}
                onClick={(event, open) => {
                    props.setSelected(props.node)
                }}
            >

                {props.children({...props})}
            </Shape>
            <SelectedWrapper {...props}/>
        </g>
    )
}

NodeWrapper.propTypes = NodePropsTemplate