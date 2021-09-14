import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import styles from './styles/Styles.module.css'
import React, {useEffect, useRef} from "react";

export default function ToolTip(props) {
    const toolTip = (
        <div className={styles.container}>
            {/*<div className={styles.arrow}*/}
            {/*     style={{borderBottom: props.color !== undefined ? props.color + ' 10px solid' : undefined}}/>*/}
            <div className={styles.content}>
                {props.content === undefined ? props.children : props.content}
            </div>

        </div>
    )
    const ref = useRef()
    const mountingPoint = useRef();


    const hover = (event) => {
        mountingPoint.current.classList.remove(styles.exitAnim)
        ReactDOM.unmountComponentAtNode(
            mountingPoint.current
        )
        ReactDOM.render(
            toolTip,
            mountingPoint.current
        )
        const rect = ref.current?.parentNode.getBoundingClientRect()
        if (rect !== undefined) {
            mountingPoint.current.style.position = 'fixed'
            mountingPoint.current.style.transform = `translate(${props.justify === 'end' ? '0' : '-50%'}, -50%)`
            mountingPoint.current.style.zIndex = '999'
            switch (props.align) {

                case 'middle': {
                    mountingPoint.current.style.top = (rect.top + rect.height / 2) + 'px'
                    break
                }
                case 'start': {
                    mountingPoint.current.style.top = (rect.top) + 'px'
                    break
                }
                default: {
                    mountingPoint.current.style.top = (rect.top + rect.height + 16) + 'px'
                    break
                }
            }
            switch (props.justify) {
                case 'end': {
                    mountingPoint.current.style.left = (rect.left + rect.width + 16) + 'px'
                    break
                }
                case 'start': {
                    mountingPoint.current.style.left = (rect.left) + 'px'
                    break
                }
                default: {
                    mountingPoint.current.style.left = (rect.left + rect.width / 2) + 'px'
                    break
                }
            }


        }
    }
    const hoverEnd = (event) => {
        if (!document.elementsFromPoint(event.clientX, event.clientY).includes(mountingPoint.current)) {

            mountingPoint.current.classList.add(styles.exitAnim)
            mountingPoint.current.addEventListener('animationend', () => {

                if (mountingPoint.current.classList.length === 1)
                    ReactDOM.unmountComponentAtNode(
                        mountingPoint.current
                    )
            }, {once: true})
        }
    }
    useEffect(() => {
        const newElement = document.createElement("div")
        mountingPoint.current = newElement
        document.body.appendChild(newElement)

        ref.current?.parentNode.addEventListener('mouseenter', hover)
        ref.current?.parentNode.addEventListener('mouseleave', hoverEnd)
        mountingPoint.current?.addEventListener('mouseleave', hoverEnd)

        return () => {

            ref.current?.parentNode.removeEventListener('mouseenter', hover)
            ref.current?.parentNode.removeEventListener('mouseleave', hoverEnd)
            mountingPoint.current?.removeEventListener('mouseleave', hoverEnd)
            ReactDOM.unmountComponentAtNode(
                mountingPoint.current
            )
            document.body.removeChild(newElement)
        }
    })

    return <div ref={ref}/>
}

ToolTip.propTypes = {
    content: PropTypes.string,
    children: PropTypes.node,
    color: PropTypes.string,
    justify: PropTypes.oneOf(['end', 'middle', 'start']),
    align: PropTypes.oneOf(['end', 'middle', 'start'])
}