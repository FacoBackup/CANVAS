import PropTypes from "prop-types";

export default function getNodeResizeParams(props){
    let res = {}
    switch (props.placement) {

        case 'n': {

            res = {
                cursor: 'row-resize',
                x: props.viewBox.x / 2,
                y: 0 - props.offset
            }
            break
        }
        case 's': {
            res = {
                cursor: 'row-resize',
                x: props.viewBox.x / 2,
                y: props.viewBox.y + props.offset
            }
            break
        }
        case 'e': {
            res = {
                cursor: 'col-resize',
                x: props.viewBox.x + props.offset,
                y: props.viewBox.y / 2
            }

            break
        }
        case 'w': {
            res = {
                cursor: 'col-resize',
                x: 0 - props.offset,
                y: props.viewBox.y / 2
            }
            break
        }

        case 'sw': {
            res = {
                cursor: props.placement + '-resize',
                x: 0 - props.offset,
                y: props.viewBox.y + props.offset
            }
            break
        }
        case 'se': {
            res = {
                cursor: props.placement + '-resize',
                x: props.viewBox.x + props.offset,
                y: props.viewBox.y+ props.offset
            }
            break
        }
        case 'nw': {
            res = {
                cursor: props.placement + '-resize',
                x: -props.offset,
                y: -props.offset
            }
            break
        }
        case 'ne': {
            res = {
                cursor: props.placement + '-resize',
                x: props.viewBox.x + props.offset,
                y: -props.offset
            }
            break
        }
    }
    return res
}
getNodeResizeParams.propTypes = {
    placement: PropTypes.oneOf(['nw', 'w', 'e', 'n', 's', 'ne', 'se', 'sw']),
    viewBox: PropTypes.object,
    offset: PropTypes.number
}