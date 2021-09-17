import React, {useEffect, useMemo, useRef} from "react";
import NodePropsTemplate from "../../../flowchart/templates/NodePropsTemplate";
import SelectedWrapper from "./SelectedWrapper";
import Shape from "../shapes/Shape";
import styles from '../../styles/Node.module.css'
import ConnectionsWrapper from "../../../flowchart/modules/ConnectionsWrapper";
import useNode from "../../hooks/useNode";
import Draggable from "../../../../packages/draggable/Draggable";


export default function NodeWrapper(props) {
    const ref = useRef()

    const selected = useMemo(() => {
        return props.selectedNodes.find(e => e.node.id === props.node.id)
    }, [props.selectedNodes])

    const {ACTIONS, nodeState, dispatch} = useNode({
        data: props.data,
        setData: props.setData,
        node: props.node,
        scale: props.scale,
        selectNode: props.selectNode,
        unselectNode: props.unselectNode,
        noPlacementIndicator: props.noPlacementIndicator
    })
    return (
        <Draggable
            scale={props.scale} canDrag={selected !== undefined && selected.node.id === props.node.id}
            onDrop={e => {
                dispatch({type: ACTIONS.PLACEMENT, payload: e.currentPlacement})
                ref.current.style.opacity = '1'
            }}
            onDragStart={() => {
                ref.current.style.opacity = '.5'
            }}
            onMove={e => ref.current.setAttribute('transform', `translate(${e.placement.x}, ${e.placement.y})`)}
            rootID={'frame'}>
            <g
                id={nodeState.id + '-node'}
                transform={`translate(${nodeState.placement.x}, ${nodeState.placement.y})`}
                ref={ref}
                overflow={'hidden'}
                fill={'none'}
                className={styles.entityContainer}
            >
                {props.showConnections ?
                    <ConnectionsWrapper node={nodeState} handleLink={props.handleLink}
                                        selected={selected}/> : undefined}
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

                    onClick={(event) => {
                        if (event.ctrlKey) {
                            console.log('CONTROL CLICKED')
                            props.selectNode(props.node)
                        }
                        else {
                            console.log('CLEANING')
                            props.unselectNode(undefined, true)
                            props.selectNode(props.node, false, true)
                        }
                    }}
                >

                    {props.children({actions: ACTIONS, dispatch: dispatch, node: nodeState})}
                </Shape>
                <SelectedWrapper selectNode={props.selectNode} node={nodeState} selected={selected} scale={props.scale}
                                 actions={ACTIONS} dispatch={dispatch}/>
            </g>
        </Draggable>
    )
}

NodeWrapper.propTypes = NodePropsTemplate