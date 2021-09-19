import PropTypes from 'prop-types'
import Resizer from "./Resizer";
import styles from '../../styles/Node.module.css'
import {EditRounded} from "@material-ui/icons";
import {useCallback, useEffect, useMemo, useState} from "react";

export default function NodeWrapper(props) {
    const [node, setNode] = useState(props.node)

    useEffect(() => {
        setNode(props.node)
    }, [props.selected])

    const getPlacement = () => {
        const wrapper = document.getElementById(props.node.id + '-node-wrapper')
        let parsedPlacement = wrapper.getAttribute('transform').replace('translate(', '').replace(')', '')
        parsedPlacement = parsedPlacement.split(', ')
        return {
            x: parseInt(parsedPlacement[0]),
            y: parseInt(parsedPlacement[1]),
        }
    }

    return (
        <g>
            {props.children}
            <g
                display={props.selected !== undefined && props.selected.node.id === props.node.id ? undefined : 'none'}
                transform={`translate(${node.placement.x}, ${node.placement.y})`}
                overflow={'visible'} id={props.node.id + '-node-wrapper'}>

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
                         save={(dimensions) => {

                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                         placement={'nw'} node={node} setNode={setNode} scale={props.scale}/>
                <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                         savePlacement={(event) => setNode({...node, placement: event})}
                         save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                         placement={'ne'} node={node} setNode={setNode} scale={props.scale}/>

                <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                         savePlacement={(event) => setNode({...node, placement: event})}
                         save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                         placement={'sw'} node={node} setNode={setNode} scale={props.scale}/>
                <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                         savePlacement={(event) => setNode({...node, placement: event})}
                         save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                         placement={'se'} node={node} setNode={setNode} scale={props.scale}/>

                <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                         savePlacement={(event) => setNode({...node, placement: event})}
                         save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                         placement={'w'} node={node} setNode={setNode} scale={props.scale}/>
                <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                         savePlacement={(event) => setNode({...node, placement: event})}
                         save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                         placement={'s'} node={node} setNode={setNode} scale={props.scale}/>
                <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                         savePlacement={(event) => setNode({...node, placement: event})}
                         save={(dimensions) => {
                             const p = getPlacement()

                             props.dispatch({
                                 type: props.actions.SET,
                                 payload: {...props.node, placement: p, dimensions: dimensions}
                             })
                         }}
                         placement={'e'} node={node} setNode={setNode} scale={props.scale}/>
                <Resizer viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
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