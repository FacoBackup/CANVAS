import PropTypes from 'prop-types'
import NodePropsTemplate from "../../../flowchart/templates/NodePropsTemplate";
import ResizeIndicator from "./ResizeIndicator";
import styles from '../../styles/Node.module.css'
import {EditRounded} from "@material-ui/icons";
import {useEffect, useState} from "react";

export default function SelectedWrapper(props) {
    const [node, setNode] = useState(props.node)

    useEffect(() => {
        setNode(props.node)
    }, [props.node.dimensions])
    return (
        <g
             visibility={props.selected === props.node.id ? 'visible' : 'hidden'}
             opacity={props.selected === props.node.id ? '1' : '0'}
             style={{transition: 'opacity 150ms linear, visibility 150ms linear'}}
             overflow={'visible'}>

            <rect stroke={'#555555'} strokeOpacity={.2} strokeWidth={2}
                strokeDasharray={'4,4'}
                  x={0} y={0}
                  width={node.dimensions.width} height={node.dimensions.height} fill={'none'}/>

            <foreignObject overflow={'visible'} style={{width: '40px', height: '40px'}} x={-1} y={-1}>
                <button className={styles.editButton}
                        style={{borderRadius: props.node.styling.borderRadius + 'px 0 5px 0'}}
                        onClick={() => props.setSelected(props.node, true)}>
                    <EditRounded style={{fontSize: '1.3rem'}}/>
                </button>
            </foreignObject>
            <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                             savePlacement={(event) => props.setNode({...props.node, placement: event})}
                             save={(dim, placement) => props.setNode({...props.node, dimensions: dim, placement: placement})}
                             placement={'nw'} node={node} setNode={setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                             savePlacement={(event) => props.setNode({...props.node, placement: event})}
                             save={(dim, placement) => props.setNode({...props.node, dimensions: dim, placement: placement})}
                             placement={'ne'} node={node} setNode={setNode} scale={props.scale}/>

            <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                             savePlacement={(event) => props.setNode({...props.node, placement: event})}
                             save={(dim, placement) => props.setNode({...props.node, dimensions: dim, placement: placement})}
                             placement={'sw'} node={node} setNode={setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                             savePlacement={(event) => props.setNode({...props.node, placement: event})}
                             save={(dim, placement) => props.setNode({...props.node, dimensions: dim, placement: placement})}
                             placement={'se'} node={node} setNode={setNode} scale={props.scale}/>

            <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                             savePlacement={(event) => props.setNode({...props.node, placement: event})}
                             save={(dim, placement) => props.setNode({...props.node, dimensions: dim, placement: placement})}
                             placement={'w'} node={node} setNode={setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                             savePlacement={(event) => props.setNode({...props.node, placement: event})}
                             save={(dim, placement) => props.setNode({...props.node, dimensions: dim, placement: placement})}
                             placement={'s'} node={node} setNode={setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                             savePlacement={(event) => props.setNode({...props.node, placement: event})}
                             save={(dim, placement) => props.setNode({...props.node, dimensions: dim, placement: placement})}
                             placement={'e'} node={node} setNode={setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: node.dimensions.width, y: node.dimensions.height}}
                             savePlacement={(event) => props.setNode({...props.node, placement: event})}
                             save={(dim, placement) => props.setNode({...props.node, dimensions: dim, placement: placement})}
                             placement={'n'} node={node} setNode={setNode} scale={props.scale}/>
        </g>
    )
}

SelectedWrapper.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}