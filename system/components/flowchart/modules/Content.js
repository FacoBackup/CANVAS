import styles from "../../../packages/node/styles/Node.module.css";
import React, {useRef, useState} from "react";
import PropTypes from 'prop-types'

export default function Content(props) {
    const ref = useRef()
    const [mounted, setMounted] = useState(false)
    const [focused, setFocused] = useState(false)
    // const handleChange = (e) => {
    //     const elements = e.type === 'click' ? document.elementsFromPoint(e.clientX, e.clientY) : []
    //
    //     if (e.type === 'click' && e.target.closest('.' + topBarStyles.button) === null && !elements.includes(ref.current) && !elements.includes(document.getElementById('context-menu'))) {
    //         setFocused(false)
    //         props.dispatch({
    //             type: props.actions.TITLE,
    //             payload: ref.current !== undefined && ref.current !== null && ref.current?.innerHTML !== undefined ? ref.current.innerHTML : null
    //         })
    //     }
    // }
    //
    // useEffect(() => {
    //     if (!mounted && ref.current !== null) {
    //         if (props.node.title !== undefined && props.node.title !== null)
    //             ref.current.innerHTML = props.node.title
    //         setMounted(true)
    //     }
    //     ref.current?.addEventListener('keyup', handleChange)
    //     document.addEventListener('click', handleChange)
    //
    //     return () => {
    //         ref.current?.removeEventListener('keyup', handleChange)
    //         document.removeEventListener('click', handleChange)
    //     }
    // }, [])

    return (
        <>
            <div
                contentEditable={focused} style={{cursor: focused ? 'text' : 'pointer'}}
                ref={ref}
                onBlur={event => {
                    event.preventDefault()
                    setFocused(false)
                    props.dispatch({
                        type: props.actions.TITLE,
                        payload: ref.current !== undefined && ref.current !== null && ref.current?.innerHTML !== undefined ? ref.current.innerHTML : null
                    })
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
    node: PropTypes.object,
    dispatch: PropTypes.func,
    actions: PropTypes.object
}