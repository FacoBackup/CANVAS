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
    const [biggest, setBiggest] = useState(null)
    const offset = 35
    const graphRef = useRef()
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
            setBiggest(value)
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
                <div style={{ height: props.height + 'px', overflow: 'hidden'}}>
                    <svg
                        width={'100%'}
                        overflow={'visible'}
                        // height={0}
                        style={{position: 'absolute', zIndex: 0, padding: '0 35px 0 35px'}}
                    >
                        <g style={{stroke: '#e0e0e0', fill: '#e0e0e0', strokeWidth: '1', fontSize: '10px'}}>
                            <line x1={0} x2={0} y1={0} y2={props.height - 20}/>

                        </g>

                        <g style={{stroke: '#e0e0e0', fill: '#e0e0e0', strokeWidth: '1', fontSize: '10px'}}>
                            <line x1={'50%'} x2={'50%'} y1={0} y2={props.height - 20}/>

                        </g>
                        <g style={{stroke: '#e0e0e0', fill: '#e0e0e0', strokeWidth: '1', fontSize: '10px'}}>
                            <line x1={'100%'} x2={'100%'} y1={0} y2={props.height - 20}/>

                        </g>
                    </svg>
                    <div style={{overflowY: 'auto', height: (props.height - 20) + 'px'}}>

                        <svg
                            width={props.width - 35}
                            overflow={'visible'}
                            style={{position: 'relative', zIndex: 10}}
                            height={(props.data.length - 1) * 30}
                        >

                            <Content {...props}
                                     data={sortedData} biggest={biggest}
                                     offset={offset}/>
                        </svg>
                    </div>
                    <div
                        ref={graphRef}
                        style={{
                            width: '100%',
                            height: props.height + 'px',
                            overflow: 'visible', padding: '0 35px 0 35px',

                        }}>
                        <svg
                            width={'100%'}
                            overflow={'visible'}
                            height={'20'}
                            style={{borderTop: '#e0e0e0 1px solid'}}
                        >
                            <text x={0} y={14} textAnchor={'middle'} fill={'#555555'} style={{fontSize: '10px'}}>
                                0
                            </text>
                            <text x={'50%'} y={14} textAnchor={'middle'} fill={'#555555'} style={{fontSize: '10px'}}>
                                {biggest / 2}
                            </text>


                            <text x={'100%'} y={14} textAnchor={'middle'} fill={'#555555'} style={{fontSize: '10px'}}>
                                {biggest}
                            </text>

                        </svg>
                    </div>
                </div>
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
