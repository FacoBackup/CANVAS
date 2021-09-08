import {useState} from "react";
import {v4 as uuid4} from "uuid";

export default function useData(copiedInit, selectedInit, loadingInit, pagesInit, metadataInit, openPageInit) {

    const [copied, setCopied] = useState(copiedInit)
    const [selected, setSelected] = useState(selectedInit)
    const [loading, setLoading] = useState(loadingInit !== undefined && loadingInit !== null ? loadingInit : false)
    const [pages, setPages] = useState(Array.isArray(pagesInit) ? pagesInit : [   {
        title: 'Página 1',
        nodes: [],
        links: []
    }])
    const [metadata, setMetadata] = useState(typeof metadataInit === 'object' ? metadataInit : {
        id: uuid4().toString(),
        subject: 'Sem título',
        dimensions: {
            width: 10000,
            height: 10000
        },
    })
    const [openPage, setOpenPage] = useState(openPageInit !== undefined && openPageInit !== null ? openPageInit : 0)

    const handlePageChange = (e) => {
        let newPages = [...pages]
        console.log(e)
        newPages[openPage] = e
        setPages(newPages)
    }
    const handleSelectedNodeChange = (node, openEdit) => {
        let index
        if (node !== undefined && node !== null) {
            console.log(pages)
            console.log(openPage)
            pages[openPage].nodes.find((e, i) => {
                if (e.id === node.id)
                    index = i
            })

            setSelected({
                node: node,
                index: index,
                openEdit: openEdit
            })
        } else
            setSelected(undefined)
    }
    return {
        copied,
        setCopied,
        pages,
        setPages,
        metadata,
        setMetadata,
        selected,
        setSelected,
        loading,
        setLoading,
        openPage,
        setOpenPage,
        handlePageChange,
        handleSelectedNodeChange
    }
}