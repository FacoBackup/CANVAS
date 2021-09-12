import styles from '../../shared/styles/Shapes.module.css'
import PropTypes from 'prop-types'
import Accordion from "../../shared/templates/tools/Accordion";
import {BarChartRounded, PieChartRounded, ShowChartRounded} from "@material-ui/icons";
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
    console.log(props.data)
    return (

        <Accordion {...props} label={'Módulos'} >
            <div className={styles.shapes}>
                <div
                    className={styles.shapeContainer}
                    id={'bar-vertical-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'bar-vertical')
                    }}
                    onClick={() => {
                        if(props.selectedNode !== undefined){
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].variant = 'bar-vertical'
                            props.setData(newPage)
                        }
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
                        if(props.selectedNode !== undefined){
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].variant = 'bar-horizontal'
                            props.setData(newPage)
                        }
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
                        if(props.selectedNode !== undefined){
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].variant = 'line'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <div>
                        <ShowChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
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
                        if(props.selectedNode !== undefined){
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].variant = 'pie'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <div>
                        <PieChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    </div>
                    <ToolTip content={'Pie chart'}/>
                </div>

            </div>
        </Accordion>
    )

}

AnalyticsShapes.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    selectedNode: PropTypes.object
}