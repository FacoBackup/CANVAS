import styles from '../../shared/styles/Shapes.module.css'
import PropTypes from 'prop-types'
import {BarChartRounded, PieChartRounded, ShowChartRounded, TimelineRounded} from "@material-ui/icons";
import {useCallback, useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'
import getNewNode from "../../shared/utils/GetNewNode";
import ShapeWrapper from "../../../packages/shape/ShapeWrapper";

export default function AnalyticsShapes(props) {
    const draggableRef = useRef()
    const handleDrag = (event, logo) => {
        draggableRef.current.style.display = 'flex'
        draggableRef.current.style.top = (event.clientY - draggableRef.current.offsetHeight / 2) + 'px'
        draggableRef.current.style.left = (event.clientX - draggableRef.current.offsetWidth / 2) + 'px'

        ReactDOM.render(
            logo,
            draggableRef.current
        )
    }
    const handleDrop = useCallback((event, chart) => {
        const root = document.getElementById('frame')
        const dimensions = {width: 500, height: 250}

        if (document.elementsFromPoint(event.clientX, event.clientY).includes(root)) {
            event.target.style.background = "";
            const rootBounding = {
                x: root.getBoundingClientRect().left,
                y: root.getBoundingClientRect().top
            }
            const placement = {
                x: (event.clientX - rootBounding.x + root.scrollLeft - dimensions.width / 2),
                y: (event.clientY - rootBounding.y + root.scrollTop - dimensions.height / 2)
            }
            console.log(dimensions)
            console.log(rootBounding)
            console.log(event)
            console.log(props.scale)

            let newData = {...props.data}
            console.log(newData)
            newData.nodes.push({...getNewNode(dimensions, 'rect', placement), variant: chart})
            props.setData(newData)
        }

        draggableRef.current.style.display = 'none'
        ReactDOM.unmountComponentAtNode(
            draggableRef.current
        )
    }, [props.data])

    const [canDrag, setCanDrag] = useState(false)
    useEffect(() => {
        draggableRef.current = document.createElement('div')
        draggableRef.current.classList.add(styles.shapeWrapper)
        draggableRef.current.style.display = 'none'
        draggableRef.current.id = 'draggable-shape'
        document.body.appendChild(draggableRef.current)

        setCanDrag(true)

        return () => {
            document.body.removeChild(draggableRef.current)
        }
    }, [])
    const onMove = (e) => {
        draggableRef.current.style.left = e.placement.x + 'px'
        draggableRef.current.style.top = e.placement.y + 'px'
    }
    return (
        <>
            <div className={styles.shapes}>
                <ShapeWrapper
                    scale={1} canDrag={canDrag} onMove={onMove}
                    handleDrag={handleDrag} handleDrop={handleDrop}
                    targetID={'draggable-shape'}
                    content={
                        <BarChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    }
                    label={'Vertical Chart'}
                    value={'bar-vertical'}
                />
                <ShapeWrapper
                    scale={1} canDrag={canDrag} onMove={onMove}
                    handleDrag={handleDrag} handleDrop={handleDrop}
                    targetID={'draggable-shape'}

                    content={
                        <BarChartRounded
                            style={{transform: 'rotate(90deg)', fontSize: '2rem', color: '#0095ff'}}
                        />
                    }
                    label={'Horizontal Chart'}
                    value={'bar-horizontal'}
                />

                <ShapeWrapper
                    scale={1} canDrag={canDrag} onMove={onMove}
                    handleDrag={handleDrag} handleDrop={handleDrop}
                    targetID={'draggable-shape'}
                    content={
                        <TimelineRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    }
                    label={'Line Chart'}
                    value={'line'}
                />
                <ShapeWrapper
                    scale={1} canDrag={canDrag} onMove={onMove}
                    handleDrag={handleDrag} handleDrop={handleDrop}
                    targetID={'draggable-shape'}
                    content={
                        <PieChartRounded style={{fontSize: '2rem', color: '#0095ff'}}/>
                    }
                    label={'Pie Chart'}
                    value={'pie'}
                />
            </div>
        </>
    )

}

AnalyticsShapes.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    selectedNodes: PropTypes.array
}