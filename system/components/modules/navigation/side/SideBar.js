import styles from './styles/Menu.module.css'
import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import Shapes from "./modules/Shapes";
import Lines from "./modules/Lines";
import {
    CategoryRounded,
    EditRounded, ExtensionRounded,
    FileCopyRounded,
    FolderRounded,
    InsertDriveFileRounded,
    RemoveRounded,
    SettingsRounded
} from "@material-ui/icons";
import Connections from "./modules/Connections";
import Tabs from "./modules/Tabs";
import Overview from "../../../canvas/modules/misc/Overview";
import FileOptions from "./modules/FileOptions";

export default function SideBar(props) {
    const [openButton, setOpenButton] = useState(0)
    const [nodeIndex, setNodeIndex] = useState(null)
    const [toBePushedTab,setToBePushedTab] = useState(null)
    useEffect(() => {
        if (props.selectedNode !== undefined && props.selectedNode !== null) {
            setToBePushedTab(2)
            props.data.pages[props.defaultPage].nodes.find((node, i) => {
                if (node.id === props.selectedNode.id)
                    setNodeIndex(i)
            })

        } else
            setOpenButton(1)
    }, [props.selectedNode])

    const setData = (event) => {
        let newPages = [...props.data.pages]
        newPages[props.defaultPage] = event
        props.setData({...props.data, pages: newPages})
    }
    return (
        <Tabs
            buttons={[
                {
                    icon: <InsertDriveFileRounded/>,
                    content: <FileOptions setData={props.setData} data={props.data} handlePrint={props.handlePrint}/>,
                    label: 'Arquivo'
                },
                {
                    icon: <CategoryRounded/>,
                    label: 'Dados e configurações',
                    content: (
                        <>
                            <Shapes
                                data={props.data.pages[props.defaultPage]} setData={setData}
                                scale={props.scale}
                            />
                            <Lines
                                data={props.data}
                                setData={props.setData}
                            />

                            <Connections
                                data={props.data} setData={props.setData}
                            />
                        </>
                    ),
                    toolTip: 'Módulos e opções'
                },
                props.selectedNode !== undefined && props.selectedNode !== null && nodeIndex !== null ? {
                    icon: <EditRounded/>,
                    label: 'Editar módulo',
                    content: (
                        <Overview
                            data={props.data.pages[props.defaultPage]}
                            node={props.data.pages[props.defaultPage].nodes[nodeIndex]}
                            setState={setData}
                            nodeIndex={nodeIndex}
                        />
                    ),
                    toolTip: 'Editar módulo'
                } : null,
                // {
                //     icon: <FolderRounded/>,
                //     disabled: true,
                //     content: null,
                //     toolTip: 'Estrutura'
                // },
                // {
                //     icon: <SettingsRounded/>,
                //     disabled: true,
                //     content: null,
                //     toolTip: 'Configurações do canvas'
                // },
            ]}
            openButton={openButton}
            setOpenButton={setOpenButton}
            toBePushedTab={toBePushedTab}
            setToBePushedTab={setToBePushedTab}
        />
    )
}
SideBar.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    defaultPage: PropTypes.number,
    selectedNode: PropTypes.object,
    handlePrint: PropTypes.func
}