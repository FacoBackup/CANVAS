import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import styles from '../styles/Header.module.css'
import CanvasContext from "../../../misc/packages/CanvasContext";
import NodeContext from "../../../misc/packages/NodeContext";

export default function Dropdown(props) {
    const ref = useRef()
    const dropdownRef = useRef()

    const handleClose = (event) => {
        props.handleClose(null)
    }


    useEffect(() => {
        document.addEventListener('mousedown', handleClose)
        return () => {
            document.removeEventListener('mousedown', handleClose)
        }
    }, [props.open])

    return (
        <div ref={dropdownRef}>
            <button
                onClick={() => {
                    props.handleOpen()
                }} className={styles.buttonContainer}>
                {props.label}
            </button>
            <div ref={ref} className={styles.dropdownContent} style={{
                display: props.open ? undefined : 'none'
            }}>
                {props.buttons.map((b, i) => (
                    <div style={{width: '100%', borderTop: i > 0 ? '#e0e0e0 1px solid' : "unset"}}>
                        {b.children.map(c => (
                            <button
                                className={styles.dropdownButton}
                                style={{paddingLeft: c.icon === undefined ? '32px' : "4px"}}
                                onClick={() => b.onClick()}
                            >
                                <div style={{
                                    display: c.icon === undefined ? 'none' : 'flex',
                                    width: '28px',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {c.icon}
                                </div>
                                {c.label}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
Dropdown.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.shape(
            {
                label: PropTypes.string,
                onClick: PropTypes.func,
                icon: PropTypes.object
            }
        ))
    })),
    label: PropTypes.string,
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func
}