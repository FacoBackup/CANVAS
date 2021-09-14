import PropTypes from 'prop-types'

export default function PlaceNode(props) {
    let moving = true
    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }

    let placementRef = document.getElementById(props.node.id + '-placement')
    let nodeRef = document.getElementById(props.node.id + '-node')
    nodeRef.style.transition = 'box-shadow 250ms ease';
    nodeRef.style.cursor = 'grabbing'
    let onMove = false


    const handlePlacement = (event, save) => {

        const currentPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }
        let parsedPlacement = nodeRef.getAttribute('transform').replace('translate(', '').replace(')', '')
        parsedPlacement = parsedPlacement.split(', ')

        if (placementRef !== null && !props.noPlacementIndicator)
            placementRef.innerText = `${Math.ceil(parseInt(parsedPlacement[0]))}, ${Math.ceil(parseInt(parsedPlacement[1]))}`

        const newPlacement = {
            x: parseInt(parsedPlacement[0]) - currentPlacement.x / props.scale,
            y: parseInt(parsedPlacement[1]) - currentPlacement.y / props.scale
        }

        nodeRef.setAttribute('transform', `translate(${newPlacement.x}, ${newPlacement.y})`)

        if (save) {
            let newTransform = {
                x: newPlacement.x,
                y: newPlacement.y
            }
            if (newPlacement.x < 0)
                newTransform.x = 0
            if (newPlacement.y < 0)
                newTransform.y = 0
            props.dispatch({type: props.actions.PLACEMENT, payload: newTransform})
            nodeRef.setAttribute('transform', `translate(${newTransform.x}, ${newTransform.y})`)
        }
    }


    document.addEventListener('mousemove', function movingEl(event) {
        if (moving) {
            if (!onMove) {
                onMove = true
                props.unselectNode(props.node.id)
            }

            handlePlacement(event, false)
        } else
            event.currentTarget.removeEventListener('mousemove', movingEl)
    })
    document.addEventListener("mouseup", event => {
        moving = false
        nodeRef.style.cursor = 'unset'
        props.selectNode(props.node)
        handlePlacement(event, true)
    }, {once: true});

}

PlaceNode.propTypes = {

    scale: PropTypes.number,
    node: PropTypes.object,
    event: PropTypes.object,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,
    dispatch: PropTypes.func,
    actions: PropTypes.object,
    noPlacementIndicator: PropTypes.bool
}
