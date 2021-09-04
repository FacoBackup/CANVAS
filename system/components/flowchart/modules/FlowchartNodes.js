import React from "react";
import PropTypes from 'prop-types'
import NodeWrapper from "../../shared/templates/wrappers/NodeWrapper";
import styles from "../../shared/styles/Node.module.css";
import Content from "./Content";
import ConnectionsWrapper from "./ConnectionsWrapper";

export default function FlowchartNodes(props) {
    const handleLink = (node, connection, index) => {
        if (props.toBeLinked !== null) {
            props.setSelectedNode(undefined)
            let newLink = {
                type: 'dashed-path',
                parent: {
                    id: props.toBeLinked.id,
                    connectionPoint: props.toBeLinked.connectionPoint,
                    nodeShape: props.toBeLinked.nodeShape,
                    index: props.toBeLinked.index
                },
                child: {
                    id: node.id,
                    connectionPoint: connection,
                    nodeShape: node.shape,
                    index: index
                }
            }
            let newLinks = [...props.data.links, ...[newLink]]

            props.setData({...props.data, links: newLinks})
            props.setToBeLinked(null)
        } else {
            props.setSelectedNode(undefined)
            props.setToBeLinked({
                id: node.id,
                connectionPoint: connection,
                index: index,
                connectionType: props.styling.connectionType
            })
        }
    }

    const handleLinkDelete = (link) => {
        let newLinks = [...props.data.links]
        const index = newLinks.indexOf(link)

        if (index > -1) {
            newLinks.splice(index, 1)
            props.setData({
                ...props.data,
                links: newLinks
            })
        }
    }

    const handleNodeChange = (index, node, data) => {
        let newNodes = [...props.data.nodes]
        newNodes[index] = data
        console.log('CAFE')
        props.setData({
            ...props.data,
            nodes: newNodes
        })
    }


    const savePlacement = (event, node, index) => {

        let newNodes = [...props.data.nodes]
        let newNode = {...node}
        newNode.placement = event

        newNodes[index] = newNode
        console.log('SAVING PLACEMENT')
        props.setData({
            ...props.data,
            nodes: newNodes
        })
    }

    const render = (node, index) => {
        const wrapperProps = {
            node: node,
            index: index,
            handleLinkDelete: handleLinkDelete,
            handleLink: (node, connection) => handleLink(node, connection, index),
            toBeLinked: props.toBeLinked,
            setNode: event => handleNodeChange(index, node, event),
            selected: props.selectedNode?.id,
            savePlacement: event => savePlacement(event, node, index),
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
                            // className={props.linkable ? styles.pulse : undefined}
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
    scale: PropTypes.number,
    setData: PropTypes.func,
    data: PropTypes.object,
    styling: PropTypes.object,
    setSelectedNode: PropTypes.func,
    selectedNode: PropTypes.any,
    toBeLinked: PropTypes.object,
    setToBeLinked: PropTypes.func
}