import PropTypes from 'prop-types'
import styles from '../../styles/Dataset.module.css'
import Cell from "./modules/Cell";
import React from 'react'
import {CloseRounded, FolderRounded} from "@material-ui/icons";

export default function DatasetManagement(props) {
    const handleCellChange = (value, field, data, dataIndex) => {
        let newData = [...props.dataset]
        newData[dataIndex][field] = value
        props.setDataset( newData)
    }
    const handleHeaderChange = (newLabel, oldLabel) => {
        let newData = [...props.dataset]
        newData.forEach((e, i) => {
            if (newLabel.length > 0 && newLabel !== oldLabel) {
                e[newLabel] = e[oldLabel]
                delete e[oldLabel]
            }
        })
        props.setDataset( newData)
    }


    return (
        <div className={styles.tableWrapper}>
            <div className={styles.titleContainer}
                 style={{display: props.dataset !== undefined && props.dataset.length > 0 ? undefined : 'none'}}>
                {props.fileName}
                <button
                    onClick={() => {
                        props.setDatasetName(undefined)
                        props.setDataset([])
                    }}
                    className={[styles.button, styles.removeButton].join(' ')}>
                    <CloseRounded style={{fontSize: '1.3rem'}}/>
                    Remover dados
                </button>
            </div>
            <div style={{
                padding: '16px', overflow: 'auto',
                maxHeight: 'calc(100vh - 170px)'
            }}>


                {props.dataset !== undefined && props.dataset.length > 0 && props.openDataset?
                    <table className={styles.table}>
                        <tr>
                            {Object.keys(props.dataset[0]).map(k => (
                                <React.Fragment key={k + '-key-header'}>
                                    <Cell sample={props.dataset[0][k]} value={k} asHeader={true}
                                          handleChange={v => handleHeaderChange(v, k)}/>
                                </React.Fragment>
                            ))}
                        </tr>
                        {props.dataset.map((d, i) => (
                            <tr key={i + '-row'}>
                                {Object.keys(d).map(k => (
                                    <React.Fragment key={k + '-key-cell-' + i}>
                                        <Cell value={d[k]}
                                              handleChange={v => handleCellChange(v, k, d, i)}/>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </table>
                    :
                    <div className={styles.emptyIndicator}>
                        <FolderRounded style={{fontSize: '130px', color: '#999999'}}/>
                        <h5 style={{textAlign: 'center', color: '#777777'}}>Ooops, nenhum dado encontrado</h5>
                        <button className={styles.button} onClick={() => props.handleUpload('all')}>
                            Anexar arquivo
                        </button>
                    </div>
                }
            </div>
        </div>

    )
}

DatasetManagement.propTypes = {
    setDatasetName: PropTypes.func,
    setDataset: PropTypes.func,
    dataset: PropTypes.array,
    handleUpload: PropTypes.func,
    fileName: PropTypes.string
}