import PropTypes from "prop-types";
import GetCurve from "./GetCurve";

export default function FollowMouse(props) {
    let moving = true
    const frame = document.getElementById('frame')
    const root = document.getElementById('frame-content')
    const markerEnd = document.getElementById(props.pathRef.getAttribute('marker-end').replace('url(#', '').replace(')', ''))
    if (markerEnd !== null)
        markerEnd.setAttribute('visibility', 'hidden')

    if (moving) {

        document.addEventListener('mousemove', function move(event) {
            if (moving) {
                if (markerEnd !== null)
                    markerEnd.setAttribute('visibility', 'visible')
                update(event)
            } else
                event.currentTarget.removeEventListener('mousemove', move);
        })

        document.addEventListener("mouseup", () => {
            moving = false
        }, {
            once: true
        });
    }
    const update = (event) => {
        if (props.pathRef !== null && frame !== null) {
            const nodeRef = document.getElementById(props.source.id + '-node')

            let parsedPlacement = nodeRef.getAttribute('transform').replace('translate(', '').replace(')', '')
            parsedPlacement = parsedPlacement.split(', ')
            const sourcePlacement = {
                x: parseInt(parsedPlacement[0]),
                y: parseInt(parsedPlacement[1])
            }

            props.pathRef.setAttribute('d', GetCurve({
                target: {
                    x: event.clientX - frame.offsetLeft + root.scrollLeft,
                    y: event.clientY - frame.offsetTop - 55 + root.scrollTop,
                    height: 0,
                    width: 0,
                    connectionPoint: 's',
                    nodeShape: 'circle'
                },
                source: {
                    x: sourcePlacement.x,
                    y: sourcePlacement.y,
                    height: nodeRef.firstChild.getAttribute('height'),
                    width: nodeRef.firstChild.getAttribute('width'),
                    connectionPoint: props.source.connectionPoint,
                    nodeShape: props.source.nodeShape,
                    connectionType: props.source.connectionType
                }
            }))
        }
    }
}

FollowMouse.propTypes = {
    source: PropTypes.shape({
        reference: PropTypes.object,
        connectionPoint: PropTypes.oneOf(['e', 's', 'w', 'n']),
        nodeShape: PropTypes.string,
        connectionType: PropTypes.string
    }),
    pathRef: PropTypes.object,
}
