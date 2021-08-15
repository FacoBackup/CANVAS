import React, {useEffect, useState} from "react";
import NodePropsTemplate from "../../templates/NodePropsTemplate";
import Wrapper from "./modules/Wrapper";
import MoveNode from "../../methods/move/MoveNode";

export default function Node(props) {
    const [linkable, setLinkable] = useState(false)
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

    useEffect(() => {
        if (props.toBeLinked !== null && props.toBeLinked.id !== props.node.id) {
            let el = true
            if (props.node.links.length < 4) {
                props.node.links.map(link => {
                    if (
                        (link.child.id === props.node.id && props.toBeLinked.id === link.parent.id) ||
                        (link.parent.id === props.node.id && props.toBeLinked.id === link.child.id)
                    )
                        el = false
                })
            } else
                el = false
            setLinkable(el)
        } else
            setLinkable(false)
    }, [props.toBeLinked])

    return (
        <Wrapper
            {...props}
            linkable={linkable}
            setLinkable={setLinkable}
            move={moveNode}
            onMove={onMove}
        />
    )
}

Node.propTypes = NodePropsTemplate