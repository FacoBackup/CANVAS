import {AddRounded, FileCopyRounded, ZoomInRounded, ZoomOutRounded} from "@material-ui/icons";
import {v4 as uuid4} from "uuid";

export default [
    {
        label: 'Zoom',
        children: [
            {
                label: 'Aumentar',
                icon: <ZoomOutRounded/>,
                onClick: (props) => props.setScale(props.scale - .25),
                getDisabled: (props) => props.scale === .5,
                key: 'canvas-1'
            },
            {
                label: 'Reduzir',
                icon: <ZoomInRounded/>,
                onClick: (props) => props.setScale(props.scale + .25),
                getDisabled: (props) => props.scale === 2,
                key: 'canvas-2'
            },
        ]
    },
    {
        label: 'Manipular modulos',
        children: [
            {
                label: 'Adicionar novo módulo',
                icon: <AddRounded/>,
                onClick: (props) => null,
                key: 'canvas-3'

            },
            {
                label: 'Colar',
                icon: <FileCopyRounded/>,
                onClick: (props, event) => {
                    let newNode = {...props.copiedNode}
                    const frameContent = document.getElementById('frame-content')
                    const frame = document.getElementById('frame')
                    newNode.id = uuid4().toString()
                    newNode.placement = {
                        x: event.clientX - frameContent.getBoundingClientRect().left + frame.scrollLeft - newNode.dimensions.width/2,
                        y: event.clientY - frameContent.getBoundingClientRect().top + frame.scrollTop - newNode.dimensions.height/2
                    }
                    let newNodes = [...props.data.nodes]

                    newNodes.push(newNode)

                    props.setData({
                        ...props.data,
                        nodes: newNodes
                    })
                    props.setCopiedNode(null)
                },
                getDisabled: (props) => props.copiedNode === null,
                key: 'canvas-4'
            }
        ]
    }


]