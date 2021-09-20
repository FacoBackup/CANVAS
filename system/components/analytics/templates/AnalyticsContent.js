import React, {useEffect} from "react";
import PropTypes from 'prop-types'
import Node from "../../../packages/node/Node";
import ChartNode from "./ChartNode";

export default function AnalyticsContent(props) {
    useEffect(() => {
        console.log('CDDDDDDDDDDDDDDDD')
    }, [props.openPage])
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

AnalyticsContent.propTypes = {
    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    selectedNodes: PropTypes.array,
    dataset: PropTypes.array,

}