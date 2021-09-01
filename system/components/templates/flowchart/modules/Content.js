import styles from "../../../styles/Node.module.css";
import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types'
import NodeTemplate from "../../props/NodeTemplate";
import topBarStyles from '../../../styles/Top.module.css'

export default function Content(props) {
    const ref = useRef()
    const [mounted, setMounted] = useState(false)
    const [focused, setFocused] = useState(false)
    const handleChange = (e) => {
        console.log(e.target.closest('.' + topBarStyles.button))

        if (e.target !== null && e.target !== undefined && e.target.closest('.' + topBarStyles.button) === null && e.target.closest('#' + (props.node.id + '-node')) === null) {
            setFocused(false)
            console.log(e.target.closest('.' + topBarStyles.button) === null && e.target.closest('#' + (props.node.id + '-node')) === null)
        }
        if (props.node.richTitle !== ref.current.innerHTML)
            props.setNode({
                ...props.node,
                richTitle: ref.current.innerHTML
            })
    }

    useEffect(() => {
        if (!mounted) {
            ref.current.innerHTML = props.node.richTitle
            setMounted(true)
        }
        ref.current?.addEventListener('keyup', handleChange)
        document.addEventListener('click', handleChange)

        return () => {
            ref.current?.removeEventListener('keyup', handleChange)
            document.removeEventListener('click', handleChange)
        }
    }, [focused])

    return (
        <>
            <div
                contentEditable={focused} style={{cursor: focused ? 'text' : 'pointer'}}
                ref={ref}
                onBlur={event => {
                    event.preventDefault()
                }}
                onDoubleClick={() => setFocused(true)}
                className={styles.header}
                id={props.node.id + '-*header'}
            >
            </div>
        </>
    )
}

Content.propTypes = {
    node: NodeTemplate,
    setNode: PropTypes.func,
    currentTextStyles: PropTypes.object
}