import React from "react";
import PropTypes from 'prop-types'
import NodeWrapper from "../../shared/templates/node/NodeWrapper";
import styles from "../../shared/styles/Node.module.css";
import Content from "./Content";
import useNode from "../../shared/hooks/useNode";
import useLink from "../../shared/hooks/useLink";

export default function FlowchartNodes(props) {

    // const linkHook = useLink(props.metadata, props.data, props.setData, props.toBeLinked, props.setToBeLinked, props.unselectNode)

    return props.data !== undefined ? (
        props.data.nodes.map((node, index) => node.id === undefined ? null : (
            <g key={`${node.id}-node-${index}`}>
                <NodeWrapper
                    index={index}
                    scale={1}
                    selectNode={props.selectNode}
                    unselectNode={props.unselectNode}
                    selectedNodes={props.selectedNodes}
                    controlComponents={[]}
                    noPlacementIndicator={true}
                    node={node}
                    setData={props.setData}
                    data={props.data}
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
                </NodeWrapper>
            </g>
        ))
    ) : null
}

FlowchartNodes.propTypes = {
    metadata: PropTypes.object,
    scale: PropTypes.number,
    setData: PropTypes.func,
    data: PropTypes.object,
    selectedNodes: PropTypes.array,
    unselectNode: PropTypes.func,
    selectNode: PropTypes.func,
    toBeLinked: PropTypes.object,
    setToBeLinked: PropTypes.func
}