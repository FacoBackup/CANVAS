import styles from "./styles/Header.module.css";
import PropTypes from "prop-types";
import React from "react";
import Link from 'next/link'

export default function Header(props) {
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

Header.propTypes = {
    metadata: PropTypes.object,
    setMetadata: PropTypes.func,
    children: PropTypes.node
}