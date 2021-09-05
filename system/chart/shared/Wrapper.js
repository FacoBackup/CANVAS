import PropTypes from 'prop-types'
import styles from "../horizontal/styles/Horizontal.module.css";

export default function Wrapper(props) {
    const offset = 35
    return (
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
                {iterations.map((e, i) => (
                    <g>
                        <line x1={(props.width * i) / 11 + offset - 8} y1={props.height - offset}
                              x2={(props.width * i) / 11 + offset - 8} y2={5} strokeWidth={1}
                              stroke={'#e0e0e0'} visibility={i > 0 ? 'visible' : 'hidden'}/>
                        <text x={(props.width * i) / 11 + offset} y={props.height - offset + 15}
                              className={styles.labels}
                        >{e}</text>
                    </g>
                ))}
                <text x={(props.width) / 2} y={props.height - 5}
                      className={styles.valuesLabel}>{props.value.label}</text>
            </g>

        </svg>
    )
}

Wrapper.propTypes = {
    children: PropTypes.node,
    columns: PropTypes.array,
    rows: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
}