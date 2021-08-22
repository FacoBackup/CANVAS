import Node from "../../modules/node/Node";
import React from "react";
import CanvasTemplate from "../../templates/CanvasPropsTemplate";
import PropTypes from 'prop-types'

export default function RenderNodes(props) {
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
    const handleDelete = (index, id) => {
        let newNodes = [...props.data.nodes]
        newNodes.splice(index, 1)

        props.data.links.map(link => {
            if (link.parent.id === id || link.child.id === id)
                handleLinkDelete(link)
        })

        props.setData({
            ...props.data,
            nodes: newNodes
        })
    }

    const handleNodeChange = (index, node, data) => {
        let newNodes = [...props.data.nodes]
        newNodes[index] = data

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

        props.setData({
            ...props.data,
            nodes: newNodes
        })
    }
    return props.data !== undefined ? (
        props.data.nodes.map((node, index) => node.id === undefined ? null : (
            <g key={`${node.id}-node-${index}`}>
                <Node
                    node={node} index={index}
                    handleLinkDelete={handleLinkDelete}
                    handleLink={(node, connection) => handleLink(node, connection, index)}
                    toBeLinked={props.toBeLinked} currentTextStyles={props.currentTextStyles}
                    setNode={event => handleNodeChange(index, node, event)}
                    selected={props.selectedNode?.id}
                    savePlacement={event => savePlacement(event, node, index)}
                    setSelected={props.setSelectedNode}
                    handleDelete={handleDelete} scale={props.scale}
                />
            </g>
        ))
    ) : null
}

RenderNodes.propTypes = {
    ...CanvasTemplate,
    ...{
        root: PropTypes.object,
        scale: PropTypes.number,
        setData: PropTypes.func,
        data: PropTypes.object,
        styling: PropTypes.object,
        setSelectedNode: PropTypes.func,
        selectedNode: PropTypes.any,
        toBeLinked: PropTypes.object,
        setToBeLinked: PropTypes.func
    }
}