import PropTypes from 'prop-types'

export default function PlaceCanvasScroll(props) {
    let scrolling = true
    let pos = {top: 0, left: 0, x: 0, y: 0};

    pos = {
        left: props.canvas.scrollLeft,
        top: props.canvas.scrollTop,
        x: props.event.clientX,
        y: props.event.clientY,
    };
    props.canvas.style.cursor = 'grabbing'
    const handleMouseMove = (event) => {
        if (scrolling) {
            const dx = event.clientX - pos.x;
            const dy = event.clientY - pos.y;
            props.canvas.scrollTop = pos.top - dy;
            props.canvas.scrollLeft = pos.left - dx;
        }

    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', () => {
        props.canvas.style.cursor = 'default'
        document.removeEventListener('mousemove', handleMouseMove)
        scrolling = false
    }, {once: true})
}
PlaceCanvasScroll.propTypes = {
    canvas: PropTypes.object,
    event: PropTypes.object
}