import React, {useRef} from "react";
import styles from '../styles/Node.module.css'
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import PropTypes from "prop-types";
import ResizeIndicator from "./ResizeIndicator";
import ConnectionIndicator from "./ConnectionIndicator";
import EllipseShape from "../shapes/simple/EllipseShape";
import PolygonShape from "../shapes/simple/PolygonShape";
import RectShape from "../shapes/simple/RectShape";
import SelectedWrapper from "./SelectedWrapper";
import ConnectionsWrapper from "./ConnectionsWrapper";


export default function Wrapper(props) {
    const ref = useRef()
    const getShape = () => {
        let res
        switch (props.node.shapeVariant) {
            case 'ellipse': {
                res =  <EllipseShape {...props} />
                break
            }
            case 'rect': {
                res = <RectShape {...props}/>
                break
            }
            case 'polygon': {
                res = <PolygonShape {...props}/>
                break
            }
            case 'complex': {
                break
            }
            default:
                break
        }
        return res
    }
    return (
        <g
            id={props.node.id + '-node'} overflow={'visible'}
            transform={`translate(${props.node.placement.x}, ${props.node.placement.y})`}
            style={{
                cursor: !props.linkable && props.toBeLinked !== null ? 'unset' : "pointer"
            }} ref={ref}

            className={styles.entityContainer}
        >
            <SelectedWrapper {...props}/>
            <ConnectionsWrapper {...props}/>
            {getShape()}
        </g>
    )
}

Wrapper.propTypes = {
    ...NodePropsTemplate,
    ...{
        linkable: PropTypes.bool,
        setLinkable: PropTypes.func,
        onMove: PropTypes.bool
    }
}