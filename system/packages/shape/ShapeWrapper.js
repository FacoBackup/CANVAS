import PropTypes from "prop-types";
import styles from './styles/ShapeWrapper.module.css'
import Draggable from "../draggable/Draggable";
import {BarChartRounded} from "@material-ui/icons";
import ToolTip from "../chart/tooltip/ToolTip";


export default function ShapeWrapper(props){
    return(
        <Draggable
            rootID={'body'} updateReference={props.data}
            targetID={props.targetID}
            onMove={props.onMove}
            canDrag={props.canDrag}
            onDragStart={(e) => props.handleDrag(e,props.content, props.value)}
            onDrop={data => props.handleDrop(data.event, props.value)} scale={props.scale}>
            <div
                className={styles.shapeContainer}
                id={JSON.stringify(props.value)+ '-draggable'}
                onClick={props.onClick}
            >
                {props.content}
                <ToolTip content={props.label}/>
            </div>
        </Draggable>
    )
}

ShapeWrapper.propTypes={
    data: PropTypes.object,
    onMove: PropTypes.func,
    handleDrop: PropTypes.func,
    handleDrag: PropTypes.func ,

    canDrag: PropTypes.bool,
    targetID: PropTypes.string,
    content: PropTypes.any,
    label: PropTypes.string,

    value: PropTypes.string,
    scale: PropTypes.number,
    onClick: PropTypes.func
}