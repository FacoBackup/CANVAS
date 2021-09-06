import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import styles from '../../shared/styles/Canvas.module.css'

export default function ChildrenSwitcher(props) {
    const ref = useRef()
    const [currentChild, setCurrentChild] = useState(props.openChild)

    const handleEnter = () => {
        // ref.current.classList.remove(styles.enterA)
        ref.current.classList.add(styles.exitA)

        ref.current.addEventListener('animationend', function switcher (e) {
            setCurrentChild(props.openChild)
            ref.current.classList.remove(styles.exitA)
            ref.current.classList.add(styles.enterA)

            e.currentTarget.removeEventListener('animationend', switcher)
        })
    }
    useEffect(() => {
        if (props.openChild !== currentChild && props.openChild <= props.children.length)
            handleEnter()

    }, [props.openChild])

    return (

        <div ref={ref} style={{height: '100%', width: '100%'}}>
            {props.children.map((c, i) => (
                <div key={i+'-child'} id={i+'-child'} style={{display: i !== currentChild ? 'none' : undefined, height: '100%', width: '100%'}}>
                    {c}
                </div>
            ))}
        </div>
    )
}

ChildrenSwitcher.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    openChild: PropTypes.number
}