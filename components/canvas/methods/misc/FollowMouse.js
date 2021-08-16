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
            props.pathRef.setAttribute('d', GetCurve({
                followMouse:true,
                target: {
                    x: event.clientX - frame.offsetLeft + frame.scrollLeft,
                    y: event.clientY - frame.offsetTop + frame.scrollTop,
                    connectionPoint: 'n'
                },
                source: {
                    id: props.source.id,
                    connectionPoint: props.source.connectionPoint,
                },
                connectionType: props.source.connectionType
            }))
        }
    }
}

FollowMouse.propTypes = {
    source: PropTypes.shape({
        id: PropTypes.string,
        connectionPoint: PropTypes.oneOf(['e', 's', 'w', 'n']),
        nodeShape: PropTypes.string,
        connectionType: PropTypes.string
    }),
    pathRef: PropTypes.object,
}
