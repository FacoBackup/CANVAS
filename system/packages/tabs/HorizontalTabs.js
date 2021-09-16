import styles from './styles/Tabs.module.css'
import PropTypes from 'prop-types'
import {useRef} from "react";
import ToolTip from "../chart/tooltip/ToolTip";

export default function HorizontalTabs(props) {
    const contentRef = useRef()


    return (
        <>
            <div className={styles.horizontalButtons}>
                {props.buttons.map((button, i) => button !== null ? (
               <div className={styles.labelContainer}>
                   <button
                       key={i + '-horizontal-tab-button'}
                       className={[styles.button, props.openButton === i ? styles.activeButton : ''].join(' ')}
                       onClick={() => props.setOpenButton(i)} disabled={button.disabled}>
                       {button.icon}
                   </button>
                   <div className={styles.overflow}>
                       {button.label}
                   </div>
                   <ToolTip content={button.label}/>
               </div>
                ) : null)}
            </div>
            <div className={styles.horizontalContainer} ref={contentRef}
                 style={{display: props.openButton === undefined || props.openButton === null ? 'none' : null}}>

                {props.buttons.map((button, i) => i === props.openButton && button !== null ? (
                    <span className={styles.enterAnimation} style={{
                        display: 'grid',
                        gap: '4px',
                        padding: '4px 16px 0px 16px'
                    }}>
                        <div className={styles.header}>
                            {button.label}
                        </div>
                        {button.content}
                    </span>

                ) : null)}
            </div>
        </>
    )
}

HorizontalTabs.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.object,
        disabled: PropTypes.bool,
        content: PropTypes.node,
        label: PropTypes.string,
    })),
    openButton: PropTypes.number, setOpenButton: PropTypes.func,
}