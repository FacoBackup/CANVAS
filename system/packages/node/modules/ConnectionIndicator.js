import PropTypes from 'prop-types'
import React, {useState} from "react";

import GetNodeResizeParams from "../../../components/shared/utils/getNodeResizeParams";

export default function ConnectionIndicator(props) {
    const params = GetNodeResizeParams(props)
    const [hovered, setHovered] = useState(false)

    return (
        <circle
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseDown={() => props.handleLink(props.node, props.placement)}
            onMouseUp={() => props.handleLink(props.node, props.placement)}
            style={{transition: '150ms linear'}}
            id={props.node.id + '-' + props.placement + '-*node-selector'}
            r={hovered ? '8' : '4'} fill={'blue'} cx={params.x} cy={params.y}
            stroke={'transparent'} strokeWidth={'10'}
        />
    )
}
ConnectionIndicator.propTypes = {
    node: PropTypes.object,
    viewBox: PropTypes.object,
    placement: PropTypes.oneOf(['s', 'e', 'w', 'n']),
    handleLink: PropTypes.func
}