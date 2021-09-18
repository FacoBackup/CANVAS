import PropTypes from 'prop-types'
import styles from "../../styles/Canvas.module.css";
import PlaceCanvasScroll from "../../utils/PlaceCanvasScroll";
import React, {useEffect, useRef} from "react";
import SelectBox from "../SelectBox";

export default function Engine(props) {
    const root = useRef()
    let callback = SelectBox({
        selectedNodes: props.selectedNodes,
        selectNode: props.selectNode,
        unselectNode: props.unselectNode,
        data: props.data
    })

    return (
        <div style={{paddingTop: '5px', height: 'calc(100% - 85px)'}}>
            <div style={{overflow: 'hidden', position: 'relative', height: '100%', width: '100%'}} id={'select-box-wrapper'}>
                <div
                    ref={root} className={styles.canvasContainer}
                    id={'frame'}
                    onMouseDown={event => {
                        if (typeof event.target.className === 'object' && event.button === 2)
                            PlaceCanvasScroll({canvas: root.current, event: event})
                    }}>
                    <svg
                        onContextMenu={event => {
                            event.preventDefault()
                        }}
                        onMouseDown={(event) => callback(event)}
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
            </div>
        </div>
    )
}
Engine.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,

    scale: PropTypes.number,

    toBeLinked: PropTypes.object,
    setToBeLinked: PropTypes.func,

    selectedNodes: PropTypes.array,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func,

    dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),

    children: PropTypes.node
}
