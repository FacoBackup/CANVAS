import React from 'react'
import 'typeface-roboto'
import styles from '../styles/Index.module.css'
import {AddRounded, InsertChartRounded} from "@material-ui/icons";
import {Avatar} from "@material-ui/core";

export default function index(props) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div style={{width: '10%'}}>
                    PLACEHOLDER LOGO
                </div>
                <input className={styles.searchBar} placeholder={'Pesquisar'}/>
                <div style={{width: '10%'}}>
                    <Avatar/>
                </div>
            </div>
            <div className={styles.recentWrapper}>
                <button className={styles.recentDocumentWrapper}>
                    <AddRounded/>
                    Novo
                </button>
            </div>
            <div className={styles.contentWrapper}>
                Recentes
                <div className={styles.content}>
                    <button className={styles.recentDocumentWrapper}>
                        <InsertChartRounded/>
                    </button>
                </div>
            </div>

        </div>
    )
}
