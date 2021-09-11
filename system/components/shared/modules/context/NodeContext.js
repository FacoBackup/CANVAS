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
                    props.data.nodes.find((node, i) => {
                        if(nodeID === node.id) {
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
                    props.data.nodes.find(node => {
                        if(nodeID === node.id)
                            props.setCopiedNode(node)
                    })
                },
                shortcutButtons: ['ctrl', 'c'],
                key: 'node-2'
            },
            {
                label: 'Deletar',
                icon: <DeleteRounded/>,
                onClick: (props, event, nodeID) => {
                    props.setSelectedNode(undefined)

                    let index
                    props.data.nodes.find((node, i) => {
                        if(nodeID === node.id)
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
                onClick: (props,event, nodeID) => {
                    props.data.nodes.find((node, i) => {
                        if(nodeID === node.id)
                            props.setSelectedNode(node)
                    })
                },
                key: 'node-4'
            },
        ]
    }

]