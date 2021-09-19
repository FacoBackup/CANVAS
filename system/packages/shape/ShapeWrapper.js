import PropTypes from "prop-types";
import styles from './styles/ShapeWrapper.module.css'
import Draggable from "../draggable/Draggable";
import ToolTip from "../chart/tooltip/ToolTip";
import {useRef} from "react";


export default function ShapeWrapper(props) {
    const ref = useRef()


    return (
        <Draggable
            root={'body'}
            updateReference={props.data}
            allowAnyClick={true}
            reference={ref}
            toBeDragged={props.targetID}
            grid={{x: 25, y: 25}}
            onMove={props.onMove}
            canDrag={props.canDrag}
            onDragStart={(e, target) => props.handleDrag(e, props.content, props.value, target)}
            onDrop={data => props.handleDrop(data.event, props.value)} scale={props.scale}>
            <div
                className={styles.shapeContainer}
                id={JSON.stringify(props.value) + '-draggable'}
                onClick={props.onClick}
            >
                {props.content}
                <ToolTip content={props.label}/>
            </div>
        </Draggable>
    )
}

ShapeWrapper.propTypes = {
    data: PropTypes.object,
    onMove: PropTypes.func,
    handleDrop: PropTypes.func,
    handleDrag: PropTypes.func,

    canDrag: PropTypes.bool,
    targetID: PropTypes.string,
    content: PropTypes.any,
    label: PropTypes.string,

    value: PropTypes.string,
    scale: PropTypes.number,
    onClick: PropTypes.func
}