import PropTypes from 'prop-types'
import NodeTemplate from "../../../templates/NodeTemplate";
import ResizeNode from "../../../methods/misc/ResizeNode";
import styles from '../styles/Node.module.css'
import {useState} from "react";
import GetResizeParams from "../misc/GetResizeParams";

export default function ResizeIndicator(props) {
    const params = GetResizeParams(props)

    return (
        <circle
            r={'4'} fill={'blue'} cx={params.x} cy={params.y}
            cursor={params.cursor}
            stroke={'transparent'} strokeWidth={'10'}
            onMouseDown={event => {
                ResizeNode({
                    node: props.node,
                    event: event,
                    scale: props.scale,
                    nodeShape: props.node.shape,
                    setSelected: props.setSelected,
                    nodeColor: props.node.color,
                    handleSizeChange: props.handleSizeChange

                })
            }}
        />
    )
}
ResizeIndicator.propTypes = {
    placement: PropTypes.oneOf(['nw', 'w', 'e', 'n', 's', 'ne', 'se', 'sw']),
    viewBox: PropTypes.object
}