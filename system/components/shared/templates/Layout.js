import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Canvas.module.css";
import ChildrenSwitcher from "../../analytics/modules/ChildrenSwitcher";
import DatasetManagement from "../../analytics/modules/dataset/DatasetManagement";
import ChartContent from "../../analytics/templates/ChartContent";

export default function Layout(props){
    const body = props.multiPage ? React.Children.toArray(props.body) : [props.body]

    return(
        <div className={styles.wrapper}>
            {props.header}
            <ChildrenSwitcher
                children={body}
                openChild={props.multiPage ? props.openPage : 0}
            />
        </div>
    )
}

Layout.propTypes={
    header: PropTypes.node,
    body: PropTypes.node,
    multiPage: PropTypes.bool,
    openPage: PropTypes.number
}