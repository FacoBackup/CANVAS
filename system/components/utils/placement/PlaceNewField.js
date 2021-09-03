import PropTypes from 'prop-types'
import {v4 as uuid4} from "uuid";

export default function PlaceNewField(props) {
    let moving = true
    const dropzoneAxis = document.getElementById('add-field-node-axis')
    const dropzoneValue = document.getElementById('add-field-node-value')
    const element = props.element.cloneNode(true)
    const newWrapper = document.createElement('div')

    document.body.appendChild(newWrapper)
    newWrapper.appendChild(element)
    newWrapper.style.position = 'fixed'
    newWrapper.style.zIndex = '999'
    newWrapper.style.width = '240px'
    newWrapper.style.height = '40px'
    newWrapper.style.top = (props.event.clientY - 20) + 'px'
    newWrapper.style.left = (props.event.clientX - 120) + 'px'
    newWrapper.style.opacity = '.7'
    newWrapper.style.transition = 'opacity 150ms linear'
    newWrapper.style.cursor = 'grabbing'

    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }
    const handleMouseEnter = (as) => {
        newWrapper.style.opacity = '1'
        if (as === 'axis') {
            dropzoneAxis.style.background = '#E8F0FE'
            dropzoneAxis.style.color = '#0095ff'
        } else {
            dropzoneValue.style.background = '#E8F0FE'
            dropzoneValue.style.color = '#0095ff'
        }

    }
    const handleMouseLeave = () => {
        newWrapper.style.opacity = '.7'
        if (dropzoneAxis !== null) {
            dropzoneAxis.style.background = ''
            dropzoneAxis.style.color = ''
        }
        if (dropzoneValue !== null) {
            dropzoneValue.style.background = ''
            dropzoneValue.style.color = ''
        }
    }

    document.addEventListener('mousemove', function movingNew(event) {
        if (moving)
            move(event)
        else
            event.currentTarget.removeEventListener('mousemove', movingNew);
    })
    document.addEventListener("mouseup", event => {

        if (moving) {
            document.body.removeChild(newWrapper)
            if (dropzoneAxis !== null && document.elementsFromPoint(event.clientX, event.clientY).includes(dropzoneAxis))
                props.handleFieldLink('axis')
            else if (dropzoneValue !== null && document.elementsFromPoint(event.clientX, event.clientY).includes(dropzoneValue))
                props.handleFieldLink('value')
            moving = false
        }

    }, {once: true})

    function move(event) {
        if (dropzoneAxis !== null && document.elementsFromPoint(event.clientX, event.clientY).includes(dropzoneAxis))
            handleMouseEnter('axis')
        else if (dropzoneValue !== null && document.elementsFromPoint(event.clientX, event.clientY).includes(dropzoneValue))
            handleMouseEnter('value')
         else if (newWrapper.style.opacity === '1')
            handleMouseLeave()

        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }

        let placementX = newWrapper.offsetLeft - newPlacement.x
        let placementY = newWrapper.offsetTop - newPlacement.y


        newWrapper.style.top = placementY + 'px'
        newWrapper.style.left = placementX + 'px'

    }
}

PlaceNewField.propTypes = {
    element: PropTypes.object,
    event: PropTypes.object,
    handleFieldLink: PropTypes.func,
    // data: PropTypes.object
}
