export default function useLink(metadata, data, setData, toBeLinked, setToBeLinked, setSelectedNode){
    const handleLink = (node, connection, index) => {
        if (toBeLinked !== null) {
            setSelectedNode(undefined)
            let newLink = {
                type: 'dashed-path',
                parent: {
                    id: toBeLinked.id,
                    connectionPoint: toBeLinked.connectionPoint,
                    nodeShape: toBeLinked.nodeShape,
                    index: toBeLinked.index
                },
                child: {
                    id: node.id,
                    connectionPoint: connection,
                    nodeShape: node.shape,
                    index: index
                }
            }
            let newLinks = [...data.links, ...[newLink]]

            setData({...data, links: newLinks})
            setToBeLinked(null)
        } else {
            setSelectedNode(undefined)
            setToBeLinked({
                id: node.id,
                connectionPoint: connection,
                index: index,
                connectionType: metadata.connectionType
            })
        }
    }

    const handleLinkDelete = (link) => {
        let newLinks = [...data.links]
        const index = newLinks.indexOf(link)

        if (index > -1) {
            newLinks.splice(index, 1)
            setData({
                ...data,
                links: newLinks
            })
        }
    }

    return {handleLink, handleLinkDelete}
}