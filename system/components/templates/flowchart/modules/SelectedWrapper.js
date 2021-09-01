import PropTypes from 'prop-types'
import NodePropsTemplate from "../../props/NodePropsTemplate";
import ResizeIndicator from "./ResizeIndicator";

export default function SelectedWrapper(props) {

    return (
        <svg width={props.node.dimensions.width + 20} height={props.node.dimensions.height + 20} x={-10} y={-10}
             visibility={props.selected === props.node.id ? 'visible' : 'hidden'}
             opacity={props.selected === props.node.id ? '1' : '0'}
             style={{transition: 'opacity 150ms linear, visibility 150ms linear'}}
             overflow={'visible'}>

            <rect stroke={'green'} x={0} y={0} width={props.node.dimensions.width + 20} height={props.node.dimensions.height + 20} fill={'none'}
                  strokeDasharray={'3,3'}/>

            <ResizeIndicator viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                             placement={'nw'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                             placement={'ne'} node={props.node} setNode={props.setNode} scale={props.scale}/>

            <ResizeIndicator viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                             placement={'sw'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                             placement={'se'} node={props.node} setNode={props.setNode} scale={props.scale}/>

            <ResizeIndicator viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                             placement={'w'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                             placement={'s'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                             placement={'e'} node={props.node} setNode={props.setNode} scale={props.scale}/>
            <ResizeIndicator viewBox={{x: props.node.dimensions.width + 20, y: props.node.dimensions.height + 20}}
                             placement={'n'} node={props.node} setNode={props.setNode} scale={props.scale}/>
        </svg>
    )
}

SelectedWrapper.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}