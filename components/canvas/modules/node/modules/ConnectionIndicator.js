import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import NodeTemplate from "../../../templates/NodeTemplate";
import styles from '../styles/Node.module.css'
import GetResizeParams from "../misc/GetResizeParams";

export default function ConnectionIndicator(props) {
    const params = GetResizeParams(props)

    return (
        <circle
            // onMouseDown={() => props.handleLink(props.node, props.connectionPoint)}
            // onMouseUp={() => props.handleLink(props.node, props.connectionPoint)}
            id={props.node.id + '-' + props.placement + '-*node-selector'}
            r={'4'} fill={'blue'} cx={params.x} cy={params.y}
            cursor={params.cursor}
            stroke={'transparent'} strokeWidth={'10'}
        />
    )
}
ConnectionIndicator.propTypes = {
    node: NodeTemplate,
    viewBox: PropTypes.object,
    placement: PropTypes.oneOf(['s', 'e', 'w', 'n']),
}