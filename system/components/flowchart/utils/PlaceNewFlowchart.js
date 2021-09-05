import PropTypes from 'prop-types'
import {v4 as uuid4} from "uuid";

export default function PlaceNewFlowchart(props) {
    let moving = true
    const root = document.getElementById('frame')
    const getDimensions = () => {
        let res = {}
        switch (true) {

            case props.type.includes('rect') || props.type.includes('parallelogram') || props.type.includes('trapezoid') || props.type.includes('ellipse') || props.type.includes('relationship'): {
                res = {
                    width: 160,
                    height: 80
                }
                break
            }
            case props.type.includes('square') || props.type.includes('triangle') || props.type.includes('circle') : {
                res = {
                    width: 80,
                    height: 80,
                }
                break
            }
            default:
                break
        }
        return res
    }
    const getVariant = () => {
        let res
        switch (true) {
            case props.type.includes('ellipse') || props.type.includes('circle'): {
                res = 'ellipse'
                break
            }
            case props.type.includes('rect') || props.type.includes('square'): {
                res = 'rect'
                break
            }
            case props.type.includes('relationship') || props.type.includes('triangle') || props.type.includes('parallelogram') || props.type.includes('trapezoid'): {
                res = 'polygon'
                break
            }
            default:
                break
        }
        return res
    }

    const dimensions = getDimensions()
    const variant = getVariant()
    const element = props.element.firstChild.cloneNode(true)
    console.log(props.element.id)
    console.log(props.element.children)
    const newWrapper = document.createElement('div')
    document.body.appendChild(newWrapper)


    newWrapper.appendChild(element)
    newWrapper.style.position = 'fixed'
    newWrapper.style.zIndex = '999'
    newWrapper.style.top = (props.event.clientY - dimensions.height / 2) + 'px'
    newWrapper.style.left = (props.event.clientX - dimensions.width / 2) + 'px'
    newWrapper.firstChild.setAttribute('width', dimensions.width)
    newWrapper.firstChild.setAttribute('height', dimensions.height)
    newWrapper.firstChild.setAttribute('stroke-dasharray', '5,5')
    newWrapper.firstChild.firstChild.setAttribute('fill', 'transparent')
    newWrapper.style.cursor = 'grabbing'

    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }

    document.addEventListener('mousemove', function movingNew(event) {
        if (moving)
            move(event)
        else
            event.currentTarget.removeEventListener('mousemove', movingNew);
    })
    document.addEventListener("mouseup", event => {

        if (moving) {
            const elements = document.elementsFromPoint(event.clientX, event.clientY)
            document.body.removeChild(newWrapper)
            if (elements.length >= 2 && elements[3].id === 'engine-content' && root !== undefined) {

                event.target.style.background = "";
                const rootBounding = {
                    x: root.getBoundingClientRect().left,
                    y: root.getBoundingClientRect().top
                }
                console.log(rootBounding)
                props.setData(({
                    ...props.data,
                    nodes: [...props.data.nodes, ...[{
                        id: uuid4().toString(),
                        title: '',
                        richTitle: [],
                        description: null,
                        placement: {
                            x: (event.clientX - rootBounding.x + root.scrollLeft -dimensions.width/2) / props.scale,
                            y: (event.clientY - rootBounding.y + root.scrollTop -dimensions.height/2) / props.scale
                        },
                        shapeVariant: variant,
                        creationDate: (new Date()).getTime(),
                        links: [],
                        dimensions: dimensions,
                        styling: {
                            shape: props.type,
                            borderRadius: 0,
                            strokeWidth: 2,
                            color: '#0095ff',

                        }
                    }]]
                }))
            }

            moving = false
        }

    }, {once: true})

    function move(event) {
        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }

        let placementX = newWrapper.offsetLeft - newPlacement.x
        let placementY = newWrapper.offsetTop - newPlacement.y


        newWrapper.style.top = placementY + 'px'
        newWrapper.style.left = placementX + 'px'

    }
}

PlaceNewFlowchart.propTypes = {
    element: PropTypes.object,
    scale: PropTypes.number,
    event: PropTypes.object,
    type: PropTypes.string,
    setData: PropTypes.func,
    data: PropTypes.object
}
