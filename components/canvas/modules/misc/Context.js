import PropTypes from 'prop-types'
import styles from './styles/Styles.module.css'
import {useEffect, useRef, useState} from "react";
import CanvasContext from "./packages/CanvasContext";
import NodeContext from "./packages/NodeContext";
import NodeTemplate from "../../templates/NodeTemplate";

export default function Context(props) {
    const ref = useRef()
    const [onRender, setOnRender] = useState(false)
    const [buttons, setButtons] = useState([])
    const [e, setE] = useState({})
    let originalPlacement = {
        x: -1,
        y: -1
    }
    let onRenderListener = false
    const remove = () => {
        ref.current.classList.add(styles.exitAnimation)
        ref.current.addEventListener('animationend', () => {
            if (ref.current.classList.length === 2) {
                setOnRender(false)
                onRenderListener = false
                ref.current.classList.remove(styles.exitAnimation)
                setButtons([])
            }
        }, {once: true})
    }
    const preventContext = (event) => {
        event.preventDefault()
    }
    const handleMouseUp = (event) => {
        event.preventDefault()
        if (event.button === 2) {
            setE(event)
            const el = document.elementFromPoint(event.clientX, event.clientY)
            let newButtons = []
            setOnRender(true)
            onRenderListener = true
            if (el !== null && el.id.includes('frame'))
                newButtons = CanvasContext
            else if (el.id.includes('node') || (typeof el.className === 'string' && el.className.includes('Node')))
                newButtons = NodeContext
            setButtons(newButtons)
            const marginTop = newButtons.length * 40
            if (event.clientY > marginTop)
                ref.current.style.top = (event.clientY - marginTop) + 'px'
            else
                ref.current.style.top = event.clientY + 'px'

            if ((document.documentElement.offsetWidth - event.clientX) > 250)
                ref.current.style.left = event.clientX + 'px'
            else
                ref.current.style.left = (event.clientX - 250) + 'px'
        }

    }
    const handleExit = (event) => {

        if (event && ((event.button === 0 && !document.elementsFromPoint(event.clientX, event.clientY).includes(ref.current)) || (event.button === 2 && onRenderListener)))
            remove()
        else if (!onRenderListener && event.button === 2)
            originalPlacement = {
                x: event.clientX,
                y: event.clientY
            }
    }

    useEffect(() => {

        document.body.addEventListener('contextmenu', preventContext)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousedown', handleExit)
        return () => {
            document.body.removeEventListener('contextmenu', preventContext)
            document.removeEventListener('mousedown', handleExit)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])
    return (
        <div ref={ref} style={{display: onRender ? undefined : 'none'}}
             className={onRender ? styles.context : undefined}>
            {buttons.map((button, i) => (
                <div>
                    <div className={styles.header}>
                        {button.label}
                    </div>
                    {button.children.map(c => (
                        <button
                            onClick={() => {
                                c.onClick(props, e)
                                remove()
                            }} key={c.key}
                            disabled={c.getDisabled !== undefined ? c.getDisabled(props) : false}
                            className={styles.contextButton}
                        >
                            {c.icon}
                            {c.label}
                            {c.shortcutButtons ?
                                <div className={styles.shortcuts}>
                                    {c.shortcutButtons.map((s, index) => (
                                        <div className={index === 0 ? styles.mainButton : styles.secondaryButton} key={c.key+'-shortcut'}>

                                            {index > 0 ?     <div> + </div> : null}
                                            {s}
                                        </div>
                                    ))}
                                </div>
                                :
                                null}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}
Context.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,

    scale: PropTypes.number,
    setScale: PropTypes.func,

    copiedNode: NodeTemplate,
    setCopiedNode: PropTypes.func,
}
