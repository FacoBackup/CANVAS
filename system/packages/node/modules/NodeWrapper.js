import PropTypes from 'prop-types'
import ResizeIndicator from "./ResizeIndicator";
import styles from '../styles/Node.module.css'
import {EditRounded} from "@material-ui/icons";
import {useEffect, useRef, useState} from "react";
import ConnectionIndicator from "./ConnectionIndicator";
import useWrapper from "../hooks/useWrapper";

export default function NodeWrapper(props) {
    const ref = useRef()
    const {canRender, getPlacement, node, setNode} = useWrapper({
        nodeParam: props.node,
        reference: ref.current,
        selected: props.selected
    })
    return (
        <g ref={ref}>
            {props.children}
            <g
                display={props.selected !== undefined && props.selected.node.id === props.node.id ? undefined : 'none'}
                transform={`translate(${node.placement.x}, ${node.placement.y})`}
                overflow={'visible'} id={props.node.id + '-node-wrapper'}>

                <ConnectionIndicator
                    node={props.node}
                    viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                    placement={'e'} handleLink={props.handleLink}
                />
                <ConnectionIndicator
                    node={props.node}
                    viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                    placement={'w'} handleLink={props.handleLink}
                />
                <ConnectionIndicator
                    node={props.node}
                    viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                    placement={'s'} handleLink={props.handleLink}
                />
                <ConnectionIndicator
                    node={props.node}
                    viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                    placement={'n'}
                    handleLink={props.handleLink}
                />

                <rect stroke={'#555555'} strokeOpacity={.2} strokeWidth={2}
                      strokeDasharray={'4,4'}
                      x={0} y={0}
                      width={node.dimensions.width} height={node.dimensions.height} fill={'none'}/>

                <foreignObject overflow={'visible'} style={{
                    width: '40px',
                    height: '40px',
                    display: props.selected !== undefined && props.selected.node.id === props.node.id && props.selected.openEdit ? 'none' : undefined
                }} x={-1} y={-1}>
                    <button className={styles.editButton}
                            onClick={() => props.selectNode(props.node, true)}>
                        <EditRounded style={{fontSize: '1.3rem'}}/>
                    </button>
                </foreignObject>
                <ResizeIndicator
                    viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                    save={(dimensions) => {
                        const p = getPlacement()
                        props.dispatch({
                            type: props.actions.SET,
                            payload: {...props.node, placement: p, dimensions: dimensions}
                        })
                    }}
                    placement={'nw'} node={node} setNode={setNode} scale={props.scale}/>
                <ResizeIndicator
                    viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                    savePlacement={(event) => setNode({...node, placement: event})}
                    save={(dimensions) => {
                        const p = getPlacement()

                        props.dispatch({
                            type: props.actions.SET,
                            payload: {...props.node, placement: p, dimensions: dimensions}
                        })
                    }}
                    placement={'ne'} node={node} setNode={setNode} scale={props.scale}/>

                <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                                 savePlacement={(event) => setNode({...node, placement: event})}
                                 save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                                 placement={'sw'} node={node} setNode={setNode} scale={props.scale}/>
                <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                                 savePlacement={(event) => setNode({...node, placement: event})}
                                 save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                                 placement={'se'} node={node} setNode={setNode} scale={props.scale}/>

                <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                                 savePlacement={(event) => setNode({...node, placement: event})}
                                 save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                                 placement={'w'} node={node} setNode={setNode} scale={props.scale}/>
                <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                                 savePlacement={(event) => setNode({...node, placement: event})}
                                 save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                                 placement={'s'} node={node} setNode={setNode} scale={props.scale}/>
                <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                                 savePlacement={(event) => setNode({...node, placement: event})}
                                 save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                                 placement={'e'} node={node} setNode={setNode} scale={props.scale}/>
                <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                                 savePlacement={(event) => setNode({...node, placement: event})}
                                 save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                                 placement={'n'} node={node} setNode={setNode} scale={props.scale}/>
            </g>
        </g>
    )
}

NodeWrapper.propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func,
    actions: PropTypes.object,
    node: PropTypes.object,
    scale: PropTypes.number,
    selectNode: PropTypes.func,
    selected: PropTypes.object
}