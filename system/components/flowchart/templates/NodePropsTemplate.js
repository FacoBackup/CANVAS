import PropTypes from "prop-types";

export default {
    node: PropTypes.object,

    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    selectedNodes: PropTypes.array,

    toBeLinked: PropTypes.object,
    scale: PropTypes.number,

    savePlacement: PropTypes.func,
    setNode: PropTypes.func,
    children: PropTypes.node,
    noPlacementIndicator: PropTypes.bool,
    showConnections: PropTypes.bool
}