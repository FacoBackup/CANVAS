import PropTypes from 'prop-types'
import styles from "../styles/Content.module.css";
import ToolTip from "../../tooltip/ToolTip";
import {useRef} from "react";

export default function Content(props) {
    const ref = useRef()
    return (
        <div className={styles.graphs} ref={ref}>

                {props.data.map((d, index) => (
                    <>
                        <div style={{
                            width: `${((d[props.value.field] / props.iterations.length) / (props.biggest / props.iterations.length)) * 100}%`,
                            color: (1.5 / (index + 1)) < .5 ? '#333333' : undefined
                        }} className={styles.data}/>
                        <ToolTip color={'#f4f5fa'}>
                            <div className={styles.overview}>
                                <div className={styles.toolTipAxis}>
                                    {props.axis.label}: {d[props.axis.field]}
                                </div>
                                <div className={styles.toolTipValue}>
                                    {props.value.label}: {d[props.value.field]}
                                </div>
                            </div>
                        </ToolTip>
                    </>
                ))}

            <div className={styles.values}>
                {props.iterations.map((e, i) => (

                    <div className={styles.divider} style={{left: (i * 10) + '%'}}>
                        <div style={{transform: 'translateY(100%)'}}>
                            {e}
                        </div>
                    </div>

                ))}
            </div>
        </div>
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
    iterations: PropTypes.number,
    biggest: PropTypes.number
}