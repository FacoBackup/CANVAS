import styles from '../../shared/styles/Shapes.module.css'
import PropTypes from 'prop-types'
import Accordion from "../../shared/templates/tools/Accordion";
import PlaceNewFlowchart from "../utils/PlaceNewFlowchart";
import ToolTip from "../../../chart/tooltip/ToolTip";

export default function FlowchartShapes(props) {
    const drag = (event, shape) => {
        PlaceNewFlowchart({
            event: event,
            scale: props.scale,
            element: document.getElementById(shape + '-draggable'),
            type: shape,
            data: props.data,
            setData: props.setData
        })
    }
    return (

        <Accordion {...props} label={'Módulos'}>
            <div className={styles.shapes}>
                <div
                    className={styles.shapeContainer}
                    id={'rect-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'rect')
                    }}
                    onClick={() => {
                        if (props.selectedNode !== undefined) {
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].shapeVariant = 'rect'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 200 100'}>
                        <rect fill={'white'} x={0} y={0} width={'100%'} height={'100%'} stroke={"#0095ff"}
                              strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <ToolTip content={'Rectangle'}/>

                </div>
                <div
                    className={styles.shapeContainer}
                    id={'square-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'square')
                    }}
                    onClick={() => {
                        if (props.selectedNode !== undefined) {
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].shapeVariant = 'square'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <svg overflow={'visible'} width={'45px'} height={'45px'} viewBox={'0 0 100 100'}>
                        <rect fill={'white'} width={'100%'} height={'100%'} stroke={"#0095ff"} strokeWidth={2}
                              vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <ToolTip content={'Square'}/>

                </div>

                <div
                    className={styles.shapeContainer}
                    id={'circle-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'circle')
                    }}
                    onClick={() => {
                        if (props.selectedNode !== undefined) {
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].shapeVariant = 'circle'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <svg overflow={'visible'} width={'45px'} height={'45px'} viewBox={'0 0 100 100'}>
                        <circle fill={'white'} cx={'50%'} cy={'50%'} r={'50%'} stroke={"#0095ff"}
                                strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <ToolTip content={'Circle'}/>

                </div>
                <div
                    className={styles.shapeContainer}
                    id={'ellipse-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'ellipse')
                    }}
                    onClick={() => {
                        if (props.selectedNode !== undefined) {
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].shapeVariant = 'ellipse'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 200 100'}>

                        <ellipse cx={'50%'} cy={'50%'} rx={'50%'} ry={'50%'} stroke={'#0095ff'} fill={'white'}
                                 strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <ToolTip content={'Ellipse'}/>

                </div>

                <div
                    className={styles.shapeContainer}
                    id={'trapezoid-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'trapezoid')
                    }}
                    onClick={() => {
                        if (props.selectedNode !== undefined) {
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].shapeVariant = 'trapezoid'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 200 100">
                        <polygon points={'200,100 0,100 50,0 150,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke"
                                 fill={'white'}/>
                    </svg>
                    <ToolTip content={'Trapezoid'}/>

                </div>
                <div
                    className={styles.shapeContainer}
                    id={'parallelogram-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'parallelogram')
                    }}
                    onClick={() => {
                        if (props.selectedNode !== undefined) {
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].shapeVariant = 'parallelogram'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 200 100'}>
                        {/*<polygon points={'50,100 0,0 150,0 200,100'} stroke={'#0095ff'} strokeWidth={'2px'}*/}
                        {/*         vectorEffect="non-scaling-stroke" fill={'white'}/>*/}
                        <polygon points={'0,100 50,0 200,0 150,100'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke" fill={'white'}/>
                    </svg>
                    <ToolTip content={'Parallelogram'}/>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'triangle-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'triangle')
                    }}
                    onClick={() => {
                        if (props.selectedNode !== undefined) {
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].shapeVariant = 'triangle'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100">
                        <polygon points={'100,100 0,100 50,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke" fill={'white'}/>
                    </svg>
                    <ToolTip content={'Triangle'}/>
                </div>

                <div
                    className={styles.shapeContainer}
                    id={'relationship-draggable'}
                    onDragStart={event => {
                        event.preventDefault()
                        drag(event, 'relationship')
                    }}
                    onClick={() => {
                        if (props.selectedNode !== undefined) {
                            let newPage = {...props.data}
                            newPage.nodes[props.selectedNode.index].shapeVariant = 'relationship'
                            props.setData(newPage)
                        }
                    }}
                    draggable={true}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 200 100">
                        <polygon points={'0,50 100,100 200,50 100,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke"
                                 fill={'white'}/>
                    </svg>
                    <ToolTip content={'Relationship'}/>
                </div>

            </div>
        </Accordion>
    )

}

FlowchartShapes.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    selectedNode: PropTypes.object
}