import PropTypes from 'prop-types'
import styles from '../styles/Canvas.module.css'

export default function SelectBox(props) {
    let canMove = true
    let box = document.createElement('div')

    props.unselectNode(undefined, true)
    document.body.appendChild(box)
    box.classList.add(styles.selectBox)
    box.style.top = props.event.clientY + 'px'
    box.style.left = props.event.clientX + 'px'

    const handleDrag = (e) => {
        const width = props.event.clientX > e.clientX ? (props.event.clientX - e.clientX) : (e.clientX - props.event.clientX)
        const height = props.event.clientY > e.clientY ? (props.event.clientY - e.clientY) : (e.clientY - props.event.clientY)
        const transformX = props.event.clientX > e.clientX ? (e.clientX - props.event.clientX) : 0
        const transformY = props.event.clientY > e.clientY ? (e.clientY - props.event.clientY) : 0
        box.style.height = height + 'px'
        box.style.width = width + 'px'
        box.style.transform = `translate(${transformX}px, ${transformY}px)`
    }

    const handleMouseMove = (e) => {
        if (canMove)
            handleDrag(e)
        else
            e.currentTarget.removeEventListener('mousemove', handleMouseMove)
    }
    const handleMouseUp = () => {
        canMove = false
        box.classList.add(styles.exitA)
        box.addEventListener('animationend', () => {
            document.body.removeChild(box)
        }, {once: true})
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp, {once: false})

}

SelectBox.propTypes = {
    selectedNodes: PropTypes.arrayOf(PropTypes.object),
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    event: PropTypes.object
}