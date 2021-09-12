import React, {useMemo, useRef} from "react";
import NodePropsTemplate from "../../../flowchart/templates/NodePropsTemplate";
import SelectedWrapper from "./SelectedWrapper";
import Shape from "../shapes/Shape";
import styles from '../../styles/Node.module.css'
import PlaceNode from "../../utils/PlaceNode";
import ConnectionsWrapper from "../../../flowchart/modules/ConnectionsWrapper";


export default function NodeWrapper(props) {
    const ref = useRef()
    const selected = useMemo(() => {
        return props.selectedNodes.find(e => e.node.id === props.node.id)
    }, [props.selectedNodes])
    const moveNode = (event) => {
        PlaceNode({
            scale: props.scale,
            node: props.node,
            event: event,
            selectNode: props.selectNode,
            unselectNode: props.unselectNode,
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
            {props.showConnections ? <ConnectionsWrapper {...props} selected={selected}/> : undefined}
            <Shape
                id={props.node.id}
                shapeVariant={props.node.shapeVariant}
                shape={props.node.styling.shape}
                dimensions={{...props.node.dimensions}}
                cursor={selected !== undefined && selected.node.id === props.node.id ? 'grab' : undefined}
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
                        if (selected !== undefined && selected.node.id === props.node.id)
                            moveNode(event)
                    }

                }}
                onClick={(event) => {
                    if(event.ctrlKey)
                        props.selectNode(props.node)
                    else{
                        props.unselectNode(undefined, true)
                        props.selectNode(props.node, false, true)
                    }
                }}
            >

                {props.children({...props})}
            </Shape>
            <SelectedWrapper {...props} selected={selected}/>
        </g>
    )
}

NodeWrapper.propTypes = NodePropsTemplate