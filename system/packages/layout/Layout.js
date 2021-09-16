import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/Layout.module.css";
import ChildrenSwitcher from "./modules/ChildrenSwitcher";

export default function Layout(props){
    return(
        <div className={styles.wrapper} onClick={props.onClick}>
            {props.header}
            <ChildrenSwitcher
                children={props.body}
                openChild={props.multiPage ? props.openPage : 0}
            />
        </div>
    )
}

Layout.propTypes={
    onClick: PropTypes.func,
    header: PropTypes.node,
    body: PropTypes.arrayOf(PropTypes.node),
    multiPage: PropTypes.bool,
    openPage: PropTypes.number
}