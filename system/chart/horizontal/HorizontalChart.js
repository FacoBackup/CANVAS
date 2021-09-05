import PropTypes from 'prop-types'
import styles from './styles/Horizontal.module.css'
import {useEffect, useRef, useState} from "react";
import Content from "./templates/Content";
import {BarChartRounded} from "@material-ui/icons";
import ToolTip from "../tooltip/ToolTip";
import Wrapper from "../shared/Wrapper";
import getPercentage from "../shared/getPercentage";


export default function HorizontalChart(props) {

    const [sortedData, setSortedData] = useState([])
    const [iterations, setIterations] = useState([])
    const [biggest, setBiggest] = useState(null)
    const offset = 35

    useEffect(() => {

        if (!(props.value === undefined || props.axis === undefined || !props.value.field || !props.axis.field)) {
            const nData = [...props.data]

            const compare = (a, b) => {
                let fA = parseInt(a[props.value.field])
                let fB = parseInt(b[props.value.field])
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
                    value = parseInt(e[props.value.field])
                else if (parseInt(e[props.value.field]) > value)
                    value = parseInt(e[props.value.field])
            })
            if (value !== undefined) {
                let nI = []
                // let m = 1
                // for (let i = 0; i <= (value.toString().length - 1); i++) {
                //     m = m * numberOfIterations
                // }
                // if (m / numberOfIterations !== value)
                //     value = m
                //
                // else
                //     value = m / numberOfIterations
                // let nB = value
                // for (let i = 0; i <= numberOfIterations; i++) {
                //     if (i > 0)
                //         nB = nB - value / numberOfIterations
                //     nI.push(nB)
                // }
                setBiggest(value)
                nI.reverse()
                setIterations(nI)
            }
        }
    }, [props.data, props.value, props.axis])

    return (
        <div>
            {props.value === undefined || props.axis === undefined || !props.value.field || !props.axis.field ?
                <BarChartRounded
                    style={{
                        transform: 'translate(-50%, -50%) rotate(90deg)',
                        top: '50%',
                        left: '50%',
                        fontSize: (props.height > props.width ? (props.height) / 2 : props.width / 2) + 'px',
                        color: '#0095ff',
                        position: "absolute"
                    }}
                />
                :
                <svg className={styles.graph}
                     width={props.width}
                     height={props.height}
                >
                    <title id="title">A line chart showing some information</title>
                    <g className={styles.grid}>
                        <line x1={offset} x2={offset} y1={5} y2={props.height - offset}/>
                    </g>
                    <g className={styles.grid}>
                        <line x1={offset} x2={props.width - 5} y1={props.height - offset} y2={props.height - offset}/>
                    </g>
                    <g className={styles.labels}>


                        <text x={(props.width) / 2} y={props.height - 5}
                              className={styles.valuesLabel}>{props.value.label}</text>
                    </g>
                    <foreignObject overflow={'visible'}
                                   width={props.width}
                                   height={props.height}
                    >
                        <div style={{
                            overflowY: 'auto',
                            maxHeight: 'calc(100% - ' + offset + 'px)',
                            height: '100%',
                        }}>
                            <svg width={props.width - offset} height={props.data.length * 20}>
                                <Content {...props} data={sortedData} biggest={biggest} iterations={iterations}
                                         offset={offset}/>
                            </svg>
                        </div>
                    </foreignObject>
                </svg>

            }
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
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    setTitle: PropTypes.func,
    legends: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }))
}
