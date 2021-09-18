import PropTypes from 'prop-types'
import NodePropsTemplate from "../../../flowchart/templates/NodePropsTemplate";
import Resizer from "./Resizer";
import styles from '../../styles/Node.module.css'
import {EditRounded} from "@material-ui/icons";
import {useEffect, useState} from "react";

export default function NodeWrapper(props) {
    const [node, setNode] = useState(props.node)

    useEffect(() => {
        setNode(props.node)
    }, [props.node.dimensions])
    return (
        <g
            visibility={props.selected !== undefined && props.selected.node.id === props.node.id ? 'visible' : 'hidden'}
            opacity={props.selected !== undefined && props.selected.node.id === props.node.id ? '1' : '0'}
            style={{transition: 'opacity 150ms linear, visibility 150ms linear'}}
            overflow={'visible'}>

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
            <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                     savePlacement={(event) => props.dispatch({type: props.actions.PLACEMENT, payload: event})}
                     save={(dimensions, placement) => {
                                 props.dispatch({type: props.actions.PLACEMENT, payload: placement})
                                 props.dispatch({type: props.actions.DIMENSIONS, payload: dimensions})
                             }}
                     placement={'nw'} node={node} setNode={setNode} scale={props.scale}/>
            <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                     savePlacement={(event) => props.dispatch({type: props.actions.PLACEMENT, payload: event})}
                     save={(dimensions, placement) => {
                                 props.dispatch({type: props.actions.PLACEMENT, payload: placement})
                                 props.dispatch({type: props.actions.DIMENSIONS, payload: dimensions})
                             }}
                     placement={'ne'} node={node} setNode={setNode} scale={props.scale}/>

            <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                     savePlacement={(event) => props.dispatch({type: props.actions.PLACEMENT, payload: event})}
                     save={(dimensions, placement) => {
                                 props.dispatch({type: props.actions.PLACEMENT, payload: placement})
                                 props.dispatch({type: props.actions.DIMENSIONS, payload: dimensions})
                             }}
                     placement={'sw'} node={node} setNode={setNode} scale={props.scale}/>
            <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                     savePlacement={(event) => props.dispatch({type: props.actions.PLACEMENT, payload: event})}
                     save={(dimensions, placement) => {
                                 props.dispatch({type: props.actions.PLACEMENT, payload: placement})
                                 props.dispatch({type: props.actions.DIMENSIONS, payload: dimensions})
                             }}
                     placement={'se'} node={node} setNode={setNode} scale={props.scale}/>

            <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                     savePlacement={(event) => props.dispatch({type: props.actions.PLACEMENT, payload: event})}
                     save={(dimensions, placement) => {
                                 props.dispatch({type: props.actions.PLACEMENT, payload: placement})
                                 props.dispatch({type: props.actions.DIMENSIONS, payload: dimensions})
                             }}
                     placement={'w'} node={node} setNode={setNode} scale={props.scale}/>
            <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                     savePlacement={(event) => props.dispatch({type: props.actions.PLACEMENT, payload: event})}
                     save={(dimensions, placement) => {
                                 props.dispatch({type: props.actions.PLACEMENT, payload: placement})
                                 props.dispatch({type: props.actions.DIMENSIONS, payload: dimensions})
                             }}
                     placement={'s'} node={node} setNode={setNode} scale={props.scale}/>
            <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                     savePlacement={(event) => props.dispatch({type: props.actions.PLACEMENT, payload: event})}
                     save={(dimensions, placement) => {
                                 props.dispatch({type: props.actions.PLACEMENT, payload: placement})
                                 props.dispatch({type: props.actions.DIMENSIONS, payload: dimensions})
                             }}
                     placement={'e'} node={node} setNode={setNode} scale={props.scale}/>
            <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                     savePlacement={(event) => props.dispatch({type: props.actions.PLACEMENT, payload: event})}
                     save={(dimensions, placement) => {
                                 props.dispatch({type: props.actions.PLACEMENT, payload: placement})
                                 props.dispatch({type: props.actions.DIMENSIONS, payload: dimensions})
                             }}
                     placement={'n'} node={node} setNode={setNode} scale={props.scale}/>
        </g>
    )
}

NodeWrapper.propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.object,
    node: PropTypes.object,
    scale: PropTypes.number,
    selectNode: PropTypes.func,
    selected: PropTypes.object
}