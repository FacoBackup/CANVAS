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
import Overview from "../../misc/Overview";

export default function SideBar(props) {
    const [openButton, setOpenButton] = useState(0)
    const [nodeIndex, setNodeIndex] = useState(null)

    useEffect(() => {
        if (props.selectedNode !== undefined && props.selectedNode !== null) {
            setOpenButton(2)
            props.data.nodes.find((node, i) => {
                if (node.id === props.selectedNode.id)
                    setNodeIndex(i)
            })

        } else
            setOpenButton(1)
    }, [props.selectedNode])
    return (
        <Tabs
            buttons={[
                {
                    icon: <InsertDriveFileRounded/>,
                    content: null,
                    toolTip: 'Arquivo'
                },
                {
                    icon: <CategoryRounded/>,
                    content: (
                        <>
                            <Shapes
                                data={props.data} setData={props.setState}
                                scale={props.scale}
                            />
                            <Lines
                                data={props.data} setData={props.setState}
                            />

                            <Connections
                                data={props.data} setData={props.setState}
                            />
                        </>
                    ),
                    toolTip: 'Módulos e opções'
                },
                props.selectedNode !== undefined && props.selectedNode !== null && nodeIndex !== null ? {
                    icon: <EditRounded/>,
                    content: (
                        <Overview
                            data={props.data}
                            node={props.data.nodes[nodeIndex]}
                            setState={props.setState}
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
        />
    )
}
SideBar.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func,
    selectedNode: PropTypes.object
}