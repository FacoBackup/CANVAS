import PropTypes from 'prop-types'
import React from "react";

export default function GetCurve(props) {
    let response
    let pivots = {}

    let target = {
        x: undefined,
        y: undefined
    }
    let source = {
        x: undefined,
        y: undefined
    }

    switch (props.target.connectionPoint) {
        case 'n': {
            target = {
                x: props.target.x + props.target.width / 2,
                y: props.target.y - 12
            }
            break
        }
        case 'e': {
            target = {
                x: props.target.x + props.target.width + 12,
                y: props.target.y + props.target.height / 2
            }
            break
        }
        case 's': {
            target = {
                x: props.target.x + props.target.width / 2,
                y: props.target.y + props.target.height + 12
            }
            break
        }
        case 'w': {
            target = {
                x: props.target.x - 12,
                y: props.target.y + props.target.height / 2
            }
            break
        }
        default:
            break
    }
    switch (props.source.connectionPoint) {
        case 'n': {
            source = {
                x: props.source.x + props.source.width / 2,
                y: props.source.y - 12
            }
            break
        }
        case 'e': {
            source = {
                x: props.source.x + props.source.width + 12,
                y: props.source.y + props.source.height / 2
            }
            break
        }
        case 's': {
            source = {
                x: props.source.x + props.source.width / 2,
                y: props.source.y + props.source.height + 12
            }
            break
        }
        case 'w': {
            source = {
                x: props.source.x - 12,
                y: props.source.y + props.source.height / 2
            }
            break
        }
        default:
            break
    }
    if (props.source.connectionType.includes('-path')) {
        if(props.source.connectionPoint === 'n' || props.source.connectionPoint === 's'){
            switch (true) {
                case (source.y > target.y): {
                    pivots.x1 = source.x
                    pivots.y1 = source.y - (source.y - target.y) / 2

                    break
                }
                case (target.y >= source.y): {
                    pivots.x1 = source.x
                    pivots.y1 = target.y - (target.y - source.y) / 2

                    break
                }
                case (target.y === source.y): {

                            pivots.x1 = source.x
                            pivots.y1 = source.y
                            // x2: target.x,
                            // y2: target.y
                    break
                }
                default:
                    break
            }
        }
        else{
            switch (true) {
                case (source.x > target.x): {
                    pivots.x1 = source.x  - (source.x - target.x) / 2
                    pivots.y1 = source.y

                    break
                }
                case (target.x >= source.x): {
                    pivots.x1 = target.x  - (target.x - source.x) / 2
                    pivots.y1 = source.y

                    break
                }
                case (target.x === source.x): {

                    pivots.x1 = source.x
                    pivots.y1 = source.y
                    break
                }
                default:
                    break
            }

        }
        if(props.target.connectionPoint === 'n' || props.target.connectionPoint === 's'){
            switch (true) {
                case (source.y > target.y): {
                    pivots.x2 = target.x
                    pivots.y2 = source.y - (source.y - target.y) / 2

                    break
                }
                case (target.y >= source.y): {
                    pivots.x2 = target.x
                    pivots.y2 = target.y - (target.y - source.y) / 2

                    break
                }
                case (target.y === source.y): {

                    pivots.x2 = target.x
                    pivots.y2 = target.y
                    break
                }
                default:
                    break
            }
        }
        else{
            switch (true) {
                case (source.x > target.x): {
                    pivots.x2 = source.x  - (source.x - target.x) / 2
                    pivots.y2 = target.y

                    break
                }
                case (target.x >= source.x): {
                    pivots.x2 = target.x  - (target.x - source.x) / 2
                    pivots.y2 = target.y

                    break
                }
                case (target.x === source.x): {

                    pivots.x2 = target.x
                    pivots.y2 = target.y
                    break
                }
                default:
                    break
            }
        }



        response = `M${source.x},${source.y} C${pivots.x1},${pivots.y1} ${pivots.x2},${pivots.y2} ${target.x},${target.y}`
    } else
        response = `M${source.x},${source.y} ${target.x},${target.y}`

    return response
}
GetCurve.propTypes = {
    source: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        connectionPoint: PropTypes.string,
        connectionType: PropTypes.string
    }),
    target: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        connectionPoint: PropTypes.string
    })
}