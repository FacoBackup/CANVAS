import styles from './styles/Menu.module.css'
import PropTypes from "prop-types";
import {useRef, useState} from "react";
import Shapes from "./modules/Shapes";
import Lines from "./modules/Lines";
import {RemoveRounded} from "@material-ui/icons";
import Connections from "./modules/Connections";

export default function SideBar(props) {
    const ref = useRef()
    return (
        <div className={styles.container} ref={ref} style={{

        }}>
            <div className={styles.header}>
                Formas
            </div>

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
        </div>
    )
}
SideBar.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func
}