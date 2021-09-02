import PropTypes from 'prop-types'
import NodeTemplate from "../props/NodeTemplate";
import GetNodeResizeParams from "../../utils/misc/GetNodeResizeParams";

export default function ResizeIndicator(props) {
    const params = GetNodeResizeParams(props)

    const handleTranslateY = (px) => {
        const nodeRef = document.getElementById(props.node.id + '-node')
        let parsedPlacement = nodeRef.getAttribute('transform').replace('translate(', '').replace(')', '')
        parsedPlacement = parsedPlacement.split(', ')

        return props.placement.includes('s') ? parseInt(parsedPlacement[1]) + px : parseInt(parsedPlacement[1]) - px
    }
    const handleTranslateX = (px) => {
        const nodeRef = document.getElementById(props.node.id + '-node')
        let parsedPlacement = nodeRef.getAttribute('transform').replace('translate(', '').replace(')', '')
        parsedPlacement = parsedPlacement.split(', ')

        return parseInt(parsedPlacement[0]) - px
    }
    let lastMousePlacement
    let dimensions = props.node.dimensions
    const handleResize = (event) => {
        if (!lastMousePlacement)
            lastMousePlacement = {
                x: event.clientX,
                y: event.clientY
            }

        const newMousePlacement = {
            x: event.clientX / props.scale,
            y: event.clientY / props.scale
        }

        let newHeight
        let newWidth


        let newNodePlacement = props.node.placement
        //
        switch (props.placement) {
            case 's': {
                newHeight = (props.node.dimensions.height + (newMousePlacement.y - lastMousePlacement.y))
                newWidth = props.node.dimensions.width
                break
            }
            case 'e': {
                newHeight = props.node.dimensions.height
                newWidth = (props.node.dimensions.width + (newMousePlacement.x - lastMousePlacement.x))
                break
            }
            case 'nw': {

                newHeight = (props.node.dimensions.height + (lastMousePlacement.y - newMousePlacement.y))
                newWidth = (props.node.dimensions.width + (lastMousePlacement.x - newMousePlacement.x))
                newNodePlacement = {
                    y: handleTranslateY(newHeight - dimensions.height),
                    x: handleTranslateX(newWidth - dimensions.width)
                }
                dimensions = {
                    width: newWidth,
                    height: newHeight
                }
                break
            }
            case 'se': {
                newHeight = (props.node.dimensions.height + (newMousePlacement.y - lastMousePlacement.y))
                newWidth = (props.node.dimensions.width + (newMousePlacement.x - lastMousePlacement.x))

                break
            }
            case 'sw': {

                newHeight = (props.node.dimensions.height + (newMousePlacement.y - lastMousePlacement.y))
                newWidth = (props.node.dimensions.width + (lastMousePlacement.x - newMousePlacement.x))
                newNodePlacement = {
                    y: props.node.placement.y,
                    x: handleTranslateX(newWidth - dimensions.width)
                }
                dimensions = {
                    width: newWidth,
                    height: newHeight
                }
                break
            }
            case 'w': {
                newHeight = props.node.dimensions.height
                newWidth = (props.node.dimensions.width + (lastMousePlacement.x - newMousePlacement.x))
                newNodePlacement = {
                    y: props.node.placement.y,
                    x: handleTranslateX(newWidth - dimensions.width)
                }
                dimensions = {
                    width: newWidth,
                    height: newHeight
                }
                break
            }
            case 'n': {
                newWidth = props.node.dimensions.width
                newHeight = (props.node.dimensions.height + (lastMousePlacement.y - newMousePlacement.y))
                newNodePlacement = {
                    x: props.node.placement.x,
                    y: handleTranslateY(newHeight - dimensions.height)
                }
                dimensions = {
                    width: newWidth,
                    height: newHeight
                }
                break
            }
            case 'ne': {
                newHeight = (props.node.dimensions.height + (lastMousePlacement.y - newMousePlacement.y))
                newWidth = (props.node.dimensions.width + (newMousePlacement.x - lastMousePlacement.x))
                newNodePlacement = {
                    y: handleTranslateY(newHeight - dimensions.height),
                    x: props.node.placement.x
                }
                dimensions = {
                    width: newWidth,
                    height: newHeight
                }
                break
            }

            default:
                break
        }

        props.setNode({
            ...props.node,
            dimensions: {
                width: newWidth > 20 ? newWidth : props.node.dimensions.width,
                height: newHeight > 20 ? newHeight : props.node.dimensions.height,
            },
            placement: newNodePlacement
        })
    }
    const handleMouseUp = () => {
        lastMousePlacement = undefined
        document.removeEventListener('mousemove', handleResize)
    }


    return (
        <circle
            r={'4'} fill={'blue'} cx={params.x} cy={params.y}
            cursor={params.cursor}
            stroke={'transparent'} strokeWidth={'10'}
            onMouseDown={() => {
                console.log(props.placement)
                document.addEventListener('mousemove', handleResize)
                document.addEventListener('mouseup', handleMouseUp, {once: true})
            }}
        />
    )
}
ResizeIndicator.propTypes = {
    placement: PropTypes.oneOf(['nw', 'w', 'e', 'n', 's', 'ne', 'se', 'sw']),
    viewBox: PropTypes.object,
    node: NodeTemplate,
    setNode: PropTypes.func,
    scale: PropTypes.number

}