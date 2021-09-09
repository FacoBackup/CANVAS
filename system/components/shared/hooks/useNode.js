export default function useNode(data, setData){
    const handleNodeChange = (index, node, data) => {
        let newNodes = [...data.nodes]
        newNodes[index] = data
        setData({
            ...data,
            nodes: newNodes
        })
    }


    const savePlacement = (event, node, index) => {
        let newNodes = [...data.nodes]
        let newNode = {...node}
        newNode.placement = event
        newNodes[index] = newNode

        setData({
            ...data,
            nodes: newNodes
        })
    }

    return {savePlacement, handleNodeChange}
}