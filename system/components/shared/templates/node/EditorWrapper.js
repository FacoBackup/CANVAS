import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styles from '../../styles/NodeOverview.module.css'
import shared from '../../../../packages/tabs/styles/Tabs.module.css'
import ToolTip from "../../../../packages/chart/tooltip/ToolTip";

export default function EditorWrapper(props) {
    const contentRef = useRef()
    const [mounted, setMounted] = useState(false)
    // const handleExit = (force) => {
    //     if (!props.open || force) {
    //         mount.current?.classList.add(styles.exitAnimation)
    //         mount.current?.addEventListener('animationend', () => {
    //
    //             setMounted(false)
    //             try {
    //                 ReactDOM.unmountComponentAtNode(mount.current)
    //                 document.body.removeChild(mount.current)
    //             } catch (e) {
    //                 console.log(e)
    //             }
    //
    //         }, {once: true})
    //     }
    // }
    // useEffect(() => {
    //     if (!mounted && props.open) {
    //         mount.current = document.createElement('div')
    //         document.body.appendChild(mount.current)
    //         setMounted(true)
    //         mount.current?.classList.add(styles.container)
    //     }
    //
    //     if (props.open)
    //         ReactDOM.render(
    //             props.children,
    //             mount.current
    //         )
    //     else
    //         handleExit()
    //     return () => {
    //         handleExit()
    //     }
    // }, [props.open, props.children])
    return (
        <div className={shared.container}>
            <div className={shared.buttons} style={{paddingTop: '35px'}}>
                {props.options.map((e, i) => (
                    <span key={e.key + '-option-' + i}>
                    <ToolTip content={e.label} align={'middle'} justify={'start'}/>
                    <button className={shared.button} disabled={e.disabled}>
                        {e.icon}
                    </button>
                </span>
                ))}
            </div>
            <div className={shared.content} ref={contentRef}
                 style={{display: props.openButton === undefined || props.openButton === null ? 'none' : null}}>

                {props.buttons.map((button, i) => i === props.openButton && button !== null ? (
                    <span className={shared.enterAnimation} style={{
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

EditorWrapper.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    setOpenOption: PropTypes.func,
    openOption: PropTypes.number
}