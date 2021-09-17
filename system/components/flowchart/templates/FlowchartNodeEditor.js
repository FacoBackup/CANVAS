import PropTypes from 'prop-types'
import BorderEditor from "../../shared/templates/editor/BorderEditor";
import DimensionPositionEditor from "../../shared/templates/editor/DimensionPositionEditor";
import {useEffect, useMemo, useState} from "react";
import useNode from "../../shared/hooks/useNode";
import VerticalTabs from "../../../packages/tabs/VerticalTabs";
import {FormatPaintRounded, PlaceRounded, StorageRounded} from "@material-ui/icons";
import NodeDatasetEditor from "../../analytics/templates/NodeDatasetEditor";

export default function FlowchartNodeEditor(props) {
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

FlowchartNodeEditor.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    selectedNodes: PropTypes.array,
    selectNode: PropTypes.func,
    unselectNode: PropTypes.func
}