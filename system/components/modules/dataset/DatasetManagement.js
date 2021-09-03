import PropTypes from 'prop-types'
import styles from '../../styles/Dataset.module.css'
import Cell from "./modules/Cell";

export default function DatasetManagement(props) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <tr>
                    {props.data.dataset !== undefined && props.data.dataset.length > 0 ? Object.keys(props.data.dataset[0]).map(k => (
                        <Cell value={k} asHeader={true}/>
                    )) : null}
                </tr>
                {props.data.dataset?.map(d => (
                    <tr>
                        {Object.keys(d).map(k => (
                            <Cell value={d[k]}/>
                        ))}
                    </tr>
                ))}
            </table>
        </div>

    )
}

DatasetManagement.propTypes = {
    data: PropTypes.object
}