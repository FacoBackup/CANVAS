import PropTypes from 'prop-types'
import EditorWrapper from "../wrappers/EditorWrapper";
import DimensionPositionEditor from "./DimensionPositionEditor";
import BorderEditor from "./BorderEditor";
import NodeDatasetEditor from "./NodeDatasetEditor";

export default function ChartNodeEditor(props) {
    const handleChange = (name, value) => {
        const newNodes = [...props.data.nodes]
        const newNode = {...props.node}

        newNode[name] = value
        newNodes[props.index] = newNode
        props.setData(({
            ...props.data,
            nodes: newNodes
        }))
    }
    return (
        <EditorWrapper open={props.selectedNode !== undefined && props.selectedNode.openEdit}
                       handleClose={() => props.setSelectedNode(undefined)}>
            {props.selectedNode !== undefined ?
                <>
                    <BorderEditor handleChange={handleChange} node={props.node}/>
                    <DimensionPositionEditor handleChange={handleChange} node={props.node}/>
                    <NodeDatasetEditor handleChange={handleChange} node={props.node}/>
                </>
                : null}
        </EditorWrapper>
    )
}

ChartNodeEditor.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
    index: PropTypes.number,
    node: PropTypes.object
}