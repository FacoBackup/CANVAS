import PropTypes from 'prop-types'
import NodeTemplate from "../props/NodeTemplate";
import styles from '../../styles/NodeOverview.module.css'
import {useRef, useState} from "react";
import {CirclePicker} from "react-color";
import Elements from "../../modules/navigation/side/modules/Elements";
import EditorWrapper from "../wrappers/EditorWrapper";
import BorderEditor from "./BorderEditor";
import DimensionPositionEditor from "./DimensionPositionEditor";

export default function FlowchartNodeEditor(props) {
    const handleChange = (name, value) => {
        const newNodes = [...props.data.nodes]
        const newNode = {...props.data.nodes[props.selectedNode.index]}

        newNode[name] = value
        newNodes[props.selectedNode.index] = newNode
        props.setData(({
            ...props.data,
            nodes: newNodes
        }))
    }

    return (
        <EditorWrapper open={props.selectedNode !== undefined && props.selectedNode.openEdit} handleClose={() => props.setSelectedNode(undefined)}>
            {props.selectedNode !== undefined ?
                <>
                    <BorderEditor handleChange={handleChange} node={props.selectedNode.node}/>
                    <DimensionPositionEditor handleChange={handleChange} node={props.selectedNode.node}/>
                </>
                : null}
        </EditorWrapper>
    )
}

FlowchartNodeEditor.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
}