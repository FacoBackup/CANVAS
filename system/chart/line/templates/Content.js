import PropTypes from 'prop-types'
import ToolTip from "../../tooltip/ToolTip";
import {useRef} from "react";
import styles from '../styles/Horizontal.module.css'
import getPath from "./getPath";

export default function Content(props) {
    const ref = useRef()
    const gap = 10
    return (
        <svg width={props.width } x={0}>
            <g className={styles.labels}>
                {/*{[].map((e, i) => (*/}
                {/*    <g>*/}

                {/*        <line x1={props.offset} x2={props.width - 5}*/}
                {/*              y1={(props.height - props.offset) * 0.1 * i + (props.offset-5)}*/}
                {/*              y2={(props.height - props.offset) * 0.1 * i + (props.offset-5)}*/}
                {/*              strokeWidth={1}*/}
                {/*              stroke={'green'}*/}
                {/*              visibility={i < (props.data.length - 1) ? 'visible' : 'hidden'}/>*/}
                {/*        <text*/}
                {/*            // height={props.height / (props.data.length) - 5}*/}
                {/*            y={((props.height - props.offset - 5) * i) / props.data.length + ((props.height - props.offset - 5) / (props.data.length)) / 2 + 8}*/}
                {/*            x={props.offset - 10} className={styles.labels}>{e}</text>*/}
                {/*    </g>*/}
                {/*))}*/}

                {/*<text x={-props.height / 2} y={12}*/}
                {/*    // y={props.height/2}*/}
                {/*      className={[styles.axisLabel, styles.valuesLabel].join(' ')}>{props.axis.label}</text>*/}
            </g>
            <g>
                <polyline points={getPath({
                    valueKey: props.value.field,
                    data: props.data,
                    width: props.width,
                    offset: props.offset,
                    biggest: props.biggest,
                    height: props.height
                })}
                         fill={'transparent'} stroke={"#0095ff"} strokeWidth={2} />
            </g>
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
    iterations: PropTypes.number,
    biggest: PropTypes.number
}