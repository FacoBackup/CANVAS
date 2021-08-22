import styles from "../styles/Node.module.css";
import React, {useRef} from "react";
import PropTypes from 'prop-types'
import NodeTemplate from "../../../templates/NodeTemplate";

export default function Content(props) {
    const ref = useRef()
    const handleInsert = (event) => {

        let newData = [...props.node.richTitle]
        if (newData.length > 0) {
            const last = newData[newData.length - 1]

            if (last.styles !== props.currentTextStyles)
                newData.push({
                    value: event.nativeEvent.data,
                    styles: props.currentTextStyles
                })
            else {
                newData[newData.length - 1].value = last.value + event.nativeEvent.data
            }
        } else
            newData.push({
                value: event.target.value,
                styles: props.currentTextStyles
            })

        return newData
    }
    const handleDelete = () => {

        let newData = [...props.node.richTitle]
        if (newData.length > 0) {
            const last = newData[newData.length - 1]

            if ((last.value.length - 1) > 0)
                newData[newData.length - 1].value = last.value.slice(0, -1)
            else
                newData.pop()
        }

        return newData
    }
    return (
        <>
            <input
                style={{display: props.open ? undefined : 'none', position: 'absolute', opacity: 0}}
                value={props.node.title}
                className={styles.nodeInput}
                onChange={event => {
                    console.log()
                    const richTitle = event.target.value.length > props.node.title.length ? handleInsert(event) : handleDelete()
                    props.setNode({
                        ...props.node,
                        title: event.target.value,
                        richTitle: richTitle
                    })
                }}
            />
            <div
                ref={ref}
                className={styles.header} id={props.node.id + '-*header'}
                onChange={event => {
                    const richTitle = event.target.value.length > props.node.title.length ? handleInsert(event) : handleDelete()
                    props.setNode({
                        ...props.node,
                        title: event.target.value,
                        richTitle: richTitle
                    })
                }}
            >
                {props.node.richTitle.map((data, index) => (
                    <span style={data.styles}>
                        {data.value}
                        <div
                            className={styles.blinker}
                            style={{display: props.open && index === (props.node.richTitle.length - 1) ? undefined : 'none'}}
                        />
                    </span>
                ))}

            </div>
        </>
    )
}

Content.propTypes = {
    node: NodeTemplate,
    open: PropTypes.bool,
    setNode: PropTypes.func,
    currentTextStyles: PropTypes.object
}