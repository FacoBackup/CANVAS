import styles from './Icon.module.css'

export default function NumericIcon(props){
    return(
        <div style={{width: props.size, height: props.size, fontSize: 'calc(' + props.size + ' / 1.5)', color: props.color}} className={styles.icon}>
            <div style={{transform: 'translateY(10%)'}}>
                1
            </div>
            <div style={{transform: 'translateY(-25%)'}}>
                2
            </div>
            <div style={{transform: 'translateY(5%)'}}>
                3
            </div>
        </div>
    )
}