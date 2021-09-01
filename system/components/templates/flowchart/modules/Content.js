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
        console.log()
        try {
            if (e.type === 'click' && e.target.closest('.' + topBarStyles.button) === null && !document.elementsFromPoint(e.clientX, e.clientY).includes(ref.current))
                setFocused(false)

                props.setNode({
                    ...props.node,
                    richTitle: ref.current !== undefined && ref.current !== null && ref.current?.innerHTML !== undefined? ref.current.innerHTML : null
                })
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (!mounted && ref.current !== null) {
            if(props.node.richTitle !== undefined && props.node.richTitle !== null)
            ref.current.innerHTML = props.node.richTitle
            setMounted(true)
        }
        ref.current?.addEventListener('keyup', handleChange)
        document.addEventListener('click', handleChange)

        return () => {
            ref.current?.removeEventListener('keyup', handleChange)
            document.removeEventListener('click', handleChange)
        }
    }, [focused, props.node.placement])

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