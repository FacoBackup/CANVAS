import styles from './styles/Menu.module.css'
import PropTypes from "prop-types";
import {useRef, useState} from "react";
import Shapes from "./modules/Shapes";
import Lines from "./modules/Lines";
import {
    EditRounded, ExtensionRounded,
    FileCopyRounded,
    FolderRounded,
    InsertDriveFileRounded,
    RemoveRounded,
    SettingsRounded
} from "@material-ui/icons";
import Connections from "./modules/Connections";
import Tabs from "./modules/Tabs";

export default function SideBar(props) {
    const [openButton, setOpenButton] = useState(0)
    return (
        <Tabs
            buttons={[
                {
                    icon: <InsertDriveFileRounded/>,
                    disabled: false,
                    content: (
                        <Shapes
                            data={props.data} setData={props.setState}
                            scale={props.scale}
                        />
                    ),
                    toolTip: 'Arquivo'
                },
                {
                    icon: <ExtensionRounded/>,
                    disabled: false,
                    content: (
                        null
                    ),
                    toolTip: 'Módulos e opções'
                },
                {
                    icon: <EditRounded/>,
                    disabled: true,
                    content: null,
                    toolTip: 'Editar módulo'
                },
                {
                    icon: <FolderRounded/>,
                    disabled: true,
                    content: null,
                    toolTip: 'Estrutura'
                },
                {
                    icon: <SettingsRounded/>,
                    disabled: true,
                    content: null,
                    toolTip: 'Configurações do canvas'
                },
            ]}
            openButton={openButton}
            setOpenButton={setOpenButton}
        />
        // <div className={styles.container} ref={ref}>
        //     <div className={styles.header}>
        //         Formas
        //     </div>
        //     {props.data === undefined ?
        //         null
        //         :
        //         <>

        //
        //             <Lines
        //                 data={props.data} setData={props.setState}
        //             />
        //
        //             <Connections
        //                 data={props.data} setData={props.setState}
        //             />
        //         </>
        //     }
        // </div>
    )
}
SideBar.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func
}