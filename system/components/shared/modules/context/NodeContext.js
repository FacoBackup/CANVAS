import {CropRounded, DeleteRounded, EditRounded, FileCopyRounded} from "@material-ui/icons";

export default [
    {
        label: 'Manipular',
        children: [
            {
                label: 'Recortar',
                icon: <CropRounded/>,
                onClick: (props, event, nodeID) => {

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
                key: 'node-1'
            },
            {
                label: 'Copiar',
                icon: <FileCopyRounded/>,
                onClick: (props, event, nodeID) => {
                    props.setCopiedNode(props.data.nodes.find(node => nodeID === node.id))
                },
                shortcutButtons: ['ctrl', 'c'],
                key: 'node-2'
            },
            {
                label: 'Deletar',
                icon: <DeleteRounded/>,
                onClick: (props, event, nodeID) => {
                    props.unselectNode(nodeID)

                    let index
                    props.data.nodes.forEach((node, i) => {
                        if (nodeID === node.id)
                            index = i
                    })

                    let newNodes = [...props.data.nodes]

                    newNodes[index] = {}

                    props.setData({
                        ...props.data,
                        nodes: newNodes
                    })
                    console.log({
                        ...props.data,
                        nodes: newNodes
                    })
                },
                shortcutButtons: ['del'],
                key: 'node-3',

            },
        ]
    },
    {
        label: 'Personalizar',
        children: [
            {
                label: 'Editar',
                icon: <EditRounded/>,
                onClick: (props, event, nodeID) => {
                    props.selectNode(props.data.nodes.find((node, i) => nodeID === node.id), true)
                },
                key: 'node-4'
            },
        ]
    }

]