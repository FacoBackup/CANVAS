import React from "react";
import PropTypes from 'prop-types'
import NodeWrapper from "../../shared/templates/node/NodeWrapper";
import styles from "../../shared/styles/Node.module.css";
import Content from "./Content";
import ConnectionsWrapper from "./ConnectionsWrapper";
import useNode from "../../shared/hooks/useNode";
import useLink from "../../shared/hooks/useLink";

export default function FlowchartNodes(props) {
    const nodeHook = useNode(props.data, props.setData)
    const linkHook = useLink(props.metadata, props.data, props.setData, props.toBeLinked, props.setToBeLinked, props.setSelectedNode)

    const render = (node, index) => {
        const wrapperProps = {
            node: node,
            index: index,
            handleLinkDelete: linkHook.handleLinkDelete,
            handleLink: (node, connection) => linkHook.handleLink(node, connection, index),
            toBeLinked: props.toBeLinked,
            setNode: event => nodeHook.handleNodeChange(index, node, event),
            selected: props.selectedNode?.id,
            savePlacement: event => nodeHook.savePlacement(event, node, index),
            setSelected: props.setSelectedNode,
            scale: props.scale,
        }
        return (
            <g key={`${node.id}-node-${index}`}>
                <NodeWrapper
                    {...wrapperProps}
                    controlComponents={[<ConnectionsWrapper {...wrapperProps}/>]}
                >
                    {nodeProps => (
                        <foreignObject
                            x={0} y={0}
                            overflow={'visible'}
                            width={nodeProps.node.dimensions.width} height={nodeProps.node.dimensions.height}
                        >
                            <div className={styles.nodeShapeContainer} id={nodeProps.node.id + '-*wrapper'}
                                 onClick={() => {
                                     nodeProps.setSelected(nodeProps.node)
                                 }}
                            >
                                <Content
                                    node={nodeProps.node} setNode={nodeProps.setNode}
                                    currentTextStyles={nodeProps.currentTextStyles}
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
        )
    }
    return props.data !== undefined ? (
        props.data.nodes.map((node, index) => node.id === undefined ? null : render(node, index))
    ) : null
}

FlowchartNodes.propTypes = {
    metadata: PropTypes.object,
    scale: PropTypes.number,
    setData: PropTypes.func,
    data: PropTypes.object,
    setSelectedNode: PropTypes.func,
    selectedNode: PropTypes.any,
    toBeLinked: PropTypes.object,
    setToBeLinked: PropTypes.func
}