import PropTypes from 'prop-types'
import styles from "../styles/Horizontal.module.css";

export default function Axis(props){
return(
    <div className={styles.axisLabel}>
        {props.label}
    </div>
)
}
Axis.propTypes={
    label: PropTypes.string
}