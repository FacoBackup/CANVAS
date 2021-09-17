import {useCallback, useRef, useState} from "react";
import {v4 as uuid4} from "uuid";
import {useReactToPrint} from "react-to-print";

export default function useData() {

    const [dataset, setDataset] = useState([])
    const [datasetName, setDatasetName] = useState()
    const uploadRef = useRef()
    const [copied, setCopied] = useState()
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [pages, setPages] = useState([{
        title: 'Página 1',
        nodes: [],
        links: []
    }])
    const [metadata, setMetadata] = useState({
        id: uuid4().toString(),
        subject: 'Sem título',
        dimensions: {
            width: 10000,
            height: 10000
        },
    })
    const [openPage, setOpenPage] = useState(0)
    const [scale, setScale] = useState(1)
    const [toBeLinked, setToBeLinked] = useState(null)

    const handlePageChange = (e) => {
        let newPages = [...pages]

        newPages[openPage] = e
        setPages(newPages)
    }
    const selectNode = useCallback((node, openEdit, clear, nodes) => {
        let index
        if (node !== undefined && node !== null) {

            pages[openPage].nodes.forEach((e, i) => {
                if (e.id === node.id)
                    index = i
            })

            let newSelected = clear ? [] : [...selected]
            const found = newSelected.findIndex((e, i) => e.node.id === node.id)

            if(found !== -1)
                newSelected.splice(found, 1)

            newSelected.push({
                node: node,
                index: index,
                openEdit: openEdit
            })

            setSelected(newSelected)
        } else if (nodes !== undefined && Array.isArray(nodes)) {
            let newSelected = []
            nodes.forEach(b => {
                let index
                const node = pages[openPage].nodes.find((e, i) => {
                    if (e.id === b.id) {
                        index = i
                        return e
                    }
                })

                if (index !== undefined)
                    newSelected.push({
                        node: node,
                        index: index,
                        openEdit: false
                    })
            })
            setSelected(newSelected)
        }
    }, [selected])
    const unselectNode = useCallback((nodeID, all) => {
        if (!all) {
            let index
            let newSelected = [...selected]
            pages[openPage].nodes.forEach((e, i) => {
                if (e.id === nodeID)
                    index = i
            })
            newSelected.splice(index, 1)
            setSelected(newSelected)
        } else
            setSelected([])

    }, [selected])
    const handlePrint = useReactToPrint({
        content: () => document.getElementById('engine-content')
    });

    return {
        scale,
        setScale,
        copied,
        setCopied,
        pages,
        setPages,
        metadata,
        setMetadata,
        selected,
        loading,
        setLoading,
        openPage,
        setOpenPage,
        handlePageChange,
        selectNode,
        unselectNode,
        dataset, setDataset,
        setDatasetName,
        datasetName,
        toBeLinked, setToBeLinked,
        uploadRef, handlePrint
    }
}