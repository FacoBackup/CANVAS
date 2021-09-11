import PropTypes from 'prop-types'
import NodePropsTemplate from "../../../flowchart/templates/NodePropsTemplate";
import ResizeIndicator from "./ResizeIndicator";
import styles from '../../styles/Node.module.css'
import {EditRounded} from "@material-ui/icons";

export default function SelectedWrapper(props) {

    return (
        <svg width={props.node.dimensions.width} height={props.node.dimensions.height} x={0} y={0}
             visibility={props.selected === props.node.id ? 'visible' : 'hidden'}
             opacity={props.selected === props.node.id ? '1' : '0'}
             style={{transition: 'opacity 150ms linear, visibility 150ms linear'}}
             overflow={'visible'}>

            <rect stroke={'#e0e0e0'} strokeWidth={2}
                  // strokeDasharray={'3,3'}
                  x={0} y={0}
                  width={props.node.dimensions.width} height={props.node.dimensions.height} fill={'none'}/>

            <foreignObject overflow={'visible'} style={{width: '40px', height: '40px'}} x={-1} y={-1}>
                <button className={styles.editButton} style={{borderRadius: props.node.styling.borderRadius + 'px 0 5px 0'}} onClick={() => props.setSelected(props.node, true)}>
                    <EditRounded style={{fontSize: '1.3rem'}}/>
                </button>
            </foreignObject>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                             placement={'nw'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                             placement={'ne'} node={props.node} setNode={props.setNode} scale={props.scale}/>

            <ResizeIndicator viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                             placement={'sw'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                             placement={'se'} node={props.node} setNode={props.setNode} scale={props.scale}/>

            <ResizeIndicator viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                             placement={'w'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                             placement={'s'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                             placement={'e'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width, y: props.node.dimensions.height}}
                             placement={'n'} node={props.node} setNode={props.setNode} scale={props.scale}/>
        </svg>
    )
}

SelectedWrapper.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}