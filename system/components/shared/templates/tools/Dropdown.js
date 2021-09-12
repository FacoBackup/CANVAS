import PropTypes from 'prop-types'
import {useEffect, useRef} from "react";
import styles from '../../styles/Dropdown.module.css'

export default function Dropdown(props) {
    const ref = useRef()
    const dropdownRef = useRef()

    const handleClose = (event) => {
        if (event.target.closest('.' + styles.dropdownButton) === null)
            props.handleClose(null)
    }


    useEffect(() => {
        document.addEventListener('mousedown', handleClose)
        return () => {
            document.removeEventListener('mousedown', handleClose)
        }
    }, [props.open])

    return (
        <div ref={dropdownRef}>
            <button
                onClick={() => {
                    props.handleOpen()
                }} className={styles.buttonContainer}>
                {props.label}
            </button>
            <div ref={ref} className={styles.dropdownContent} style={{
                display: props.open ? undefined : 'none',
                right: props.justify === 'left' ? 0 : undefined,
                width: props.width
            }}>
                {props.buttons.map((b, i) => (
                    <div style={{width: '100%', borderTop: i > 0 ? '#e0e0e0 1px solid' : "unset"}}>
                        {b.children.map(c => (
                            <button
                                className={[styles.dropdownButton, c.active ? styles.activeButton : undefined].join(' ')} disabled={c.disabled}
                                style={{...{paddingLeft: c.icon === undefined ? '32px' : "4px"}, ...c.styles}}
                                onClick={() => {
                                    c.onClick()
                                    props.handleClose(null)
                                }}
                            >
                                <div style={{
                                    display: c.icon === undefined ? 'none' : 'flex',
                                    width: '28px',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {c.icon}
                                </div>
                                {c.label}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
Dropdown.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.shape(
            {
                label: PropTypes.string,
                onClick: PropTypes.func,
                icon: PropTypes.object,
                active: PropTypes.bool,
                disabled: PropTypes.bool,
                styles: PropTypes.object
            }
        ))

    })),
    justify: PropTypes.oneOf(['left', 'right']),
    label: PropTypes.string,
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    width: PropTypes.string
}