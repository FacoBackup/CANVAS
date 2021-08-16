import PropTypes from "prop-types";
import GetCurve from "./GetCurve";

export default function AdjustLink(props) {
    let moving = true
    if (moving) {
        props.setOnMove(true)
        document.addEventListener('mousemove', function move(event) {
            if (moving)
                update()
            else
                event.currentTarget.removeEventListener('mousemove', move);
        })

        document.addEventListener("mouseup", function up(event) {
            if (moving) {
                moving = false
                props.setOnMove(false)
                document.removeEventListener('mousemove', () => null)
                event.currentTarget.removeEventListener('mousemove', up);
                props.setColor(undefined)
            }
        }, {
            once: true
        })
    }
    const update = () => {


        if (props.pathRef !== null)
            props.pathRef.setAttribute('d', GetCurve({
                target: props.target,
                source: props.source,
                connectionType: props.connectionType
            }))
    }
}

AdjustLink.propTypes = {
    source: PropTypes.shape({
        id: PropTypes.string,
        connectionPoint: PropTypes.oneOf(['e', 'n', 's', 'w'])
    }),
    target: PropTypes.shape({
        id: PropTypes.string,
        connectionPoint: PropTypes.oneOf(['e', 'n', 's', 'w'])
    }),
    pathRef: PropTypes.object,
    setColor: PropTypes.func,
    setOnMove: PropTypes.func,
    connectionType: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line'])
}
