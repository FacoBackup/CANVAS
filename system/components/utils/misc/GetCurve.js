import PropTypes from 'prop-types'
import React from "react";

export default function GetCurve(props) {
    let response
    let pivots = {}
    let target
    let sourceRef = document.getElementById(props.source.id + '-' + props.source.connectionPoint + '-*node-selector')
    let frame = document.getElementById('engine')

    if (sourceRef !== null && sourceRef !== undefined) {
        let source = {
            x: sourceRef.getBoundingClientRect().x + 5 - frame.getBoundingClientRect().left + frame.scrollLeft,
            y: sourceRef.getBoundingClientRect().y + 5 - frame.getBoundingClientRect().top + frame.scrollTop
        }

        if (props.followMouse)
            target = props.target
        else {
            let targetRef = document.getElementById(props.target.id + '-' + props.target.connectionPoint + '-*node-selector')
            target = {
                x: targetRef.getBoundingClientRect().x - frame.getBoundingClientRect().left + frame.scrollLeft,
                y: targetRef.getBoundingClientRect().y  - frame.getBoundingClientRect().top + frame.scrollTop
            }
        }

        if (props.connectionType !== undefined && props.connectionType !== null && props.connectionType.includes('-path')) {
            if (props.source.connectionPoint === 'n' || props.source.connectionPoint === 's') {
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
                        break
                    }
                    default:
                        break
                }
            } else {
                switch (true) {
                    case (source.x > target.x): {
                        pivots.x1 = source.x - (source.x - target.x) / 2
                        pivots.y1 = source.y

                        break
                    }
                    case (target.x >= source.x): {
                        pivots.x1 = target.x - (target.x - source.x) / 2
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
            if (props.target.connectionPoint === 'n' || props.target.connectionPoint === 's') {
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
            } else {
                switch (true) {
                    case (source.x > target.x): {
                        pivots.x2 = source.x - (source.x - target.x) / 2
                        pivots.y2 = target.y

                        break
                    }
                    case (target.x >= source.x): {
                        pivots.x2 = target.x - (target.x - source.x) / 2
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
    }

    return response
}
GetCurve.propTypes = {
    connectionType: PropTypes.string,

    source: PropTypes.shape({
        id: PropTypes.string,
        connectionPoint: PropTypes.string,
    }),
    target: PropTypes.shape({
        id: PropTypes.string,
        connectionPoint: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number
    }),
    followMouse: PropTypes.bool
}