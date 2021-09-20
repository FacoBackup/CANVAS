import PropTypes from 'prop-types'
import React, {useEffect} from "react";
import getPlacement from "./utils/getPlacement";
import handleExit from "./utils/handleExit";
import getOffset from "./utils/getOffset";
import getInitialState from "./utils/getInitialState";
import usePlacement from "./usePlacement";

export default function Draggable(props) {
    let {
        toBeDragged,
        root,
        canDrag,
        onDrag,
        lastPlacement,
        currentPlacement,
        offset
    } = getInitialState()

    const handleDragStart = (e) => {
        if (canDrag && !onDrag) {
            onDrag = true
            if (props.onDragStart !== undefined)
                props.onDragStart(e, toBeDragged)
            const {initialOffset, targetPlacement} = getOffset({
                root: root,
                toBeDragged: toBeDragged,
                event: e
            })

            offset = initialOffset
            lastPlacement = targetPlacement

            toBeDragged.style.cursor = 'grabbing'
        }
    }

    const handleDrag = (event) => {
        handleDragStart(event)
        const placement = getPlacement({
            grid: props.grid,
            lastPlacement: lastPlacement,
            currentPlacement: currentPlacement,
            event: event,
            root: root,
            toBeDragged: toBeDragged,
            offset: offset,
            scale: props.scale
        })
        props.onMove({
            event: event,
            placement: placement
        })

    }

    const handleMouseUp = (event) => {
        handleExit({
            onDrag: onDrag,
            canDrag: canDrag,
            toBeDragged: toBeDragged,
            event: event,
            root: root,
            onDrop: props.onDrop
        })
        onDrag = false
        canDrag = false
        document.removeEventListener('mousemove', handleDrag)
    }

    const handleMouseDown = (event) => {
        if (event.button === 0 && props.canDrag && (event.target === event.currentTarget || props.allowAnyClick)) {
            canDrag = true
            document.addEventListener('mousemove', handleDrag)
        }
    }

    useEffect(() => {
        root = props.root === 'body' ? document.body : document.getElementById(props.root)
        toBeDragged = props.toBeDragged ? document.getElementById(props.toBeDragged) : props.reference.current
        if (props.reference !== null && props.reference !== undefined && props.reference.current !== undefined && props.reference.current !== null) {
            props.reference.current.addEventListener("mousedown", handleMouseDown);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            canDrag = false
            onDrag = false
            document.removeEventListener('mouseup', handleMouseUp)
            if (props.reference !== null && props.reference !== undefined && props.reference.current !== undefined && props.reference.current !== null)
                props.reference.current.removeEventListener('mousedown', handleMouseDown)
        }
    }, [props.canDrag, props.updateReference, props.toBeDragged])

    return (
        React.cloneElement(props.children, {ref: props.reference})
    )
}

Draggable.propTypes = {
    updateReference: PropTypes.any,
    grid: PropTypes.object,

    reference: PropTypes.object,
    toBeDragged: PropTypes.string,

    children: PropTypes.node,
    canDrag: PropTypes.bool,
    scale: PropTypes.number,

    root: PropTypes.any,

    allowAnyClick: PropTypes.bool,

    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onMove: PropTypes.func
}