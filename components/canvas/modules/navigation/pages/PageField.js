import styles from "./styles/Pages.module.css";
import PropTypes from "prop-types";
import {CloseRounded} from "@material-ui/icons";
import {useState} from "react";

export default function PageField(props) {
    const [asInput, setAsInput] = useState(false)
    return (
        <div className={styles.pageButtonsContainer}>
            <input value={props.page.title} onChange={event => props.renamePage(event.target.value)}
                   onBlur={() => setAsInput(false)} className={styles.pageInput}
                   style={{display: !asInput ? 'none' : undefined}}/>
            <button
                className={styles.pageButton}
                style={{background: props.page.default ? 'white' : '#f4f5fa', display: asInput ? 'none' : undefined}}
                onClick={() => {
                    if (!props.page.default)
                        props.setAsDefault()
                }} onDoubleClick={() => setAsInput(true)}>
                {props.page.title}
            </button>

            <button
                className={styles.removePageButton}
                style={{display: props.length <= 1 || asInput ? 'none' : undefined}}
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
    length: PropTypes.number,
    page: PropTypes.object,
    setAsDefault: PropTypes.func,
    removePage: PropTypes.func,
    renamePage: PropTypes.func
}