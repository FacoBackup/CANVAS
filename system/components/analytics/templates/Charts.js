import React from "react";
import PropTypes from 'prop-types'
import NodeWrapper from "../../shared/templates/wrappers/NodeWrapper";
import HorizontalChart from "../../../chart/horizontal/HorizontalChart";
import LineChart from "../../../chart/line/LineChart";
import PieChart from "../../../chart/pie/PieChart";

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
    const getChart = (props, type) => {
        let res
        switch (type) {
            case 'bar-vertical': {
                res = <HorizontalChart {...props}/>
                break
            }
            case 'bar-horizontal': {
                res = <HorizontalChart {...props}/>
                break
            }
            case 'pie': {
                res = <PieChart {...props}/>
                break
            }
            case 'line': {
                res = <LineChart {...props}/>
                break
            }
            default:
                break
        }

        return res
    }
    const render = (node, index) => {
        const wrapperProps = {
            node: node,
            index: index,
            setNode: event => handleNodeChange(index, node, event),
            selected: props.selectedNode?.id,
            savePlacement: event => savePlacement(event, node, index),
            setSelected: props.setSelectedNode,
            handleDelete: handleDelete,
            scale: 1,
        }

        const chartProps = {
            value: {
                label: 'Cafe',
                field: node.dataset?.value
            },
            axis: {
                label: 'Eixo',
                field: node.dataset?.axis
            },
            width: node.dimensions.width,
            height: node.dimensions.height,
            title: 'Teste para Teste',
            data: props.dataset
        }
        return (
            <g key={`${node.id}-node-${index}`}>
                <NodeWrapper
                    {...wrapperProps} controlComponents={[]}
                    noPlacementIndicator={true}
                >
                    {() => (
                        <foreignObject
                            x={0} y={0}
                            overflow={'visible'} id={`${node.id}-node-foreign-object`}
                            width={node.dimensions.width} height={node.dimensions.height}
                        >
                            {getChart(chartProps, node.variant)}
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
    setData: PropTypes.func,
    data: PropTypes.object,
    setSelectedNode: PropTypes.func,
    selectedNode: PropTypes.any,
    dataset: PropTypes.array
}