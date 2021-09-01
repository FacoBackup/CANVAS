import PropTypes from 'prop-types'
import styles from "../../styles/Canvas.module.css";
import PlaceCanvasScroll from "../../utils/placement/PlaceCanvasScroll";
import React, {useRef} from "react";

export default function Engine(props) {
    const root = useRef()

    return (
        <div
            ref={root} className={styles.canvasContainer} id={'frame'}
            onMouseDown={event => {
                if (typeof event.target.className === 'object' && event.button === 2)
                    PlaceCanvasScroll({canvas: root.current, event: event})
            }}>
            <svg
                onContextMenu={event => {
                    event.preventDefault()
                }}
                style={{
                    minWidth: props.dimensions.width + 'px',
                    minHeight: props.dimensions.height + 'px',
                    transform: `scale(${props.scale})`,
                    transformOrigin: props.scale !== 1 ? 'top left' : undefined,
                }}
                className={styles.canvasBackground}
                id={'engine-content'}
            >
                {props.children}
            </svg>
        </div>
    )
}
Engine.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    scale: PropTypes.number,
    setNodeOnOverview: PropTypes.func,
    nodeOnOverview: PropTypes.object,
    toBeLinked: PropTypes.object,
    setToBeLinked: PropTypes.func,
    selectedNode: PropTypes.object,
    setSelectedNode: PropTypes.func,
    dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    children: PropTypes.node
}
