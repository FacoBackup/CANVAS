import {useRef, useState} from "react";
import {v4 as uuid4} from "uuid";
import {useReactToPrint} from "react-to-print";

export default function useData() {
    const [openDataset, setOpenDataset] = useState(false)
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
    const selectNode = (node, openEdit, clear) => {
        let index
        let existingIndex
        if (node !== undefined && node !== null) {


            pages[openPage].nodes.forEach((e, i) => {
                if (e.id === node.id)
                    index = i
            })
            let newSelected = clear ? [] : [...selected]
            newSelected.forEach((e, i) => {
                if (e.id === node.id)
                    existingIndex = i
            })

            if(existingIndex)
                newSelected.splice(existingIndex, 1)

            newSelected.push({
                node: node,
                index: index,
                openEdit: openEdit
            })
            setSelected(newSelected)
        }
    }
    const unselectNode = (nodeID, all) => {
        if (!all) {
            let index
            let newSelected = [...selected]
            pages[openPage].nodes.forEach((e, i) => {
                if (e.id === nodeID)
                    index = i
            })
            newSelected.splice(index, 1)
            setSelected(newSelected)
        } else {
            console.log('ALL')
            setSelected([])
        }

    }
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
        dataset, setDataset, openDataset,
        setOpenDataset, setDatasetName,
        datasetName,
        toBeLinked, setToBeLinked,
        uploadRef, handlePrint
    }
}