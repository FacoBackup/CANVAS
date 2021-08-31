import styles from "./styles/Pages.module.css";
import PropTypes from "prop-types";
import {CloseRounded} from "@material-ui/icons";
import {useState} from "react";

export default function PageField(props) {

    return (
        <div className={styles.pageButtonsContainer}>
            <input value={props.page.title} onChange={event => props.renamePage(event.target.value)}
                   onBlur={() => props.handleClose()} className={styles.pageInput}
                   style={{
                       display: !props.open ? 'none' : undefined
                   }}/>
            <button
                className={styles.pageButton}
                style={{
                    background: props.page.default ? 'white' : '#FBFBFC',
                    display: props.open ? 'none' : undefined,
                    borderBottom: props.page.default ? '#0095ff 2px solid' : 'transparent 2px solid'
                }}
                onClick={() => {
                    props.handleClose()
                    if (!props.page.default)
                        props.setAsDefault()
                }} onDoubleClick={() => props.handleOpen()}>
                {props.page.title}
            </button>

            <button
                className={styles.removePageButton}
                style={{display: props.length <= 1 || props.open ? 'none' : undefined}}
                onClick={() => {
                    props.removePage()
                }}
            >
                <CloseRounded style={{fontSize: '1.2rem'}}/>
            </button>
        </div>
    )
}
PageField.propTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    index: PropTypes.number,


    length: PropTypes.number,
    page: PropTypes.object,
    setAsDefault: PropTypes.func,
    removePage: PropTypes.func,
    renamePage: PropTypes.func
}