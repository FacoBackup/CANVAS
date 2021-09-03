import React from "react";
import PropTypes from 'prop-types'
import NodeWrapper from "../../wrappers/NodeWrapper";
import HorizontalChart from "../../../../chart/horizontal/HorizontalChart";

export default function Charts(props) {

    const handleDelete = (index, id) => {
        let newNodes = [...props.data.nodes]
        newNodes.splice(index, 1)

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

    const render = (node, index) => {
        const wrapperProps = {
            node: node,
            index: index,
            toBeLinked: props.toBeLinked,
            setNode: event => handleNodeChange(index, node, event),
            selected: props.selectedNode?.id,
            savePlacement: event => savePlacement(event, node, index),
            setSelected: props.setSelectedNode,
            handleDelete: handleDelete,
            scale: 1,
        }
        return (
            <g key={`${node.id}-node-${index}`}>
                <NodeWrapper
                    {...wrapperProps} controlComponents={[]}
                    noPlacementIndicator={true}
                >
                    {nodeProps => (
                        <foreignObject
                            x={0} y={0}
                            overflow={'visible'} id={`${node.id}-node-foreign-object`}
                            width={nodeProps.node.dimensions.width} height={nodeProps.node.dimensions.height}
                        >
                            <HorizontalChart
                                value={{
                                    label: 'Cafe',
                                    field: nodeProps.node.dataset?.value
                                }}
                                axis={{
                                    label: 'Eixo',
                                    field: nodeProps.node.dataset?.axis
                                }}
                                styles={{width: '100%', height: '100%'}}
                                title={'Teste para Teste'}

                                data={props.dataset}
                                legendLabel={'Legendas'}
                                legendsField={'z'}
                            />
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

Charts.propTypes = {
    scale: PropTypes.number,
    setData: PropTypes.func,
    data: PropTypes.object,
    styling: PropTypes.object,
    setSelectedNode: PropTypes.func,
    selectedNode: PropTypes.any,
    toBeLinked: PropTypes.object,
    setToBeLinked: PropTypes.func,
    dataset: PropTypes.array
}