import styles from '../../shared/styles/Shapes.module.css'
import PropTypes from 'prop-types'
import ShapeWrapper from "../../../packages/shape/ShapeWrapper";
import {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import getNewNode from "../../shared/utils/getNewNode";

export default function FlowchartShapes(props) {
    const draggableRef = useRef()
    const handleDrag = (event, logo, value, target) => {
        draggableRef.current.style.display = 'flex'

        ReactDOM.render(
            logo,
            draggableRef.current
        )

        switch (true) {
            case value.includes('rect') || value.includes('parallelogram') || value.includes('trapezoid') || value.includes('ellipse') || value.includes('relationship'): {
                draggableRef.current.firstChild.setAttribute('width', 160)
                draggableRef.current.firstChild.setAttribute('height', 80)
                draggableRef.current.firstChild.firstChild.setAttribute('stroke-dasharray', '5,5')
                draggableRef.current.style.width = '160px'
                draggableRef.current.style.height = '80px'

                break
            }
            case value.includes('square') || value.includes('triangle') || value.includes('circle') : {
                draggableRef.current.firstChild.setAttribute('width', 80)
                draggableRef.current.firstChild.setAttribute('height', 80)
                draggableRef.current.firstChild.firstChild.setAttribute('stroke-dasharray', '5,5')
                draggableRef.current.style.width = '80px'
                draggableRef.current.style.height = '80px'

                break
            }
            default:
                break
        }

        draggableRef.current.style.top = (event.clientY - draggableRef.current.offsetHeight / 2) + 'px'
        draggableRef.current.style.left = (event.clientX - draggableRef.current.offsetWidth / 2) + 'px'

    }
    const handleDrop = (event, shape) => {
        const root = document.getElementById('frame')

        if (document.elementsFromPoint(event.clientX, event.clientY).includes(root)) {
            event.target.style.background = "";
            const rootBounding = {
                x: root.getBoundingClientRect().left,
                y: root.getBoundingClientRect().top
            }
            const placement = {
                x: (event.clientX - rootBounding.x + root.scrollLeft),
                y: (event.clientY - rootBounding.y + root.scrollTop)
            }

            props.dispatchPage({
                action: props.actions.ADD_NODE,
                payload: {id: props.openPage.id, node: {...getNewNode(undefined, shape, placement)}}
            })

        }


        draggableRef.current.style.display = 'none'
        ReactDOM.unmountComponentAtNode(
            draggableRef.current
        )
    }

    const [canDrag, setCanDrag] = useState(false)

    useEffect(() => {
        draggableRef.current = document.createElement('span')
        // draggableRef.current.classList.add(styles.shapeWrapper)
        draggableRef.current.style.position = 'absolute'
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
        <div className={styles.shapes}>
            <ShapeWrapper
                scale={props.scale} canDrag={canDrag} onMove={onMove}
                handleDrag={handleDrag} handleDrop={handleDrop}
                onClick={() => {
                    if (props.selectedNodes !== undefined) {
                        let newPage = {...props.openPage}
                        props.selectedNodes.forEach(e => {
                            newPage.nodes[e.index].styling.shape = 'square'
                            newPage.nodes[e.index].shapeVariant = 'rect'
                        })

                        props.setData(newPage)
                    }
                }}
                targetID={'draggable-shape'} data={props.openPage}
                content={
                    <svg overflow={'visible'} width={'100%'} height={'100%'} viewBox={'0 0 100 100'}>
                        <rect fill={'white'} x={0} y={0} width={'100'} height={'100'} stroke={"#0095ff"}
                              strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                } label={'Square'}
                value={'square'}
            />

            <ShapeWrapper
                scale={props.scale} canDrag={canDrag} onMove={onMove}
                handleDrag={handleDrag} handleDrop={handleDrop}
                onClick={() => {
                    if (props.selectedNodes !== undefined) {
                        let newPage = {...props.openPage}
                        props.selectedNodes.forEach(e => {
                            newPage.nodes[e.index].styling.shape = 'rect'
                            newPage.nodes[e.index].shapeVariant = 'rect'
                        })

                        props.setData(newPage)
                    }
                }}
                targetID={'draggable-shape'} data={props.openPage}
                content={
                    <svg overflow={'visible'} width={'100%'} height={'45'} viewBox={'0 0 200 100'}>
                        <rect fill={'white'} x={0} y={0} width={'200'} height={'100'} stroke={"#0095ff"}
                              strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                } label={'Rectangle'}
                value={'rect'}
            />

            <ShapeWrapper
                scale={props.scale} canDrag={canDrag} onMove={onMove}
                handleDrag={handleDrag} handleDrop={handleDrop}
                onClick={() => {
                    if (props.selectedNodes !== undefined) {
                        let newPage = {...props.openPage}
                        props.selectedNodes.forEach(e => {
                            newPage.nodes[e.index].styling.shape = 'circle'
                            newPage.nodes[e.index].shapeVariant = 'ellipse'
                        })

                        props.setData(newPage)
                    }
                }}
                targetID={'draggable-shape'} data={props.openPage}
                content={
                    <svg overflow={'visible'} width={'45px'} height={'45px'} viewBox={'0 0 100 100'}>
                        <circle fill={'white'} cx={'50%'} cy={'50%'} r={'50%'} stroke={"#0095ff"}
                                strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                } label={'Circle'}
                value={'circle'}
            />
            <ShapeWrapper
                scale={props.scale} canDrag={canDrag} onMove={onMove}
                handleDrag={handleDrag} handleDrop={handleDrop}
                targetID={'draggable-shape'} data={props.openPage}
                onClick={() => {
                    if (props.selectedNodes !== undefined) {
                        let newPage = {...props.openPage}
                        props.selectedNodes.forEach(e => {
                            newPage.nodes[e.index].styling.shape = 'ellipse'
                            newPage.nodes[e.index].shapeVariant = 'ellipse'
                        })

                        props.setData(newPage)
                    }
                }}
                content={
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 200 100'}>

                        <ellipse cx={'50%'} cy={'50%'} rx={'50%'} ry={'50%'} stroke={'#0095ff'} fill={'white'}
                                 strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                } label={'Ellipse'}
                value={'ellipse'}
            />

            <ShapeWrapper
                scale={props.scale} canDrag={canDrag} onMove={onMove}
                handleDrag={handleDrag} handleDrop={handleDrop}
                targetID={'draggable-shape'} data={props.openPage}
                onClick={() => {
                    if (props.selectedNodes !== undefined) {
                        let newPage = {...props.openPage}
                        props.selectedNodes.forEach(e => {
                            newPage.nodes[e.index].styling.shape = 'trapezoid'
                            newPage.nodes[e.index].shapeVariant = 'polygon'
                        })

                        props.setData(newPage)
                    }
                }}
                content={
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 200 100">
                        <polygon points={'200,100 0,100 50,0 150,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke"
                                 fill={'white'}/>
                    </svg>
                } label={'Trapezoid'}
                value={'trapezoid'}
            />


            <ShapeWrapper
                scale={props.scale} canDrag={canDrag} onMove={onMove}
                handleDrag={handleDrag} handleDrop={handleDrop}
                targetID={'draggable-shape'} data={props.openPage}
                onClick={() => {
                    if (props.selectedNodes !== undefined) {
                        let newPage = {...props.openPage}
                        props.selectedNodes.forEach(e => {
                            newPage.nodes[e.index].styling.shape = 'parallelogram'
                            newPage.nodes[e.index].shapeVariant = 'polygon'
                        })

                        props.setData(newPage)
                    }
                }}
                content={
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 200 100'}>
                        {/*<polygon points={'50,100 0,0 150,0 200,100'} stroke={'#0095ff'} strokeWidth={'2px'}*/}
                        {/*         vectorEffect="non-scaling-stroke" fill={'white'}/>*/}
                        <polygon points={'0,100 50,0 200,0 150,100'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke" fill={'white'}/>
                    </svg>
                } label={'Parallelogram'}
                value={'parallelogram'}
            />

            <ShapeWrapper
                scale={props.scale} canDrag={canDrag} onMove={onMove}
                handleDrag={handleDrag} handleDrop={handleDrop}
                targetID={'draggable-shape'} data={props.openPage}
                onClick={() => {
                    if (props.selectedNodes !== undefined) {
                        let newPage = {...props.openPage}
                        props.selectedNodes.forEach(e => {
                            newPage.nodes[e.index].styling.shape = 'triangle'
                            newPage.nodes[e.index].shapeVariant = 'polygon'
                        })

                        props.setData(newPage)
                    }
                }}
                content={
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100">
                        <polygon points={'100,100 0,100 50,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke" fill={'white'}/>
                    </svg>
                } label={'Triangle'}
                value={'triangle'}
            />
            <ShapeWrapper
                scale={props.scale} canDrag={canDrag} onMove={onMove}
                handleDrag={handleDrag} handleDrop={handleDrop}
                targetID={'draggable-shape'} data={props.openPage}
                onClick={() => {
                    if (props.selectedNodes !== undefined) {
                        let newPage = {...props.openPage}
                        props.selectedNodes.forEach(e => {
                            newPage.nodes[e.index].styling.shape = 'relationship'
                            newPage.nodes[e.index].shapeVariant = 'polygon'
                        })

                        props.setData(newPage)
                    }
                }}
                content={
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 200 100">
                        <polygon points={'0,50 100,100 200,50 100,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke"
                                 fill={'white'}/>
                    </svg>
                } label={'Relationship'}
                value={'relationship'}
            />


        </div>
    )

}

FlowchartShapes.propTypes = {
    actions: PropTypes.object,
    dispatchPage: PropTypes.func,
    openPage: PropTypes.object,
    selectedNodes: PropTypes.array,
    scale: PropTypes.number
}