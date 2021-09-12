import PropTypes from 'prop-types'
import EditorWrapper from "../../shared/templates/tools/EditorWrapper";
import DimensionPositionEditor from "../../shared/templates/editor/DimensionPositionEditor";
import BorderEditor from "../../shared/templates/editor/BorderEditor";
import NodeDatasetEditor from "./NodeDatasetEditor";
import HorizontalTabs from "../../shared/templates/tools/HorizontalTabs";
import {useState} from "react";
import {EditAttributesRounded, FormatPaintRounded, PlaceRounded} from "@material-ui/icons";

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

    const [open, setOpen] = useState(0)
    return (
        <EditorWrapper open={props.selectedNode !== undefined && props.selectedNode.openEdit }
                       handleClose={() => props.setSelectedNode(undefined)}>
            {props.selectedNode !== undefined?
                <HorizontalTabs setOpenButton={setOpen} buttons={[
                    {
                        icon: <EditAttributesRounded/>,
                        label: 'Dados',
                        content: (
                            <>
                                <NodeDatasetEditor handleChange={handleChange} node={props.node}/>
                            </>
                        )
                    },
                    {
                        icon: <FormatPaintRounded/>,
                        label: 'Visual',
                        content: (
                            <>
                                <BorderEditor handleChange={handleChange} node={props.node}/>
                            </>
                        )
                    },
                    {
                        icon: <PlaceRounded/>,
                        label: 'Posição e dimensões',
                        content: (
                            <DimensionPositionEditor handleChange={handleChange} node={props.node}/>
                        )
                    }
                ]} openButton={open}/>
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