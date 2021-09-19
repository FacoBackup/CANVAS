import PropTypes from "prop-types";
import getInitialState from "./utils/getInitialState";

export default function useDrag(props) {
    let {
        toBeDragged,
        root,
        canDrag,
        onDrag,
        lastPlacement,
        currentPlacement,
        offset
    } = getInitialState()



}

useDrag.propTypes = {
    targetID: PropTypes.string,
    dragPivotID: PropTypes.string,
    rootID: PropTypes.string,

    grid: PropTypes.object,
    canDrag: PropTypes.bool,
    scale: PropTypes.number,

    allowAnyClick: PropTypes.bool,

    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onMove: PropTypes.func
}