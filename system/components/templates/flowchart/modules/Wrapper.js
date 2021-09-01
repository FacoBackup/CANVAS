import React, {useRef} from "react";
import styles from '../../../styles/Node.module.css'
import NodePropsTemplate from "../../props/NodePropsTemplate";
import PropTypes from "prop-types";
import Shape from "../../shapes/Shape";
import SelectedWrapper from "./SelectedWrapper";
import ConnectionsWrapper from "./ConnectionsWrapper";
import Content from "./Content";


export default function Wrapper(props) {
    const ref = useRef()

    const getShape = () => {

        return (
            <Shape
                id={props.node.id} shapeVariant={props.node.shapeVariant} shape={props.node.styling.shape}
                dimensions={props.node.dimensions}
                styles={{
                    fill: props.node.styling.fill,
                    stroke: props.node.styling.color,
                    strokeDasharray: props.node.styling.strokeDasharray,
                    strokeWidth: props.node.styling.strokeWidth
                }} onMouseDown={(event, open) => {
                if (event.button === 0) {
                    if (!open)
                        props.move(event)
                    props.setSelected(props.node)
                }
            }}>
                <foreignObject
                    x={0} y={0}
                    overflow={'visible'}
                    width={props.node.dimensions.width} height={props.node.dimensions.height}
                    // className={props.linkable ? styles.pulse : undefined}
                >
                    <div className={styles.nodeShapeContainer} id={props.node.id + '-*wrapper'}
                         onClick={() => {
                             props.setSelected(props.node)
                         }}
                    >
                        <Content  node={props.node} setNode={props.setNode}
                                 currentTextStyles={props.currentTextStyles}/>
                    </div>
                    <div className={styles.nodePosition} id={props.node.id + '-placement'} style={{
                        opacity: props.onMove ? '1' : '0',
                        visibility: props.onMove ? 'visible' : 'hidden',
                    }}/>
                </foreignObject>
            </Shape>
        )
    }
    return (
        <g
            id={props.node.id + '-node'} overflow={'visible'}
            transform={`translate(${props.node.placement.x}, ${props.node.placement.y})`}
            ref={ref}

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
        onMove: PropTypes.bool
    }
}