import PropTypes from "prop-types";

export default {

    data: PropTypes.object,
    setData: PropTypes.func,

    node: PropTypes.object,
    index: PropTypes.number,

    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    selectedNodes: PropTypes.array,

    toBeLinked: PropTypes.object,
    scale: PropTypes.number,

    children: PropTypes.node,
    noPlacementIndicator: PropTypes.bool,
    showConnections: PropTypes.bool
}