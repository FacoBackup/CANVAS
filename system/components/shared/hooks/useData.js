import {useRef, useState} from "react";
import {v4 as uuid4} from "uuid";
import {useReactToPrint} from "react-to-print";

export default function useData() {
    const [openDataset, setOpenDataset] = useState(false)
    const [dataset, setDataset] = useState([])
    const [datasetName, setDatasetName] = useState()
    const uploadRef = useRef()
    const [copied, setCopied] = useState()
    const [selected, setSelected] = useState()
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

    const handlePageChange = (e) => {
        let newPages = [...pages]

        newPages[openPage] = e
        setPages(newPages)
    }
    const handleSelectedNodeChange = (node, openEdit) => {
        let index
        if (node !== undefined && node !== null) {
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

    const handlePrint = useReactToPrint({
        content: () => document.getElementById('engine-content')
    });

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
        handleSelectedNodeChange,
        dataset, setDataset, openDataset,
        setOpenDataset, setDatasetName,
        datasetName,
        uploadRef,handlePrint
    }
}