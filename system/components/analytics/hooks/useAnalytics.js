import {useState} from "react";
import {v4 as uuid4} from "uuid";

export default function useAnalytics(datasetInit,datasetNameInit, openDatasetInit) {
    const [openDataset, setOpenDataset] = useState(openDatasetInit !== null && openDatasetInit !== undefined ? openDatasetInit : false)
    const [dataset, setDataset] = useState(Array.isArray(datasetInit) ? datasetInit : [])
    const [datasetName, setDatasetName] = useState(datasetInit)

    return {dataset, setDataset, openDataset, setOpenDataset, setDatasetName, datasetName}
}