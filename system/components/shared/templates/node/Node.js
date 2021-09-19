import React, {useMemo, useRef, useState} from "react";
import NodePropsTemplate from "../../../flowchart/templates/NodePropsTemplate";
import NodeWrapper from "./NodeWrapper";
import Shape from "../shapes/Shape";
import styles from '../../styles/Node.module.css'
import ConnectionsWrapper from "../../../flowchart/modules/ConnectionsWrapper";
import useNode from "../../hooks/useNode";
import Draggable from "../../../../packages/draggable/Draggable";
import useDrag from "../../../../packages/draggable/useDrag";


export default function Node(props) {
    const ref = useRef()
    const draggableRef = useRef()
    const selected = useMemo(() => {
        return props.selectedNodes.find(e => e.node.id === props.node.id)
    }, [props.selectedNodes])
    const [onDrag, setOnDrag] = useState(false)
    const {ACTIONS, dispatch} = useNode({
        openPage: props.openPage,
        dispatchPage: props.dispatchPage,
        actions: props.actions,
        node: props.node
    })
    useDrag()

    return (

        <NodeWrapper selectNode={props.selectNode} node={props.node} selected={selected} scale={props.scale}
                     actions={ACTIONS}
                     dispatch={e => {
            dispatch(e)
        }}
        >
            <g
                id={props.node.id + '-node'}
                transform={`translate(${props.node.placement.x}, ${props.node.placement.y})`}
                overflow={'hidden'}
                fill={'none'} ref={ref}
                className={styles.entityContainer}
            >
                {props.showConnections ?
                    <ConnectionsWrapper node={props.node} handleLink={props.handleLink}
                                        selected={selected}/> : undefined}

                <Draggable
                    scale={props.scale} canDrag={(selected !== undefined && selected.node.id === props.node.id) || onDrag}
                    updateReference={props.node}
                    onDrop={e => {
                        setOnDrag(false)
                        let p = {
                            x: e.currentPlacement.x > 0 ? e.currentPlacement.x : 0,
                            y: e.currentPlacement.y > 0 ? e.currentPlacement.y : 0
                        }
                        ref.current.setAttribute('transform', `translate(${p.x}, ${p.y})`)
                        ref.current.style.opacity = '1'

                        dispatch({type: ACTIONS.PLACEMENT, payload: p})

                    }}
                    onDragStart={() => {
                        setOnDrag(true)
                        props.unselectNode(undefined, true)
                        ref.current.style.opacity = '.5'
                    }} allowAnyClick={true}
                    onMove={e => ref.current.setAttribute('transform', `translate(${e.placement.x}, ${e.placement.y})`)}
                    root={'frame'} grid={{x: 25, y: 25}}
                    reference={draggableRef}
                >
                    <g ref={draggableRef}>
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
                                if (event.ctrlKey)
                                    props.selectNode(props.node)
                                else {
                                    props.unselectNode(undefined, true)
                                    props.selectNode(props.node, false, true)
                                }
                            }}
                        >

                            {props.children({actions: ACTIONS, dispatch: dispatch, node: props.node})}
                        </Shape>
                    </g>
                </Draggable>

            </g>
        </NodeWrapper>
    )
}

Node.propTypes = NodePropsTemplate