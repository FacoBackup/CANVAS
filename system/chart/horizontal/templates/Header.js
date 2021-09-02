import PropTypes from 'prop-types'
import styles from "../styles/Header.module.css";

export default function Header(props){
    return(
        <div className={styles.header}>
            {props.title}
        </div>
    )
}
Header.propTypes= {
    title: PropTypes.any,
    setTitle: PropTypes.func,
    legends: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }))
}