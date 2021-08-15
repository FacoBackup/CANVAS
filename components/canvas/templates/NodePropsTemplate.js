import PropTypes from "prop-types";
import NodeTemplate from "./NodeTemplate";

export default {
    node: NodeTemplate,
    selected: PropTypes.string,
    toBeLinked: PropTypes.object,
    scale: PropTypes.number,
    setSelected: PropTypes.func,
    savePlacement: PropTypes.func
}