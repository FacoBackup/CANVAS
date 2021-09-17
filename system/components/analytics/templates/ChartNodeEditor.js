import PropTypes from 'prop-types'
import DimensionPositionEditor from "../../shared/templates/editor/DimensionPositionEditor";
import BorderEditor from "../../shared/templates/editor/BorderEditor";
import NodeDatasetEditor from "./NodeDatasetEditor";
import HorizontalTabs from "../../../packages/tabs/HorizontalTabs";
import {useEffect, useMemo, useReducer, useState} from "react";
import {EditAttributesRounded, FormatPaintRounded, PlaceRounded, StorageRounded} from "@material-ui/icons";
import useNode from "../../shared/hooks/useNode";
import VerticalTabs from "../../../packages/tabs/VerticalTabs";

export default function ChartNodeEditor(props) {
    const openEdit = useMemo(() => {
        return props.selectedNodes.find(e => e.openEdit)
    }, [props.selectedNodes])

    const {ACTIONS, nodeState, dispatch} = useNode({
        data: props.data,
        setData: props.setData,
        node: openEdit ? props.data.nodes[openEdit.index] : undefined
    })

    const [open, setOpen] = useState(0)
    const [extended, setExtended] = useState(false)

    useEffect(() => {
        if(openEdit === undefined){
            setExtended(false)
        }
        else
            setExtended(true)
    }, [props.selectedNodes])
    return (
        <VerticalTabs
            open={extended}
            canExtend={openEdit !== undefined}
            openButton={open}
            contentOrientation={'left'}
            setOpenButton={setOpen}
            buttons={[
                {
                    icon: <StorageRounded/>,
                    label: 'Dados',
                    content: (
                        openEdit === undefined ? null :
                            <NodeDatasetEditor dispatch={dispatch} actions={ACTIONS} node={nodeState}/>
                    ),
                    disabled: openEdit === undefined
                },
                {
                    icon: <FormatPaintRounded/>,
                    label: 'Visual',
                    content: (
                        openEdit === undefined ? null :
                            <BorderEditor dispatch={dispatch} actions={ACTIONS} node={nodeState}/>
                    ),
                    disabled: openEdit === undefined
                },
                {
                    icon: <PlaceRounded/>,
                    label: 'Posição e dimensões',
                    content: (
                        openEdit === undefined ? null : <DimensionPositionEditor dispatch={dispatch} actions={ACTIONS}
                                                                                 node={nodeState}/>
                    ),
                    disabled: openEdit === undefined
                }
            ]}
            setOpen={(e) => setExtended(e)}
        />
    )
}

ChartNodeEditor.propTypes = {
    selectedNodes: PropTypes.array,
    unselectNode: PropTypes.func,


    setData: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
}