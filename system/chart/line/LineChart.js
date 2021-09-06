import PropTypes from 'prop-types'
import styles from './styles/Horizontal.module.css'
import {useEffect, useState} from "react";
import {BarChartRounded} from "@material-ui/icons";
import GetPoints from "./templates/getPoints";
import ToolTip from "../tooltip/ToolTip";
import Line from "./templates/Line";

export default function LineChart(props) {

    const [points, setPoints] = useState([])
    const offset = 26
    const [xOffset, setXOffset] = useState(40)
    const [dimensions, setDimensions] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        if (props.value && props.axis && props.value.field && props.axis.field) {
            let {b, s} = {}
            props.data.forEach((e) => {
                if (b === undefined && s === undefined) {
                    b = parseInt(e[props.value.field])
                    s = parseInt(e[props.value.field])
                }
                if (parseInt(e[props.value.field]) > b)
                    b = parseInt(e[props.value.field])

                if (parseInt(e[props.value.field]) < s)
                    s = parseInt(e[props.value.field])
            })

            setPoints(GetPoints({
                valueKey: props.value.field,
                data: props.data,
                width: props.width,
                offset: offset,
                biggest: b,
                height: props.height,
                smallest: s,
                noScroll: ((props.width - offset) / props.data.length) + props.data.length - 1 <= props.width
            }))

            setDimensions({
                width: props.width - 40,
                height: props.height - 40
            })
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
                <>
                    <div>
                        Cafe
                    </div>
                    <div style={{display: 'flex', height: dimensions.height, width: '100%'}}>
                        {/*<div className={styles.axisLabel}>*/}
                        {/*    {props.axis.label}*/}
                        {/*    /!*cafe*!/*/}
                        {/*</div>*/}
                        <div className={styles.axisLabel} style={{width: '40px'}}>
                            <svg
                                overflow={'visible'}
                                width={'100%'}
                                height={'100%'}

                            >
                                {points.map((e, i) => (
                                    <text x={10} y={e.y + 20} fill={'#555555'} style={{fontSize: '.7rem'}}
                                          key={i + '-field-' + JSON.stringify(props.data[i][props.axis.field])}>
                                        {props.data[i][props.axis.field]}
                                    </text>

                                ))}
                            </svg>
                        </div>
                        <svg className={styles.graph}
                             width={dimensions.width}

                             height={dimensions.height}
                             x={40}
                             y={0}
                             stroke={'#e0e0e0'} strokeWidth={1}
                             overflow={'visible'}
                        >
                            <foreignObject
                                width={'100%'}
                                height={dimensions.height}
                                y={0}

                                overflow={'auto'}
                            >
                                <div style={{
                                    overflowX: 'auto',
                                    height: '100%',
                                    width: '100%',
                                    overflowY: 'hidden',
                                    padding: '16px 8px 8px 8px'
                                }}>
                                    <svg
                                        overflow={'visible'}
                                        width={(((dimensions.width) / props.data.length) + props.data.length - 1) * props.data.length}
                                        height={'100%'}

                                    >
                                        {points.map((p, i) => (
                                            <g key={props.id + '-point-' + i}>
                                                <Line
                                                    value={props.value} axis={props.axis}
                                                    dimensions={dimensions} last={i > 0 ? points[i - 1] : undefined}
                                                    point={p} data={props.data[i]}
                                                    id={props.id + '-marker-' + i}
                                                />
                                            </g>
                                        ))}
                                    </svg>
                                </div>
                            </foreignObject>

                        </svg>
                    </div>
                    <div className={styles.valuesLabel}>
                        {props.value.label}
                    </div>
                </>
            }

        </div>
    )
}
LineChart.propTypes = {
    id: PropTypes.string,
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
