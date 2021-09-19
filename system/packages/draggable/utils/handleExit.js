import PropTypes from "prop-types";

export default function handleExit(props){
    if (props.canDrag && props.onDrag) {
        const bounding = {
            x: props.root.scrollLeft - props.root.getBoundingClientRect().left,
            y: props.root.scrollTop - props.root.getBoundingClientRect().top
        }

        const targetPlacement = {
            x: props.toBeDragged.getBoundingClientRect().x + bounding.x,
            y: props.toBeDragged.getBoundingClientRect().y + bounding.y
        }

        props.onDrop({event: props.event, currentPlacement: targetPlacement})
        props.toBeDragged.style.cursor = ''

    }
}

handleExit.propTypes={
    onDrop: PropTypes.func,
    onDrag: PropTypes.bool,
    canDrag: PropTypes.bool,
    toBeDragged: PropTypes.object,
    event: PropTypes.object,
    root: PropTypes.object
}