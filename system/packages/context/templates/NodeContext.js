import {CropRounded, DeleteRounded, EditRounded, FileCopyRounded} from "@material-ui/icons";
import {v4 as uuid4} from "uuid";
import PropTypes from "prop-types";

export default function NodeContext(props) {
    return [
        {
            label: 'Manipular',
            children: [
                {
                    label: props.selectedNodes.length > 1 ? 'Recortar selecionados' : 'Recortar',
                    icon: <CropRounded/>,
                    onClick: (event, nodeID) => {
                        const node = props.openPage.nodes.find(e => nodeID.includes(e.id))
                        props.setCopiedNode(node)

                        props.dispatchPage({
                            action: props.actions.REMOVE_NODE,
                            payload: {
                                id: props.openPage.id,
                                nodeID: nodeID
                            }
                        })
                    },
                    shortcutButtons: ['ctrl', 'x'],
                    key: uuid4().toString()
                },
                {
                    label: props.selectedNodes.length > 1 ? 'Copiar selecionados' : 'Copiar',
                    icon: <FileCopyRounded/>,
                    onClick: (event, nodeID) => {
                        props.setCopiedNode(props.openPage.nodes.find(node => nodeID === node.id))
                    },
                    shortcutButtons: ['ctrl', 'c'],
                    key: uuid4().toString()
                },
                {
                    label: props.selectedNodes.length > 1 ? 'Deletar selecionados' : 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (event, nodeID) => {
                        let indexes =[]

                        props.selectedNodes.forEach((e, i) => {
                            indexes.push(i)
                        })
                        indexes.push(props.openPage.nodes.findIndex(e => nodeID.includes(e.id)))

                        indexes.forEach(e => {
                            props.dispatchPage({
                                action: props.actions.REMOVE_NODE,
                                payload: {
                                    id: props.openPage.id,
                                    nodeID: props.openPage.nodes[e].id
                                }
                            })
                        })

                    },
                    shortcutButtons: ['del'],
                    key: uuid4().toString()

                },
            ]
        },
        props.selectedNodes.length > 1 ? {} : {
            label: 'Personalizar',
            children: [
                {
                    label: 'Editar',
                    icon: <EditRounded/>,
                    onClick: (event, nodeID) => {
                        props.selectNode(props.openPage.nodes.find((node, i) => nodeID === node.id), true)
                    },
                    key: uuid4().toString()
                },
            ]
        }
    ]
}

NodeContext.propTypes={
    openPage: PropTypes.object,
    dispatchPage: PropTypes.func,
    actions: PropTypes.object,

    scale: PropTypes.number,
    setScale: PropTypes.func,

    copiedNode: PropTypes.object,
    setCopiedNode: PropTypes.func,

    selectedNodes: PropTypes.array,
    unselectNode: PropTypes.func,
    selectNode: PropTypes.func
}