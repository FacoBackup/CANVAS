import PropTypes from 'prop-types'
import styles from '../../styles/Dataset.module.css'

export default function DatasetManagement(props) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <tr>
                    {props.data.dataset !== undefined && props.data.dataset.length > 0 ? Object.keys(props.data.dataset[0]).map(k => (
                        <th contentEditable={true} style={{border: '#e0e0e0 1px solid', padding: '8px', borderCollapse: 'collapse'}}>
                            {k}
                        </th>
                    )) : null}
                </tr>
                {props.data.dataset?.map(d => (
                    <tr>
                        {Object.keys(d).map(k => (
                            <td contentEditable={true} style={{border: '#e0e0e0 1px solid', padding: '8px', borderCollapse: 'collapse'}}>
                                {d[k]}
                            </td>
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