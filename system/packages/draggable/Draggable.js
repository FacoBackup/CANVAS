import PropTypes from 'prop-types'
import React, {useCallback, useEffect, useRef, useState} from "react";

export default function Draggable(props) {
    let toBeDragged = null
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
        const targetRect = toBeDragged.getBoundingClientRect()
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

        let x = mousePlacement.x - offset.x
        let y = mousePlacement.y - offset.y
        if(props.grid !== undefined){
            if(props.grid.x > 0)
                x = Math.round(x / props.grid.x) * props.grid.x
            if(props.grid.y > 0)
                y = Math.round(y / props.grid.y) * props.grid.y
        }

        props.onMove({
            event: event,
            placement: {
                x: x,
                y: y
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
                x: toBeDragged.getBoundingClientRect().x + bounding.x,
                y: toBeDragged.getBoundingClientRect().y + bounding.y
            }

            props.onDrop({event: event, currentPlacement: targetPlacement})
            toBeDragged.style.cursor = ''
        }

        onDrag = false
        canDrag = false

        document.removeEventListener('mousemove', handleDrag)
    }
    const handleMouseDown = (event) => {
        if (event.button === 0 && props.canDrag && (event.target === event.currentTarget || props.allowAnyClick)) {
            // props.onMouseDown(event)
            canDrag = true
            document.addEventListener('mousemove', handleDrag)
        }
    }

    const handleDragStart = (e) => {
        if (canDrag && onDrag === false) {
            onDrag = true
            if (props.onDragStart !== undefined)
                props.onDragStart(e, toBeDragged)

            const bounding = {
                x: root.scrollLeft - root.getBoundingClientRect().left,
                y: root.scrollTop - root.getBoundingClientRect().top
            }

            const mousePlacement = {
                x: e.clientX + bounding.x,
                y: e.clientY + bounding.y
            }

            const targetPlacement = {
                x: toBeDragged.getBoundingClientRect().x + bounding.x,
                y: toBeDragged.getBoundingClientRect().y + bounding.y
            }

            offset = {
                x: mousePlacement.x - targetPlacement.x,
                y: mousePlacement.y - targetPlacement.y
            }
            lastPlacement = {
                x: targetPlacement.x,
                y: targetPlacement.y
            }

            toBeDragged.style.cursor = 'grabbing'
        }
    }


    useEffect(() => {
        root = props.root === 'body' ? document.body : document.getElementById(props.root)
        toBeDragged = props.toBeDragged ? document.getElementById(props.toBeDragged) : props.reference.current

        if (toBeDragged !== null) {
            props.reference.current.addEventListener("mousedown", handleMouseDown);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            canDrag = false
            onDrag = false
            document.removeEventListener('mouseup', handleMouseUp)
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