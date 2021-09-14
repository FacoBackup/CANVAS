import React from "react";
import PropTypes from 'prop-types'
import NodeWrapper from "../../shared/templates/node/NodeWrapper";

import useNode from "../../shared/hooks/useNode";
import ChartNode from "./ChartNode";

export default function Charts(props) {
    return (
        props.data.nodes.map((node, index) => node.id === undefined ? null : (
            <g key={node.id + '-charts-node-' + index}>
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
                    {() => (
                        <ChartNode dataset={props.dataset} node={node}/>
                    )}
                </NodeWrapper>
            </g>
        ))

    )

}

Charts.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    selectedNodes: PropTypes.array,
    dataset: PropTypes.array,

}