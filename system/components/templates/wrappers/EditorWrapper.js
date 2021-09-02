import PropTypes from 'prop-types'
import {useEffect} from "react";
import ReactDOM from "react-dom";
import styles from '../../styles/NodeOverview.module.css'

export default function EditorWrapper(props){
    useEffect(() => {
        const mountingPoint = document.createElement('div')
        document.body.appendChild(mountingPoint)
        if(props.open)
            ReactDOM.render(
                <div className={styles.container}>
                    {props.children}
                </div>,
                mountingPoint
            )
        return () => {
            ReactDOM.unmountComponentAtNode(mountingPoint)
            document.body.removeChild(mountingPoint)
        }
    }, [props.open])
    return null
}

EditorWrapper.propTypes={
    children: PropTypes.node,
    open: PropTypes.bool,
    setOpen: PropTypes.func
}