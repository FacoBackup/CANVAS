import PropTypes from 'prop-types'
import ToolTip from "../../tooltip/ToolTip";
import {useEffect, useRef, useState} from "react";
import styles from '../styles/Horizontal.module.css'
import getPercentage from "../../shared/getPercentage";
import Row from "./Row";

export default function Content(props) {
    const ref = useRef()
    const random_hex_color_code = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };
    const [color, setColor] = useState()
    useEffect(() => {
        setColor(random_hex_color_code())
    }, [])

    return (
        <svg ref={ref}>
            <g className={styles.labels}>
                {props.data.map((e, i) => (

                    <text
                        y={20 * (i) + ((i + 1) * 20 / 2) + 20 / 2}
                        x={props.offset - 10} className={styles.labels}>{e[props.axis.field]}</text>

                ))}

            </g>
            {props.data.map((e, i) => (
                e[props.value.field] !== undefined ?
                    <Row
                        biggest={props.biggest} axis={e[props.axis.field]}
                        value={parseInt(e[props.value.field])} color={color} axisLabel={props.axis.label}
                        index={i} valueLabel={props.value.label}
                        offset={props.offset}
                        width={(props.width - props.offset - 35)}
                    />
                    :
                    null
            ))}
        </svg>
    )
}
Content.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    offset: PropTypes.number,
    biggest: PropTypes.number
}