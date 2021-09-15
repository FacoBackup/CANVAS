import styles from '../../shared/styles/Shapes.module.css'
import PropTypes from 'prop-types'
import Accordion from "../../shared/templates/tools/Accordion";
import {BarChartRounded, PieChartRounded, ShowChartRounded, TimelineRounded} from "@material-ui/icons";
import PlaceNewAnalyticChart from "../utils/PlaceNewAnalyticChart";
import ToolTip from "../../../chart/tooltip/ToolTip";

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

        <>
            <div className={styles.shapes}>
                <div
                    className={styles.shapeContainer}
                    id={'bar-vertical-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'bar-vertical')
                    }}
                    onClick={() => {

                        let newPage = {...props.data}
                        props.selectedNodes.forEach(e => newPage.nodes[e.index].variant = 'bar-vertical')
                        props.setData(newPage)

                    }}
                    draggable={true}
                >
                    <div>
                        <BarChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                    <ToolTip content={'Vertical bar chart'}/>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'bar-horizontal-draggable'}
                    draggable={true}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'bar-horizontal')
                    }}
                    onClick={() => {

                        let newPage = {...props.data}
                        props.selectedNodes.forEach(e => newPage.nodes[e.index].variant = 'bar-horizontal')
                        props.setData(newPage)

                    }}
                >
                    <div>
                        <BarChartRounded style={{transform: 'rotate(90deg)', fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                    <ToolTip content={'Horizontal bar chart'}/>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'line-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'line')
                    }}
                    onClick={() => {

                        let newPage = {...props.data}
                        props.selectedNodes.forEach(e => newPage.nodes[e.index].variant = 'line')
                        props.setData(newPage)

                    }}
                    draggable={true}
                >
                    <div>
                        <TimelineRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                    <ToolTip content={'Line chart'}/>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'pie-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'pie')
                    }}
                    onClick={() => {

                        let newPage = {...props.data}
                        props.selectedNodes.forEach(e => newPage.nodes[e.index].variant = 'pie')
                        props.setData(newPage)

                    }}
                    draggable={true}
                >
                    <div>
                        <PieChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                    <ToolTip content={'Pie chart'}/>
                </div>

            </div>
        </>
    )

}

AnalyticsShapes.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    selectedNodes: PropTypes.array
}