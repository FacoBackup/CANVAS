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
    nodeRef.style.cursor = 'move'
    let onMove = false




    const handlePlacement = (event, save) => {
        if (!onMove) {
            props.setOnMove(true)
            onMove = true
            props.setSelectedNode(undefined)
        }

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

            nodeRef.setAttribute('transform', `translate(${newTransform.x}, ${newTransform.y})`)

            props.savePlacement(newPlacement)
        }
    }


    document.addEventListener('mousemove', function movingEl(event) {
        if (moving)
            handlePlacement(event, false)
        else
            event.currentTarget.removeEventListener('mousemove', movingEl)
    })
    document.addEventListener("mouseup", event => {
        moving = false
        nodeRef.style.cursor = 'pointer'
        handlePlacement(event, true)
        props.setOnMove(false)

        props.setSelectedNode(props.node)
    }, {once: true});

}

PlaceNode.propTypes = {
    scale: PropTypes.number,
    node: PropTypes.object,
    event: PropTypes.object,
    setSelectedNode: PropTypes.func,
    setOnMove: PropTypes.func,
    savePlacement: PropTypes.func
}
