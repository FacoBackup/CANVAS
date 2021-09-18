import {AddRounded, FileCopyRounded, ZoomInRounded, ZoomOutRounded} from "@material-ui/icons";
import {v4 as uuid4} from "uuid";
import PropTypes from "prop-types";

export default function CanvasContext(props) {
    return [
        {
            label: 'Zoom',
            children: [
                {
                    label: 'Aumentar',
                    icon: <ZoomOutRounded/>,
                    onClick: () => props.setScale(props.scale - .25),
                    getDisabled: () => props.scale === .5,
                    key: uuid4().toString()
                },
                {
                    label: 'Reduzir',
                    icon: <ZoomInRounded/>,
                    onClick: () => props.setScale(props.scale + .25),
                    getDisabled: () => props.scale === 2,
                    key: uuid4().toString()
                },
            ]
        },
        {
            label: 'Manipular modulos',
            children: [
                {
                    label: 'Adicionar novo módulo',
                    icon: <AddRounded/>,
                    onClick: () => null,
                    key: uuid4().toString()

                },
                {
                    label: 'Colar',
                    icon: <FileCopyRounded/>,
                    onClick: (event) => {
                        let newNode = {...props.copiedNode}
                        const frameContent = document.getElementById('engine-content')
                        const frame = document.getElementById('frame')
                        newNode.id = uuid4().toString()
                        newNode.placement = {
                            x: event.clientX - frameContent.getBoundingClientRect().left + frame.scrollLeft - newNode.dimensions.width / 2,
                            y: event.clientY - frameContent.getBoundingClientRect().top + frame.scrollTop - newNode.dimensions.height / 2
                        }

                        props.dispatchPage({
                            action: props.actions.ADD_NODE,
                            payload: {
                                id: props.openPage.id,
                                data: newNode
                            }
                        })


                        props.setCopiedNode(null)
                    },
                    getDisabled: (props) => props.copiedNode === null,
                    key: uuid4().toString()
                }
            ]
        }
    ]
}

CanvasContext.propTypes = {
    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    scale: PropTypes.number,
    setScale: PropTypes.func,

    copiedNode: PropTypes.object,
    setCopiedNode: PropTypes.func,

}