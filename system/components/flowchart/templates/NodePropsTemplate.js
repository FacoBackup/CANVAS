import PropTypes from "prop-types";

export default {
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