import PropTypes from 'prop-types'
import styles from '../styles/Canvas.module.css'
import {useCallback, useEffect} from "react";

export default function SelectBox(props) {
    let wrapper = null
    let wrapperBox = null
    let lastPlacement = {
        x: undefined,
        y: undefined
    }
    let box
    let canMove = true
    let unselectedNodes = []
    let toBeSelected = []

    const checkIntersections = () => {
        unselectedNodes.forEach((e, i) => {
            const element = document.getElementById(e.id + '-node')
            if (element !== null) {
                const b = element.getBoundingClientRect()
                const eBBox = {
                    width: b.width,
                    height: b.height,
                    left: b.left - wrapperBox.left,
                    top: b.top - wrapperBox.top
                }


                const bBox = {
                    width: box.offsetWidth,
                    height: box.offsetHeight,
                    left: box.offsetLeft,
                    top: box.offsetTop
                }

                if (eBBox.left <= (bBox.width + bBox.left) && eBBox.top <= (bBox.height + bBox.top) && eBBox.left >= (bBox.left) && eBBox.top >= (bBox.top)) {
                    toBeSelected.push(e)

                    unselectedNodes.splice(i, 1)
                }
            }
        })
    }
    const handleDrag = (e) => {
        checkIntersections()
        let currentPlacement = {
            x: e.clientX - wrapperBox.left,
            y: e.clientY - wrapperBox.top
        }
        const width = lastPlacement.x > currentPlacement.x ? Math.abs(lastPlacement.x - currentPlacement.x) : Math.abs(currentPlacement.x - lastPlacement.x)
        const height = lastPlacement.y > currentPlacement.y ? Math.abs(lastPlacement.y - currentPlacement.y) : Math.abs(currentPlacement.y - lastPlacement.y)
        let newTop = lastPlacement.y > (currentPlacement.y) ? ((box.offsetTop + box.offsetHeight) + (currentPlacement.y - lastPlacement.y)) : box.offsetTop
        let newLeft = lastPlacement.x > (currentPlacement.x) ? ((box.offsetLeft + box.offsetWidth) + (currentPlacement.x - lastPlacement.x)) : box.offsetLeft

        box.style.height = height + 'px'
        box.style.width = width + 'px'
        box.style.left = newLeft + 'px'
        box.style.top = newTop + 'px'
    }

    const handleMouseUp = () => {

        if (canMove) {
            canMove = false

            props.selectNode(null, null, null, toBeSelected)

            box.classList.remove(styles.enterA)
            box.classList.add(styles.exitA)

            if (toBeSelected.length === 0) {
                console.log('UNSELECTING NODES')
                props.unselectNode(undefined, true)
            }

            box.style.display = 'none'
            box.style.transform = null
            box.style.width = null
            box.style.height = null
            box.style.left = null
            box.style.top = null

            unselectedNodes = []
            toBeSelected = []
            document.removeEventListener('mousemove', handleDrag)
        }
    }

    const handleMouseDown = (event) => {
        if (event.target.id === 'engine-content' && event.button === 0 && wrapperBox !== null) {
            lastPlacement = {
                x: event.clientX - wrapperBox.left,
                y: event.clientY - wrapperBox.top
            }
            const copy = [...props.data.nodes]
            copy.forEach((e) => {
                if (props.selectedNodes.find(b => b.node.id === e.id) === undefined)
                    unselectedNodes.push(e)
            })

            if (!event.ctrlKey)
                unselectedNodes = copy

            box.classList.remove(styles.exitA)
            box.classList.add(styles.enterA)
            box.style.display = 'block'

            box.style.top = lastPlacement.y + 'px'
            box.style.left = lastPlacement.x + 'px'
            canMove = true

            document.addEventListener('mouseup', handleMouseUp)
            document.addEventListener('mousemove', handleDrag)
        }
    }

    useEffect(() => {
        if (wrapper === null) {
            wrapper = document.getElementById('select-box-wrapper')
            wrapperBox = wrapper.getBoundingClientRect()
        }
        box = document.createElement('div')
        wrapper.appendChild(box)
        box.classList.add(styles.selectBox)
        box.style.display = 'none'

        return () => {
            canMove = false
            unselectedNodes = []
            toBeSelected = []
            lastPlacement = {
                x: undefined,
                y: undefined
            }
            wrapper.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mousemove', handleDrag)
            wrapper.removeChild(box)
        }
    }, [props.selectedNodes, props.data])

    return handleMouseDown
}

SelectBox.propTypes = {
    selectedNodes: PropTypes.arrayOf(PropTypes.object),
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,

    data: PropTypes.object
}