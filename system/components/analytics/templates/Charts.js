import React from "react";
import PropTypes from 'prop-types'
import NodeWrapper from "../../shared/templates/wrappers/NodeWrapper";
import HorizontalChart from "../../../chart/horizontal/HorizontalChart";
import LineChart from "../../../chart/line/LineChart";
import PieChart from "../../../chart/pie/PieChart";
import useNode from "../../shared/hooks/useNode";

export default function Charts(props) {
    const nodeHook = useNode(props.data, props.setData)

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
            setNode: event => nodeHook.handleNodeChange(index, node, event),
            selected: props.selectedNode?.id,
            savePlacement: event => nodeHook.savePlacement(event, node, index),
            setSelected: props.setSelectedNode,
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
            <NodeWrapper
                {...wrapperProps} controlComponents={[]}
                noPlacementIndicator={true}
            >
                {() => (
                    <foreignObject
                        x={0} y={0}
                        overflow={'hidden'} id={`${node.id}-node-foreign-object`}
                        width={node.dimensions.width} height={node.dimensions.height}
                    >
                        {getChart(chartProps, node.variant)}
                    </foreignObject>
                )}
            </NodeWrapper>

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
    dataset: PropTypes.array,

}