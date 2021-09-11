import styles from "../../styles/Options.module.css";
import PropTypes from "prop-types";
import React, {useRef, useState} from "react";
import Link from 'next/link'

export default function FileOptions(props) {
    const uploadRef = useRef()
    const [open, setOpen] = useState(null)
    return (
        <div className={styles.fileOptionsWrapper}>
            <Link href={'/'}>
                <button className={styles.homeButton}>
                    <img rel='icon' src={'/flow.svg'} style={{width: '27px', height: '30px', overflow: 'visible'}}
                         alt={'logo'}/>
                </button>
            </Link>

            <input
                className={styles.textField}
                value={props.metadata.subject}
                onChange={event => props.setMetadata({...props.metadata, subject: event.target.value})}
            />

            {props.children}
        </div>
    )
}

FileOptions.propTypes = {
    metadata: PropTypes.object,
    setMetadata: PropTypes.func,
    children: PropTypes.node
}