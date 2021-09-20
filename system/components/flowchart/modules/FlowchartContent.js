import React from "react";
import PropTypes from 'prop-types'
import Node from "../../../packages/node/Node";
import styles from "../../../packages/node/styles/Node.module.css";
import Content from "./Content";
import useLinks from "../../shared/hooks/useLinks";
import Link from "../../../packages/link/Link";
import LinkIndicator from "../../../packages/link/LinkIndicator";
import usePlacement from "../../../packages/draggable/usePlacement";

export default function FlowchartContent(props) {
    const {ACTIONS, dispatch} = useLinks({
        dispatchPages: props.dispatchPages,
        actions: props.actions,
        openPage: props.openPage,
        pages: props.pages
    })
    const {actions, dispatchPlacement, placements} = usePlacement()

    return (
        <g>
            <LinkIndicator source={props.toBeLinked}/>
            {props.openPage.links.map((link, index) => (
                <g key={link.id + '-link'}>
                    <Link
                        link={link}
                        pages={props.pages}
                        placements={placements}
                        openPage={props.openPage}
                        deleteLink={() => dispatch({action: ACTIONS.REMOVE_LINK, payload: {linkID: link.id}})}
                    />
                </g>
            ))}
            {props.openPage.nodes.map((node, index) => node.id === undefined ? null : (
                <g key={`${node.id}-node-${index}`}>
                    <Node
                        index={index}
                        scale={1} showConnections={true}
                        selectNode={props.selectNode}
                        unselectNode={props.unselectNode}
                        selectedNodes={props.selectedNodes}
                        noPlacementIndicator={true}
                        node={node}
                        actions={props.actions}
                        dispatchPage={props.dispatchPage}
                        openPage={props.openPage}
                        onDragStart={() => dispatchPlacement({
                            action: actions.ADD_LISTENER,
                            payload: {nodeID: node.id, x: node.placement.x, y: node.placement.y}
                        })}
                        onDrop={() => dispatchPlacement({action: actions.REMOVE_LISTENER, payload: {nodeID: node.id}})}
                        onMove={placement => dispatchPlacement({
                            action: actions.UPDATE_LISTENER,
                            payload: {nodeID: node.id, x: placement.x, y: placement.y}
                        })}
                    >
                        {nodeProps => (
                            <foreignObject
                                x={0} y={0}
                                overflow={'visible'}
                                width={nodeProps.node.dimensions.width} height={nodeProps.node.dimensions.height}
                            >
                                <div className={styles.nodeShapeContainer} id={nodeProps.node.id + '-*wrapper'}>
                                    <Content
                                        node={nodeProps.node}
                                        dispatch={nodeProps.dispatch}
                                        actions={nodeProps.actions}
                                    />
                                </div>
                                <div className={styles.nodePosition} id={nodeProps.node.id + '-placement'} style={{
                                    opacity: nodeProps.onMove ? '1' : '0',
                                    visibility: nodeProps.onMove ? 'visible' : 'hidden',
                                }}/>
                            </foreignObject>
                        )}
                    </Node>
                </g>
            ))
            }
        </g>
    )


}

FlowchartContent.propTypes = {
    metadata: PropTypes.object,
    scale: PropTypes.number,

    actions: PropTypes.object,
    dispatchPage: PropTypes.func,
    openPage: PropTypes.object,
    pages: PropTypes.array,

    selectedNodes: PropTypes.array,
    unselectNode: PropTypes.func,
    selectNode: PropTypes.func,
    toBeLinked: PropTypes.object,
    setToBeLinked: PropTypes.func
}