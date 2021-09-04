import styles from './Icon.module.css'

export default function StringIcon(props){
    return(
        <div style={{width: props.size, height: props.size, fontSize: 'calc(' + props.size + ' / 1.5)', color: props.color}} className={styles.icon}>
            <div style={{transform: 'translateY(10%)'}}>
                A
            </div>
            <div style={{transform: 'translateY(-25%)'}}>
                B
            </div>
            <div style={{transform: 'translateY(5%)'}}>
                C
            </div>
        </div>
    )
}