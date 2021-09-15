import PropTypes from 'prop-types'
import styles from '../styles/Canvas.module.css'

export default function SelectBox(props) {
    let canMove = true
    let box = document.createElement('div')
    let boundedBy = {x: false, y: false}
    let unselectedNodes = []
    let toBeSelected = props.selectedNodes.map(b => b.node)

    props.nodes.forEach((e) => {
        if (props.selectedNodes.find(b => b.node.id === e.id) === undefined)
            unselectedNodes.push(e)
    })
    const checkIntersections = () => {
        unselectedNodes.forEach((e, i) => {
            const bBox = box.getBoundingClientRect()
            const eBBox = document.getElementById(e.id + '-node').getBoundingClientRect()

            if (eBBox.left <= (bBox.width + bBox.left) && eBBox.top <= (bBox.height + bBox.top) && eBBox.left >= (bBox.left) && eBBox.top >= ( bBox.top)) {
                toBeSelected.push(e)
                unselectedNodes.splice(i, 1)
            }
        })
    }

    if (props.event.button === 0) {
        if (!props.event.ctrlKey)
            props.unselectNode(undefined, true)
        document.body.appendChild(box)
        box.classList.add(styles.selectBox)
        box.style.top = props.event.clientY + 'px'
        box.style.left = props.event.clientX + 'px'
        box.setAttribute('ry', '3')

        const canvasBBox = props.event.target.getBoundingClientRect()
        const handleDrag = (e) => {
            checkIntersections()
            const width = props.event.clientX > e.clientX ? (props.event.clientX - e.clientX) : (e.clientX - props.event.clientX)
            const height = props.event.clientY > e.clientY ? (props.event.clientY - e.clientY) : (e.clientY - props.event.clientY)
            let transformX
            let transformY

            if (!boundedBy.y && !boundedBy.x) {
                box.style.height = height + 'px'
                transformY = props.event.clientY > e.clientY ? (e.clientY - props.event.clientY) : 0

                box.style.width = width + 'px'
                transformX = props.event.clientX > e.clientX ? (e.clientX - props.event.clientX) : 0
            }
            if (e.clientY >= canvasBBox.top)
                boundedBy = {x: boundedBy.x, y: false}
            else
                boundedBy = {x: boundedBy.x, y: true}
            if (e.clientX >= canvasBBox.left)
                boundedBy = {x: false, y: boundedBy.y}
            else
                boundedBy = {x: true, y: boundedBy.y}

            // if (transformX !== undefined && transformY !== undefined)
            box.style.transform = `translate(${transformX}px, ${transformY}px)`

        }

        const handleMouseMove = (e) => {
            if (canMove)
                handleDrag(e)
            else
                e.currentTarget.removeEventListener('mousemove', handleMouseMove)
        }
        const handleMouseUp = () => {
            props.selectNode(undefined, undefined, undefined, toBeSelected)
            canMove = false
            box.classList.remove(styles.enterA)
            box.classList.add(styles.exitA)
            if (toBeSelected.length === props.selectedNodes.length)
                props.unselectNode(undefined, true)

            box.addEventListener('animationend', () => {
                document.body.removeChild(box)
            }, {once: true})
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp, {once: true})
    }
}

SelectBox.propTypes = {
    selectedNodes: PropTypes.arrayOf(PropTypes.object),
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    event: PropTypes.object,
    nodes: PropTypes.array
}