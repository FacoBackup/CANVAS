import getPercentage from "../../shared/getPercentage";
import styles from "../styles/Horizontal.module.css";
import ToolTip from "../../tooltip/ToolTip";
import PropTypes from "prop-types";
import {useRef} from "react";

export default function Row(props){
    const ref=useRef()
    return(
        <g>


            <rect
                x={props.offset}
                width={getPercentage(props.value, props.biggest, props.width) }
                height={20}
                y={20 * (props.index) + ((props.index + 1) * 20 / 2)}
                fill={props.color}
                stroke={props.color}
                strokeWidth={2}
                fillOpacity={props.value/props.biggest}
                markerEnd={ref.current}
            />
            <title>props.value</title>
            <ToolTip color={'#f4f5fa'}>
                <div className={styles.overview}>
                    <div className={styles.toolTipAxis}>
                        {props.axisLabel}: {props.axis}
                    </div>
                    <div className={styles.toolTipValue}>
                        {props.valueLabel}: {props.value}
                    </div>
                </div>
            </ToolTip>
        </g>
    )
}

Row.propTypes={
    width: PropTypes.number,
    index: PropTypes.number,
    axis:PropTypes.string,
    axisLabel:PropTypes.string,
    value:PropTypes.number,
    valueLabel:PropTypes.string,
    biggest: PropTypes.number,
    color: PropTypes.string,
    offset: PropTypes.number
}

