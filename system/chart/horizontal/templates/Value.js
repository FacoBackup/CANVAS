import PropTypes from 'prop-types'
import styles from "../styles/Horizontal.module.css";

export default function Value(props) {
    return (

        <div className={styles.valuesLabel}>

            {props.label}
        </div>
    )
}
Value.propTypes = {
    label: PropTypes.string,
    iterations: PropTypes.arrayOf(PropTypes.number),

}