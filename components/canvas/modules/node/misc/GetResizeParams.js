import PropTypes from "prop-types";

export default function GetResizeParams(props){
    let res = {}
    switch (props.placement) {

        case 'n': {

            res = {
                cursor: 'col-resize',
                x: props.viewBox.x / 2,
                y: 0
            }
            break
        }
        case 's': {
            res = {
                cursor: 'col-resize',
                x: props.viewBox.x / 2,
                y: props.viewBox.y
            }
            break
        }
        case 'e': {
            res = {
                cursor: 'row-resize',
                x: props.viewBox.x,
                y: props.viewBox.y / 2
            }

            break
        }
        case 'w': {
            res = {
                cursor: 'row-resize',
                x: 0,
                y: props.viewBox.y / 2
            }
            break
        }

        case 'sw': {
            res = {
                cursor: props.placement + '-resize',
                x: 0,
                y: props.viewBox.y
            }
            break
        }
        case 'se': {
            res = {
                cursor: props.placement + '-resize',
                x: props.viewBox.x,
                y: props.viewBox.y
            }
            break
        }
        case 'nw': {
            res = {
                cursor: props.placement + '-resize',
                x: 0,
                y: 0
            }
            break
        }
        case 'ne': {
            res = {
                cursor: props.placement + '-resize',
                x: props.viewBox.x,
                y: 0
            }
            break
        }
    }
    return res
}
GetResizeParams.propTypes = {
    placement: PropTypes.oneOf(['nw', 'w', 'e', 'n', 's', 'ne', 'se', 'sw']),
    viewBox: PropTypes.object
}