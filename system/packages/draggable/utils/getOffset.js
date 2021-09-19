import PropTypes from "prop-types";

export default function getOffset(props){
    let initialOffset
    const bounding = {
        x: props.root.scrollLeft - props.root.getBoundingClientRect().left,
        y: props.root.scrollTop - props.root.getBoundingClientRect().top
    }

    const mousePlacement = {
        x: props.event.clientX + bounding.x,
        y: props.event.clientY + bounding.y
    }

    const targetPlacement = {
        x: props.toBeDragged.getBoundingClientRect().x + bounding.x,
        y: props.toBeDragged.getBoundingClientRect().y + bounding.y
    }

    initialOffset = {
        x: mousePlacement.x - targetPlacement.x,
        y: mousePlacement.y - targetPlacement.y
    }

    return {initialOffset, targetPlacement}
}

getOffset.propTypes={
    root: PropTypes.object,
    toBeDragged: PropTypes.object,
    event: PropTypes.object
}