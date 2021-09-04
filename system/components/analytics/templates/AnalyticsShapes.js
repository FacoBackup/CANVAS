import styles from '../../shared/styles/Shapes.module.css'
import PropTypes from 'prop-types'
import Accordion from "../../shared/templates/Accordion";
import {BarChartRounded, PieChartRounded, ShowChartRounded} from "@material-ui/icons";
import PlaceNewAnalyticChart from "../utils/PlaceNewAnalyticChart";

export default function AnalyticsShapes(props) {
    const drag = (event, shape) => {
        PlaceNewAnalyticChart({
            event: event,
            scale: props.scale,
            element: document.getElementById(shape + '-draggable'),
            variant: shape,
            data: props.data,
            setData: props.setData
        })
    }
    return (

        <Accordion {...props} label={'Módulos'} >
            <div className={styles.shapes}>
                <div
                    className={styles.shapeContainer}
                    id={'bar-vertical-draggable'}
                    onMouseDown={event => drag(event, 'bar-vertical')}
                >
                    <div>
                        <BarChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'bar-horizontal-draggable'}
                    onMouseDown={event => drag(event, 'bar-horizontal')}
                >
                    <div>
                        <BarChartRounded style={{transform: 'rotate(90deg)', fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'line-draggable'}
                    onMouseDown={event => drag(event, 'line')}
                >
                    <div>
                        <ShowChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'pie-draggable'}
                    onMouseDown={event => drag(event, 'pie')}
                >
                    <div>
                        <PieChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                </div>

            </div>
        </Accordion>
    )

}

AnalyticsShapes.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    scale: PropTypes.number
}