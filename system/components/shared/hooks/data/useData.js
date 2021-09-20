import {useCallback, useRef, useState} from "react";
import {v4 as uuid4} from "uuid";
import {useReactToPrint} from "react-to-print";
import usePages from "./usePages";

export default function useData() {

    const [dataset, setDataset] = useState([])
    const [datasetName, setDatasetName] = useState()
    const uploadRef = useRef()
    const [copied, setCopied] = useState()
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)

    const [metadata, setMetadata] = useState({
        id: uuid4().toString(),
        subject: 'Sem título',
        dimensions: {
            width: 10000,
            height: 10000
        },
    })

    const {openPage, pages, dispatchPage, ACTIONS, setCurrentPage, hasFuture, hasPast, currentPage} = usePages()
    const [scale, setScale] = useState(1)
    const [toBeLinked, setToBeLinked] = useState(null)

    const selectNode = useCallback((node, openEdit, clear, nodes) => {
        let index
        if (node !== undefined && node !== null) {

            index = openPage.nodes.findIndex(e => e.id === node.id)

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
                const node = openPage.nodes.find((e, i) => {
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
            let index = openPage.nodes.findIndex(e => e.id === nodeID)
            let newSelected = [...selected]

            newSelected.splice(index, 1)
            setSelected(newSelected)
        } else
            setSelected([])

    }, [selected])

    const handlePrint = useReactToPrint({
        content: () => document.getElementById('engine-content')
    });

    return {
        openPage, pages, dispatchPage, ACTIONS, setCurrentPage, hasFuture, hasPast, currentPage,

        scale, setScale,
        copied, setCopied,
        metadata, setMetadata,
        loading, setLoading,
        selected, selectNode, unselectNode,
        dataset, setDataset,

        datasetName,setDatasetName,

        toBeLinked, setToBeLinked,
        uploadRef,
        handlePrint
    }
}