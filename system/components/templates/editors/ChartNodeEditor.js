import PropTypes from 'prop-types'
import NodeTemplate from "../props/NodeTemplate";
import styles from '../../styles/NodeOverview.module.css'
import {useRef, useState} from "react";
import {CirclePicker} from "react-color";
import Elements from "../../modules/navigation/side/modules/Elements";
import EditorWrapper from "../wrappers/EditorWrapper";
import DimensionPositionEditor from "./DimensionPositionEditor";
import BorderEditor from "./BorderEditor";

export default function ChartNodeEditor(props) {
    const handleChange = (name, value) => {
        const newNodes = [...props.data.nodes]
        const newNode = {...props.data.nodes[props.selectedNode.index]}

        newNode[name] = value
        newNodes[props.selectedNode.index] = newNode
        console.log(props.selectedNode.index)
        props.setData(({
            ...props.data,
            nodes: newNodes
        }))
    }

    return (
        <EditorWrapper open={props.selectedNode !== undefined && props.selectedNode.openEdit} handleClose={() => props.setSelectedNode(undefined)}>
            {props.selectedNode !== undefined ?
                <>
                    <BorderEditor handleChange={handleChange} node={props.data.nodes[props.selectedNode.index]}/>
                    <DimensionPositionEditor handleChange={handleChange} node={props.data.nodes[props.selectedNode.index]}/>
                </>
                : null}
        </EditorWrapper>
    )
}

ChartNodeEditor.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
}