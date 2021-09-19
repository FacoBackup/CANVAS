import PropTypes from "prop-types";

export default function getPlacement(props){
    const targetRect = props.toBeDragged.getBoundingClientRect()
    const bounding = {
        x: props.root.scrollLeft - props.root.getBoundingClientRect().left,
        y: props.root.scrollTop - props.root.getBoundingClientRect().top
    }
    const mousePlacement = {
        x: props.event.clientX + bounding.x,
        y: props.event.clientY + bounding.y
    }
    const toBeApplied = {
        x: props.lastPlacement.x - mousePlacement.x,
        y: props.lastPlacement.y - mousePlacement.y
    }
    props.lastPlacement = mousePlacement
    props.currentPlacement = {
        x: (targetRect.left + bounding.x) - toBeApplied.x / props.scale,
        y: (targetRect.top + bounding.y) - toBeApplied.y / props.scale
    }

    let placement = {
        x: mousePlacement.x - props.offset.x,
        y: mousePlacement.y - props.offset.y
    }

    if (props.grid !== undefined) {
        if (props.grid.x > 0)
            placement.x = Math.round(placement.x / props.grid.x) * props.grid.x
        if (props.grid.y > 0)
            placement.y = Math.round(placement.y / props.grid.y) * props.grid.y
    }

    return placement
}


getPlacement.propTypes={
    root: PropTypes.object,
    grid: PropTypes.object,
    lastPlacement: PropTypes.object,
    currentPlacement: PropTypes.object,
    event: PropTypes.object,
    toBeDragged: PropTypes.object,
    offset: PropTypes.object,
    scale: PropTypes.number
}