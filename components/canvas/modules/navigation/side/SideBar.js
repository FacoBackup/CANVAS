import styles from './styles/Menu.module.css'
import PropTypes from "prop-types";
import {useRef, useState} from "react";
import Shapes from "./modules/Shapes";
import Lines from "./modules/Lines";
import {EditRounded, FileCopyRounded, InsertDriveFileRounded, RemoveRounded, SettingsRounded} from "@material-ui/icons";
import Connections from "./modules/Connections";
import Tabs from "./modules/Tabs";

export default function SideBar(props) {
    const [openButton, setOpenButton] = useState(undefined)
    return (
        <Tabs buttons={[
            {
                icon: <InsertDriveFileRounded/>,
                disabled: false,
                content: (
                    <Shapes
                        data={props.data} setData={props.setState}
                        scale={props.scale}
                    />
                )
            },
            {
                icon: <EditRounded/>,
                disabled: true,
                content: null
            },
            {
                icon: <SettingsRounded/>,
                disabled: true,
                content: null
            }
        ]} openButton={openButton} setOpenButton={setOpenButton}/>
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