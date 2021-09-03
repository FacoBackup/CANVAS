import styles from "../../styles/Top.module.css";
import {ShowChartRounded, TableChart} from "@material-ui/icons";
import React from "react";

export default function DataManagementBar(props){
    return (
        <div className={styles.container}>
            <button onClick={() => props.setOpenDataset(false)}>
                <ShowChartRounded/>
            </button>
            <button
                onClick={() => props.setOpenDataset(true)}>
                <TableChart/>
            </button>
        </div>
    )
}