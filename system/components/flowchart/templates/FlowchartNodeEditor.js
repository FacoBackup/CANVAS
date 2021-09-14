import PropTypes from 'prop-types'
import EditorWrapper from "../../shared/templates/node/EditorWrapper";
import BorderEditor from "../../shared/templates/editor/BorderEditor";
import DimensionPositionEditor from "../../shared/templates/editor/DimensionPositionEditor";
import {useMemo} from "react";
import useNode from "../../shared/hooks/useNode";

export default function FlowchartNodeEditor(props) {
    const openEdit = useMemo(() => {
        return props.selectedNodes.find(e => e.openEdit)
    }, [props.selectedNodes])

    const {ACTIONS, nodeState, dispatch} = useNode({data: props.data, setData: props.setData, node: openEdit?.node})

    return (
        <EditorWrapper open={openEdit !== undefined && openEdit.openEdit}
                       handleClose={() => props.unselectNode(openEdit.node.id)}>
            {openEdit !== undefined ?
                <>
                    <BorderEditor dispatch={dispatch} actions={ACTIONS} node={nodeState}/>
                    <DimensionPositionEditor dispatch={dispatch} actions={ACTIONS}
                                             node={nodeState}/>
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