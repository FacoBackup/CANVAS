import PropTypes from 'prop-types'
import EditorWrapper from "../../shared/templates/node/EditorWrapper";
import BorderEditor from "../../shared/templates/editor/BorderEditor";
import DimensionPositionEditor from "../../shared/templates/editor/DimensionPositionEditor";
import {useMemo} from "react";

export default function FlowchartNodeEditor(props) {
    const openEdit = useMemo(() => {
        return props.selectedNodes.find(e => e.openEdit)
    }, [props.selectedNodes])
    const handleChange = (name, value) => {
        const newNodes = [...props.data.nodes]
        const newNode = {...props.data.nodes[openEdit.index]}

        newNode[name] = value
        newNodes[openEdit.index] = newNode
        props.setData(({
            ...props.data,
            nodes: newNodes
        }))
    }

    return (
        <EditorWrapper open={openEdit !== undefined && openEdit.openEdit} handleClose={() => props.unselectNode(openEdit.node.id)}>
            {openEdit !== undefined ?
                <>
                    <BorderEditor handleChange={handleChange} node={props.data.nodes[openEdit.index]}/>
                    <DimensionPositionEditor handleChange={handleChange} node={props.data.nodes[openEdit.index]}/>
                </>
                : null}
        </EditorWrapper>
    )
}

FlowchartNodeEditor.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    selectedNodes: PropTypes.array,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func
}