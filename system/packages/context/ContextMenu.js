import PropTypes from 'prop-types'
import styles from './styles/ContextMenu.module.css'
import {useEffect, useRef, useState} from "react";
import CanvasContext from "./templates/CanvasContext";
import NodeContext from "./templates/NodeContext";
import nodeStyles from '../../components/shared/styles/Node.module.css'

export default function ContextMenu(props) {
    const ref = useRef()
    const [onRender, setOnRender] = useState(false)
    const [buttons, setButtons] = useState([])
    const [e, setE] = useState({})
    const [nodeID, setNodeID] = useState(undefined)
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

        const node = event.target.closest('.' + nodeStyles.entityContainer)
        const canvas = event.target.closest('#engine-content')
        let newButtons


        if (event.button === 2) {
            if (canvas !== null && node === null)
                newButtons = CanvasContext(props)
            else if (node !== null) {
                newButtons = NodeContext(props)
                setNodeID(node.id.replace('-node', ''))
            }
            if (newButtons !== undefined)
                handleContext(newButtons, event)
        }
    }

    const handleContext = (newButtons, event) => {
        setE(event)
        setOnRender(true)
        onRenderListener = true

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

    const handleExit = (event) => {

        if (event && ((event.button === 0 && !document.elementsFromPoint(event.clientX, event.clientY).includes(ref.current)) || (event.button === 2 && onRenderListener))) {
            remove()
        } else if (!onRenderListener && event.button === 2)
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
            if (onRender)
                remove()
            document.body.removeEventListener('contextmenu', preventContext)
            document.removeEventListener('mousedown', handleExit)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [props.data, props.selectedNodes])


    return (
        <div ref={ref} style={{display: onRender ? undefined : 'none'}}
             className={onRender ? styles.context : undefined} id={'context-menu'}>
            {buttons.map((button, i) => button.children !== undefined ? (
                <div>
                    <div className={styles.header}>
                        {button.label}
                    </div>
                    {button.children.map(c => (
                        <button
                            onClick={() => {
                                c.onClick(e, nodeID)
                                remove()
                            }} key={c.key}
                            disabled={c.getDisabled !== undefined ? c.getDisabled(props) : false}
                            className={styles.contextButton}
                        >
                            {c.icon}
                            <div className={styles.overflow}>
                                {c.label}
                            </div>
                            {c.shortcutButtons ?
                                <div className={styles.shortcuts}>
                                    {c.shortcutButtons.map((s, index) => (
                                        <div className={index === 0 ? styles.mainButton : styles.secondaryButton}
                                             key={c.key + '-shortcut'}>

                                            {index > 0 ? <div> + </div> : null}
                                            {s}
                                        </div>
                                    ))}
                                </div>
                                :
                                null}
                        </button>
                    ))}
                </div>
            ) : null)}
        </div>
    )
}
ContextMenu.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,

    scale: PropTypes.number,
    setScale: PropTypes.func,

    copiedNode: PropTypes.object,
    setCopiedNode: PropTypes.func,

    selectedNodes: PropTypes.array,
    unselectNode: PropTypes.func,
    selectNode: PropTypes.func
}
