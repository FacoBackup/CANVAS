import PropTypes from 'prop-types'
import {v4 as uuid4} from "uuid";

export default function PlaceNewAnalyticChart(props) {
    let moving = true
    const root = document.getElementById('frame')

    const element = props.element.cloneNode(true)
    const newWrapper = document.createElement('div')
    document.body.appendChild(newWrapper)


    newWrapper.appendChild(element)
    newWrapper.style.position = 'fixed'
    newWrapper.style.zIndex = '999'
    newWrapper.style.top = (props.event.clientY - 80) + 'px'
    newWrapper.style.left = (props.event.clientX - 80) + 'px'
    newWrapper.firstChild.style.width = '160px'
    newWrapper.firstChild.style.display = 'flex'
    newWrapper.firstChild.style.alignItems = 'center'
    newWrapper.firstChild.style.height = '160px'
    newWrapper.firstChild.style.border = '#0095ff 2px dashed'
    console.log(newWrapper.firstChild.firstChild.firstChild.style)
    newWrapper.firstChild.firstChild.firstChild.style.fontSize = '80px'
    newWrapper.firstChild.style.cursor = 'grabbing'

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

            document.body.removeChild(newWrapper)
            if (document.elementsFromPoint(event.clientX, event.clientY).includes(document.getElementById('engine-content')) && root !== undefined) {
                event.target.style.background = "";
                const rootBounding = {
                    x: root.getBoundingClientRect().left,
                    y: root.getBoundingClientRect().top
                }
                props.setData(({
                    ...props.data,
                    nodes: [...props.data.nodes, ...[{
                        id: uuid4().toString(),
                        title: '',
                        richTitle: [],
                        description: null,
                        placement: {
                            x: (event.clientX - rootBounding.x + root.scrollLeft - 80),
                            y: (event.clientY - rootBounding.y + root.scrollTop - 80)
                        },
                        variant: props.variant,
                        creationDate: (new Date()).getTime(),
                        links: [],
                        dimensions: {
                            width: 160,
                            height: 160
                        },
                        styling: {
                            shape: 'rect',
                            border: 0,
                            color: '#0095ff',
                            borderWidth: 2
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

PlaceNewAnalyticChart.propTypes = {
    element: PropTypes.object,
    event: PropTypes.object,
    variant: PropTypes.string,
    setData: PropTypes.func,
    data: PropTypes.object
}
