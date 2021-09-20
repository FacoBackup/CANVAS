import PropTypes from 'prop-types'
import React, {useMemo, useState} from "react";

import getNodeResizeParams from "../../../components/shared/utils/getNodeResizeParams";
import styles from "../styles/Node.module.css";

export default function ConnectionIndicator(props) {
    const placement = useMemo(() => {
        return getNodeResizeParams({...props, offset: 10})
    }, [props.viewBox])
    const [hovered, setHovered] = useState(false)

    return (
        <circle
            onMouseDown={() => props.handleLink(props.node, props.placement)}
            onMouseUp={() => props.handleLink(props.node, props.placement)}
            style={{transition: '150ms linear'}} r={'4'}
            id={props.node.id + '-' + props.placement + '-*node-selector'}
            className={styles.indicator}
            fill={'blue'} cx={placement.x} cy={placement.y}
        />
    )
}
ConnectionIndicator.propTypes = {
    node: PropTypes.object,
    viewBox: PropTypes.object,
    placement: PropTypes.oneOf(['s', 'e', 'w', 'n']),
    handleLink: PropTypes.func
}