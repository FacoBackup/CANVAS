import {CropRounded, DeleteRounded, EditRounded, FileCopyRounded} from "@material-ui/icons";
import {useCallback, useContext, useMemo} from "react";

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
                    key: 'node-1'
                },
                {
                    label: props.selectedNodes.length > 1 ? 'Copiar selecionados' : 'Copiar',
                    icon: <FileCopyRounded/>,
                    onClick: (event, nodeID) => {
                        props.setCopiedNode(props.data.nodes.find(node => nodeID === node.id))
                    },
                    shortcutButtons: ['ctrl', 'c'],
                    key: 'node-2'
                },
                {
                    label: props.selectedNodes.length > 1 ? 'Deletar selecionados' : 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (event, nodeID) => {
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
                    },
                    shortcutButtons: ['del'],
                    key: 'node-3',

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
                    key: 'node-4'
                },
            ]
        }

    ]

}