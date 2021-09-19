import PropTypes from 'prop-types'
import DimensionPositionEditor from "../../shared/templates/editor/DimensionPositionEditor";
import BorderEditor from "../../shared/templates/editor/BorderEditor";
import NodeDatasetEditor from "./NodeDatasetEditor";
import {useEffect, useMemo, useState} from "react";
import {FormatPaintRounded, PlaceRounded, StorageRounded} from "@material-ui/icons";
import useNode from "../../shared/hooks/useNode";
import VerticalTabs from "../../../packages/tabs/VerticalTabs";

export default function ChartNodeEditor(props) {
    const openEdit = useMemo(() => {
        return props.selectedNodes.find(e => e.openEdit)
    }, [props.selectedNodes])

    const {ACTIONS,  dispatch} = useNode({
        openPage: props.openPage,
        dispatchPage: props.dispatchPage,
        actions: props.actions,
        node: openEdit ? props.openPage.nodes[openEdit.index] : undefined
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
            tabsKey={'chart-node-editor'}
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
                            <NodeDatasetEditor dispatch={dispatch} actions={ACTIONS} node={props.openPage.nodes[openEdit.index]}/>
                    ),
                    disabled: openEdit === undefined
                },
                {
                    icon: <FormatPaintRounded/>,
                    label: 'Visual',
                    content: (
                        openEdit === undefined ? null :
                            <BorderEditor dispatch={dispatch} actions={ACTIONS} node={props.openPage.nodes[openEdit.index]}/>
                    ),
                    disabled: openEdit === undefined
                },
                {
                    icon: <PlaceRounded/>,
                    label: 'Posição e dimensões',
                    content: (
                        openEdit === undefined ? null : <DimensionPositionEditor dispatch={dispatch} actions={ACTIONS}
                                                                                 node={props.openPage.nodes[openEdit.index]}/>
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


    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    handleClose: PropTypes.func,
}