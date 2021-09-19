import PropTypes from 'prop-types'
import GetNodeResizeParams from "../../utils/GetNodeResizeParams";
import styles from '../../styles/Node.module.css'

export default function Resizer(props) {
    const params = GetNodeResizeParams(props)
    let lastMousePlacement
    let dimensions = props.node.dimensions
    let currentDimensions = props.node.dimensions
    let currentPlacement = props.node.placement
    let lastPlacement = props.node.placement
    const handleTranslateY = (px) => {
        const nodeRef = document.getElementById(props.node.id + '-node-wrapper')
        let parsedPlacement = nodeRef.getAttribute('transform').replace('translate(', '').replace(')', '')
        parsedPlacement = parsedPlacement.split(', ')

        return props.placement.includes('s') ? parseInt(parsedPlacement[1]) + px : parseInt(parsedPlacement[1]) - px
    }
    const handleTranslateX = (px) => {
        const nodeRef = document.getElementById(props.node.id + '-node-wrapper')
        let parsedPlacement = nodeRef.getAttribute('transform').replace('translate(', '').replace(')', '')
        parsedPlacement = parsedPlacement.split(', ')

        return parseInt(parsedPlacement[0]) - px
    }

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
                currentPlacement = {
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

                currentPlacement = {
                    y: currentPlacement.y,
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
                currentPlacement = {
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
                currentPlacement = {
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
                currentPlacement = {
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
        currentPlacement = {
            x: newWidth > 50 ? currentPlacement.x : lastPlacement.x,
            y: newHeight > 50 ? currentPlacement.y : lastPlacement.y
        }
        props.setNode({
            ...props.node,
            dimensions: {
                width: newWidth > 50 ? newWidth : 50,
                height: newHeight > 50 ? newHeight : 50,
            },
            placement: currentPlacement
        })

        lastPlacement = currentPlacement
        currentDimensions = {
            width: newWidth > 50 ? newWidth : 50,
            height: newHeight > 50 ? newHeight : 50,
        }
    }

    const handleMouseUp = () => {
        lastMousePlacement = undefined

        document.removeEventListener('mousemove', handleResize)
        props.save(currentDimensions)
    }


    return (
        <circle
            r={props.placement.length === 1 ? 4 : 6} fill={'#666666'} cx={params.x} cy={params.y}
            cursor={params.cursor}
            className={styles.indicator}
            stroke={'transparent'} strokeWidth={'10'}
            onMouseDown={() => {
                document.addEventListener('mousemove', handleResize)
                document.addEventListener('mouseup', handleMouseUp, {once: true})
            }}
        />
    )
}
Resizer.propTypes = {
    save: PropTypes.func,
    placement: PropTypes.oneOf(['nw', 'w', 'e', 'n', 's', 'ne', 'se', 'sw']),
    viewBox: PropTypes.object,
    node: PropTypes.object,
    scale: PropTypes.number

}