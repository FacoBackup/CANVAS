import React from "react";
import PropTypes from 'prop-types'
import Node from "../../shared/templates/node/Node";

import useNode from "../../shared/hooks/useNode";
import ChartNode from "./ChartNode";

export default function Charts(props) {
    return (
        props.openPage.nodes.map((node, index) => node.id === undefined ? null : (
            <g key={node.id + '-charts-node-' + index}>
                <Node
                    index={index}
                    scale={1}
                    selectNode={props.selectNode}
                    unselectNode={props.unselectNode}
                    selectedNodes={props.selectedNodes}
                    controlComponents={[]}
                    noPlacementIndicator={true}
                    node={node}
                    openPage={props.openPage}
                    dispatchPage={props.dispatchPage}
                    actions={props.actions}
                >
                    {() => (
                        <ChartNode dataset={props.dataset} node={node}/>
                    )}
                </Node>
            </g>
        ))

    )

}

Charts.propTypes = {
    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    selectedNodes: PropTypes.array,
    dataset: PropTypes.array,

}