import PropTypes from 'prop-types'
import EditorWrapper from "../../shared/templates/node/EditorWrapper";
import DimensionPositionEditor from "../../shared/templates/editor/DimensionPositionEditor";
import BorderEditor from "../../shared/templates/editor/BorderEditor";
import NodeDatasetEditor from "./NodeDatasetEditor";
import HorizontalTabs from "../../shared/templates/tools/HorizontalTabs";
import {useMemo, useState} from "react";
import {EditAttributesRounded, FormatPaintRounded, PlaceRounded} from "@material-ui/icons";

export default function ChartNodeEditor(props) {
    const openEdit = useMemo(() => {
        return props.selectedNodes.find(e => e.openEdit)
    }, [props.selectedNodes])
    const handleChange = (name, value) => {
        const newNodes = [...props.data.nodes]
        const newNode = {...openEdit.node}

        newNode[name] = value
        newNodes[openEdit.index] = newNode
        props.setData(({
            ...props.data,
            nodes: newNodes
        }))
    }

    const [open, setOpen] = useState(0)
    return (
        <EditorWrapper open={openEdit !== undefined}
                       handleClose={() => props.unselectNode(openEdit?.node.id)}>
            {openEdit !== undefined?
                <HorizontalTabs setOpenButton={setOpen} buttons={[
                    {
                        icon: <EditAttributesRounded/>,
                        label: 'Dados',
                        content: (
                            <>
                                <NodeDatasetEditor handleChange={handleChange} node={props.data.nodes[openEdit.index]}/>
                            </>
                        )
                    },
                    {
                        icon: <FormatPaintRounded/>,
                        label: 'Visual',
                        content: (
                            <>
                                <BorderEditor handleChange={handleChange} node={props.data.nodes[openEdit.index]}/>
                            </>
                        )
                    },
                    {
                        icon: <PlaceRounded/>,
                        label: 'Posição e dimensões',
                        content: (
                            <DimensionPositionEditor handleChange={handleChange} node={props.data.nodes[openEdit.index]}/>
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