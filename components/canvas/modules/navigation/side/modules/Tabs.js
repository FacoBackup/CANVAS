import styles from '../styles/Tabs.module.css'
import PropTypes from 'prop-types'

export default function Tabs(props) {
    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                {props.buttons.map((button, i) => (
                    <button
                        className={[styles.button, props.openButton === i ? styles.activeButton : ''].join(' ')}
                        onClick={() => props.setOpenButton(i)} disabled={button.disabled}>
                        {button.icon}
                    </button>
                ))}
            </div>
            <div className={styles.content}
                 style={{display: props.openButton === undefined || props.openButton === null ? 'none' : null}}>
                {props.buttons.map((button, i) => i === props.openButton ? (
                    button.content
                ) : null)}
            </div>
        </div>
    )
}

Tabs.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.object,
        disabled: PropTypes.bool,
        content: PropTypes.node
    })),
    openButton: PropTypes.number, setOpenButton: PropTypes.func
}