import PropTypes from 'prop-types'
import styles from './styles/Loader.module.css'

export default function Loader(props){
    return <div style={{visibility: props.loading ? 'visible' : 'hidden',opacity: props.loading ? undefined : '0'}} className={styles.loader}>
        <div className={styles.loaderBar}/>
    </div>
}
Loader.propTypes={
    loading: PropTypes.bool
}