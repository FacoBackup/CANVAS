import PropTypes from 'prop-types'
import styles from "../horizontal/styles/Horizontal.module.css";
import {useEffect, useState} from "react";

export default function Wrapper(props) {
    const [iterations, setIterations] = useState([])
    const [biggest, setBiggest] = useState(null)
    useEffect(() => {
        let b = undefined
        props.data.forEach((e) => {
            if (b === undefined)
                b = parseInt(e[props.value])
            else if (parseInt(e[props.value]) > b)
                b = parseInt(e[props.value])
        })

        let value = b
        let percent = Math.ceil(value * .2)
        let topValue = value - percent * 5
        if (topValue < 0) {
            topValue = topValue * (-1)
            value = value + topValue
            topValue = value - percent * 5
        }


        let newIterations = []
        for (let i = 0; i < 6; i++)
            newIterations.push({
                value: (topValue > 0 ? topValue : value) - percent * (i),
                x: (5 - i) * 17.5
            })
        setIterations(newIterations)
        setBiggest(newIterations[0].value)

    }, [props.value, props.data])

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.titleInput}>
                {props.title}
            </div>
            {props.children(30, iterations, biggest)}
        </div>
    )
}

Wrapper.propTypes = {
    data: PropTypes.array,
    value: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,

}