import PropTypes from 'prop-types'
import {useCallback, useEffect, useState} from "react";

export default function Draggable(props) {
    let dragPivot = null
    let target = null
    let root = null
    let canDrag = false
    let onDrag = false
    let lastPlacement = {
        x: undefined,
        y: undefined
    }
    let currentPlacement = {
        x: undefined,
        y: undefined
    }
    let offset = {
        x: undefined,
        y: undefined
    }
    const handleDrag = (event) => {
        handleDragStart(event)
        const targetRect = target.getBoundingClientRect()
        const bounding = {
            x: root.scrollLeft - root.getBoundingClientRect().left,
            y: root.scrollTop - root.getBoundingClientRect().top
        }
        const mousePlacement = {
            x: event.clientX + bounding.x,
            y: event.clientY + bounding.y
        }
        const toBeApplied = {
            x: lastPlacement.x - mousePlacement.x,
            y: lastPlacement.y - mousePlacement.y
        }
        lastPlacement = mousePlacement
        currentPlacement = {
            x: (targetRect.left + bounding.x) - toBeApplied.x / props.scale,
            y: (targetRect.top + bounding.y) - toBeApplied.y / props.scale
        }
        props.onMove({
            event: event,
            placement: {
                x: currentPlacement.x < 0 ? 0 : mousePlacement.x - offset.x,
                y: currentPlacement.y < 0 ? 0 : mousePlacement.y - offset.y
            }
        })
    }
    const handleMouseUp = (event) => {
        if (canDrag && onDrag) {

            const bounding = {
                x: root.scrollLeft - root.getBoundingClientRect().left,
                y: root.scrollTop - root.getBoundingClientRect().top
            }

            const targetPlacement = {
                x: target.getBoundingClientRect().x + bounding.x,
                y: target.getBoundingClientRect().y + bounding.y
            }

            props.onDrop({event: event, currentPlacement: targetPlacement})
            target.style.cursor = ''
        }

        onDrag = false
        canDrag = false

        document.removeEventListener('mousemove', handleDrag)
    }
    const handleMouseDown = (event) => {
        if (event.button === 0 && props.canDrag) {
            canDrag = true
            document.addEventListener('mousemove', handleDrag)
        }
    }

    const handleDragStart = (e) => {
        if (canDrag && onDrag === false) {
            onDrag = true
            if (props.onDragStart)
                props.onDragStart(e)
            const bounding = {
                x: root.scrollLeft - root.getBoundingClientRect().left,
                y: root.scrollTop - root.getBoundingClientRect().top
            }

            const mousePlacement = {
                x: e.clientX + bounding.x,
                y: e.clientY + bounding.y
            }

            const targetPlacement = {
                x: target.getBoundingClientRect().x + bounding.x,
                y: target.getBoundingClientRect().y + bounding.y
            }

            offset = {
                x: mousePlacement.x - targetPlacement.x,
                y: mousePlacement.y - targetPlacement.y
            }
            lastPlacement = {
                x: targetPlacement.x,
                y: targetPlacement.y
            }

            target.style.cursor = 'grabbing'
        }
    }


    useEffect(() => {
        target =  document.getElementById(props.targetID ? props.targetID : props.children.props.id)
        root = props.rootID === 'body' ? document.body : document.getElementById(props.rootID)
        dragPivot = document.getElementById(props.children.props.id)

        if(target !== null) {
            dragPivot.addEventListener("mousedown", handleMouseDown);
            document.addEventListener("mouseup", handleMouseUp);

        }

        return () => {
            canDrag = false
            onDrag = false
            document.removeEventListener('mouseup', handleMouseUp)
            if (dragPivot !== null)
                dragPivot.removeEventListener('mousedown', handleMouseDown)
        }
    }, [props.canDrag, props.targetID])


    return (props.children)
}

Draggable.propTypes = {
    targetID: PropTypes.any,
    children: PropTypes.node,
    canDrag: PropTypes.bool,
    scale: PropTypes.number,
    rootID: PropTypes.any,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onMove: PropTypes.func
}