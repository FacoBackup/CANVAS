import PropTypes from 'prop-types'
import EditorWrapper from "../../shared/templates/node/EditorWrapper";
import DimensionPositionEditor from "../../shared/templates/editor/DimensionPositionEditor";
import BorderEditor from "../../shared/templates/editor/BorderEditor";
import NodeDatasetEditor from "./NodeDatasetEditor";
import HorizontalTabs from "../../shared/templates/tools/HorizontalTabs";
import {useMemo, useReducer, useState} from "react";
import {EditAttributesRounded, FormatPaintRounded, PlaceRounded, StorageRounded} from "@material-ui/icons";
import useNode from "../../shared/hooks/useNode";

export default function ChartNodeEditor(props) {
    const openEdit = useMemo(() => {
        return props.selectedNodes.find(e => e.openEdit)
    }, [props.selectedNodes])

    const {ACTIONS, nodeState, dispatch} = useNode({data: props.data, setData: props.setData, node: openEdit?.node})

    const [open, setOpen] = useState(0)
    return (
        <EditorWrapper open={openEdit !== undefined}
                       handleClose={() => props.unselectNode(openEdit?.node.id)}>
            {openEdit !== undefined ?
                <HorizontalTabs setOpenButton={setOpen} buttons={[
                    {
                        icon: <StorageRounded/>,
                        label: 'Dados',
                        content: (
                            <NodeDatasetEditor dispatch={dispatch} actions={ACTIONS} node={nodeState}/>
                        )
                    },
                    {
                        icon: <FormatPaintRounded/>,
                        label: 'Visual',
                        content: (
                            <BorderEditor dispatch={dispatch} actions={ACTIONS} node={nodeState}/>
                        )
                    },
                    {
                        icon: <PlaceRounded/>,
                        label: 'Posição e dimensões',
                        content: (
                            <DimensionPositionEditor dispatch={dispatch} actions={ACTIONS}
                                                     node={nodeState}/>
                        )
                    }
                ]} openButton={open}/>
                : null}
        </EditorWrapper>
    )
}

ChartNodeEditor.propTypes = {
    selectedNodes: PropTypes.array,
    unselectNode: PropTypes.func,


    setData: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
}