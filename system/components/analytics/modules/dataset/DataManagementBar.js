import styles from "../../../shared/styles/Navigation.module.css";
import {ShowChartRounded, TableChart} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";

export default function DataManagementBar(props) {
    return (
        <div className={styles.container}
             style={{height: '70px', alignContent: 'center', justifyContent: 'flex-start', gap: '16px'}}>
            <button onClick={() => props.setOpenDataset(false)} className={[styles.button, styles.bigButton, !props.openDataset ? styles.activeButton : ''].join(' ')}>
                <ShowChartRounded style={{fontSize: '1.7rem'}}/>
                <div className={styles.overflow}>
                    Gráficos
                </div>
            </button>
            <button
                onClick={() => props.setOpenDataset(true)} className={[styles.button, styles.bigButton, props.openDataset ? styles.activeButton : ''].join(' ')}>
                <TableChart style={{fontSize: '1.7rem'}}/>

                <div className={styles.overflow}>
                    Dados
                </div>
            </button>
        </div>
    )
}

DataManagementBar.propTypes = {
    setOpenDataset: PropTypes.func,
    openDataset: PropTypes.bool
}