import PropTypes from 'prop-types'
import styles from './styles/Horizontal.module.css'
import {useEffect, useState} from "react";
import Header from "./templates/Header";
import Content from "./templates/Content";
import Value from "./templates/Value";
import Axis from "./templates/Axis";

export default function HorizontalChart(props) {

    const [sortedData, setSortedData] = useState([])
    const [iterations, setIterations] = useState([])
    const [numberOfIterations, setNumberOfIterations] = useState(10)
    const [biggest, setBiggest] = useState(null)

    useEffect(() => {
        const nData = [...props.data]

        const compare = (a, b) => {
            let fA = a[props.value.field]
            let fB = b[props.value.field]
            if (fA < fB)
                return 1;
            if (fA > fB)
                return -1;
            return 0;
        }
        nData.sort(compare);

        setSortedData(nData)
        let value
        props.data.forEach((e) => {
            if (value === undefined)
                value = e[props.value.field]
            else if (e[props.value.field] > value)
                value = e[props.value.field]
        })

        let nI = []
        let m = 1
        for (let i = 0; i <= (value.toString().length - 1); i++) {
            m = m * numberOfIterations
        }
        if (m / numberOfIterations !== value)
            value = m

        else
            value = m / numberOfIterations
        let nB = value
        for (let i = 0; i <= numberOfIterations; i++) {
            if (i > 0)
                nB = nB - value / numberOfIterations
            nI.push(nB)
        }
        setBiggest(value)
        nI.reverse()
        setIterations(nI)
    }, [props.data])
    return (
        <div className={styles.container} style={props.styles}>
            <Header title={props.title} setTitle={props.setTitle} legends={props.legends}/>
            <div style={{display: 'flex', width: '100%',gridRow: 2}}>
                <Axis label={props.axis.label}/>
                <Content
                    value={props.value} axis={props.axis}
                    data={sortedData} iterations={iterations}
                    biggest={biggest}
                />
            </div>
            <Value label={props.value.label} iterations={iterations}/>
        </div>
    )
}
HorizontalChart.propTypes = {
    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),

    data: PropTypes.arrayOf(PropTypes.object),

    title: PropTypes.string,
    setTitle: PropTypes.func,
    legends: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }))
}
