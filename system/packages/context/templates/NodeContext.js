import {CropRounded, DeleteRounded, EditRounded, FileCopyRounded} from "@material-ui/icons";
import {v4 as uuid4} from "uuid";
export default function NodeContext(props) {
    return [
        {
            label: 'Manipular',
            children: [
                {
                    label: props.selectedNodes.length > 1 ? 'Recortar selecionados' : 'Recortar',
                    icon: <CropRounded/>,
                    onClick: (event, nodeID) => {

                        let index
                        props.data.nodes.forEach((node, i) => {
                            if (nodeID === node.id) {
                                props.setCopiedNode(node)
                                index = i
                            }
                        })

                        let newNodes = [...props.data.nodes]

                        newNodes.splice(index, 1)

                        props.setData({
                            ...props.data,
                            nodes: newNodes
                        })
                    },
                    shortcutButtons: ['ctrl', 'x'],
                    key: uuid4().toString()
                },
                {
                    label: props.selectedNodes.length > 1 ? 'Copiar selecionados' : 'Copiar',
                    icon: <FileCopyRounded/>,
                    onClick: (event, nodeID) => {
                        props.setCopiedNode(props.data.nodes.find(node => nodeID === node.id))
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
                        indexes.push(props.data.nodes.findIndex(e => nodeID.includes(e.id)))

                        let newNodes = [...props.data.nodes]

                        indexes.forEach(e => newNodes[e] = {})

                        props.setData({
                            ...props.data,
                            nodes: newNodes
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
                        props.selectNode(props.data.nodes.find((node, i) => nodeID === node.id), true)
                    },
                    key: uuid4().toString()
                },
            ]
        }
    ]
}