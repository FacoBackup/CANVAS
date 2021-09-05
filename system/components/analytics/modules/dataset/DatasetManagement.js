import PropTypes from 'prop-types'
import styles from '../../styles/Dataset.module.css'
import Cell from "./modules/Cell";
import React, {useEffect} from 'react'
import {CloseRounded, FolderRounded} from "@material-ui/icons";

export default function DatasetManagement(props) {
    const handleCellChange = (value, field, data, dataIndex) => {
        let newData = [...props.data.dataset]
        newData[dataIndex][field] = value
        props.setData({
            ...props.data,
            dataset: newData
        })
    }
    const handleHeaderChange = (newLabel, oldLabel) => {
        let newData = [...props.data.dataset]
        newData.forEach((e, i) => {
            if (newLabel.length > 0 && newLabel !== oldLabel) {
                e[newLabel] = e[oldLabel]
                delete e[oldLabel]
            }
        })
        props.setData({
            ...props.data,
            dataset: newData
        })
    }


    return (
        <div className={styles.tableWrapper}>
            <div className={styles.titleContainer}
                 style={{display: props.data.dataset !== undefined && props.data.dataset.length > 0 ? undefined : 'none'}}>
                {props.fileName}
                <button
                    onClick={() => props.setData({...props.data, dataset: [], fileName: undefined})}
                    className={[styles.button, styles.removeButton].join(' ')}>
                    <CloseRounded style={{fontSize: '1.3rem'}}/>
                    Remover dados
                </button>
            </div>
            <div style={{
                padding: '16px', overflow: 'auto',
                maxHeight: 'calc(100vh - 170px)'
            }}>


                {props.data.dataset !== undefined && props.data.dataset.length > 0 ?
                    <table className={styles.table}>
                        <tr>
                            {Object.keys(props.data.dataset[0]).map(k => (
                                <React.Fragment key={k + '-key-header'}>
                                    <Cell sample={props.data.dataset[0][k]} value={k} asHeader={true}
                                          handleChange={v => handleHeaderChange(v, k)}/>
                                </React.Fragment>
                            ))}
                        </tr>
                        {props.data.dataset.map((d, i) => (
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
    data: PropTypes.object,
    setData: PropTypes.func,
    openDataset: PropTypes.bool,
    handleUpload: PropTypes.func,
    fileName: PropTypes.string,
    setSelectedNode: PropTypes.func
}