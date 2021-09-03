import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styles from '../../styles/NodeOverview.module.css'

export default function EditorWrapper(props) {
    const mount = useRef()
    const [mounted, setMounted] = useState(false)
    const handleExit = (force) => {
        if(!props.open || force) {
            setMounted(false)
            try{
                ReactDOM.unmountComponentAtNode(mount.current)
                document.body.removeChild(mount.current)
            }catch (e){
                console.log(e)
            }
        }
    }
    useEffect(() => {
        if (!mounted && props.open) {
            mount.current = document.createElement('div')
            document.body.appendChild(mount.current)
            setMounted(true)
            mount.current.classList.add(styles.container)
        }

        if (props.open)
            ReactDOM.render(
                props.children,
                mount.current
            )
        else
            handleExit()
        return () => {
            handleExit()
        }
    }, [props.open, props.children])
    return null
}

EditorWrapper.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    setOpen: PropTypes.func
}