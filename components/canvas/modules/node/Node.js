import React, {useEffect, useState} from "react";
import NodePropsTemplate from "../../templates/NodePropsTemplate";
import Wrapper from "./modules/Wrapper";
import MoveNode from "../../methods/move/MoveNode";

export default function Node(props) {

    const [onMove, setOnMove] = useState(false)
    const moveNode = (event) => {
        MoveNode({
            scale: props.scale,
            node: props.node,
            event: event,
            setSelectedNode: props.setSelected,
            setOnMove: setOnMove,
            savePlacement: props.savePlacement
        })
    }

    return (
        <Wrapper
            {...props}
            move={moveNode}
            onMove={onMove}
        />
    )
}

Node.propTypes = NodePropsTemplate