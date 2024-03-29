import PropTypes from "prop-types";

export default {
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onMove: PropTypes.func,

    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    node: PropTypes.object,
    index: PropTypes.number,

    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    selectedNodes: PropTypes.array,

    toBeLinked: PropTypes.object,
    scale: PropTypes.number,

    children: PropTypes.func,
    noPlacementIndicator: PropTypes.bool,
    showConnections: PropTypes.bool
}