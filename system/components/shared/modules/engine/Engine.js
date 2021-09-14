import PropTypes from 'prop-types'
import styles from "../../styles/Canvas.module.css";
import PlaceCanvasScroll from "../../utils/PlaceCanvasScroll";
import React, {useRef} from "react";
import SelectBox from "../SelectBox";

export default function Engine(props) {
    const root = useRef()

    return (
        <div
            ref={root} className={styles.canvasContainer} style={{height: 'calc(100% - ' + props.offsetTop + 'px)'}}
            id={'frame'}
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
                onMouseDown={e => {
                    if (e.target.id === 'engine-content')
                        SelectBox({
                            selectedNodes: props.selectedNodes,
                            selectNode: props.selectNode,
                            unselectNode: props.unselectNode,
                            event: e,
                            nodes: props.data.nodes
                        })

                }}
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

    toBeLinked: PropTypes.object,
    setToBeLinked: PropTypes.func,

    selectedNodes: PropTypes.object,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,

    dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),

    children: PropTypes.node
}
