import styles from '../../styles/Tabs.module.css'
import PropTypes from 'prop-types'
import {useEffect, useRef} from "react";
import ToolTip from "../../../../chart/tooltip/ToolTip";

export default function VerticalTabs(props) {
    const contentRef = useRef()
    useEffect(() => {
        if(props.toBePushedTab !== undefined && props.toBePushedTab !== null)
            handleTabChange(props.toBePushedTab)
    }, [props.toBePushedTab])
    const handleTabChange = (newTab) => {
        contentRef.current.firstChild.classList.add(styles.exitAnimation)
        contentRef.current.firstChild.addEventListener('animationend', () => {
            props.setOpenButton(newTab)
            if(props.toBePushedTab !== undefined && props.toBePushedTab !== null)
                props.setToBePushedTab(null)
        }, {once: true})
    }
    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                {props.buttons.map((button, i) => button !== null ? (
                    <button
                        key={i + '-tab-button'}
                        className={[styles.button, props.openButton === i ? styles.activeButton : ''].join(' ')}
                        onClick={() => handleTabChange(i)} disabled={button.disabled}>
                        {button.icon}
                        <ToolTip content={button.label}/>
                    </button>
                ) : null)}
            </div>
            <div className={styles.content} ref={contentRef}
                 style={{display: props.openButton === undefined || props.openButton === null ? 'none' : null}}>

                {props.buttons.map((button, i) => i === props.openButton && button !== null ? (
                    <span className={styles.enterAnimation} style={{
                        display: 'grid',
                        gap: '4px'
                    }}>
                        <div className={styles.header}>
                            {button.label}
                        </div>
                        {button.content}
                    </span>

                ) : null)}
            </div>
        </div>
    )
}

VerticalTabs.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.object,
        disabled: PropTypes.bool,
        content: PropTypes.node
    })),
    openButton: PropTypes.number, setOpenButton: PropTypes.func,
    toBePushedTab: PropTypes.number,
    setToBePushedTab: PropTypes.func
}