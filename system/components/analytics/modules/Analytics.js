import React, {useEffect, useState} from "react";
import ContextMenu from "../../../packages/context/ContextMenu";
import handleKeyClick from "../../shared/utils/handleKeyClick";
import {
    DescriptionRounded,
    FileCopyRounded,
    ImageRounded,
    PictureAsPdfRounded,
    PrintRounded,
    PublishRounded,
    SaveRounded
} from "@material-ui/icons";
import Header from "../../../packages/header/Header";
import HandleUpload from "../../shared/utils/handleUpload";
import Dropdown from "../../../packages/dropdown/Dropdown";
import HandleDownload from "../../shared/utils/handleDownload";
import DatasetManagement from "./dataset/DatasetManagement";
import DataManagementBar from "./dataset/DataManagementBar";
import ChartContent from "../templates/ChartContent";
import Loader from "../../../packages/loader/Loader";
import useData from "../../shared/hooks/data/useData";
import Layout from "../../../packages/layout/Layout";

export default function Analytics(props) {
    const {
        openPage, pages, dispatchPage,
        ACTIONS, setCurrentPage, hasFuture, hasPast, currentPage,
        dataset, setDataset,
        setDatasetName, datasetName,
        copied, setCopied,
        metadata, setMetadata,
        selected, loading,
        setLoading,
        selectNode,
        unselectNode,
        uploadRef,
        handlePrint,
        setScale, scale
    } = useData()

    const [openOptions, setOpenOptions] = useState(null)
    const [openDataset, setOpenDataset] = useState(false)

    const handleKeyDown = (e) => {
        handleKeyClick({
            event: e
        })
    }

    useEffect(() => {
        setLoading(false)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [dataset])

    return (
        <>
            <Layout
                multiPage={true}
                openPage={openDataset ? 1 : 0}
                header={
                    <>
                        <input
                            type="file" ref={uploadRef}
                            style={{display: 'none'}} multiple={false}
                            onChange={event => {
                                setLoading(true)
                                HandleUpload({
                                    file: event,
                                    data: metadata,
                                    setData: setMetadata,
                                    setDataset: setDataset,
                                    setDatasetName: setDatasetName,
                                    type: event.target.files[0].name.split('.').pop()
                                })

                                event.target.value = ''
                            }}
                            accept={'.canvas'}
                        />


                        <ContextMenu
                            openPage={openPage}
                            pages={pages}
                            scale={scale}
                            setScale={setScale}
                            dispatchPage={dispatchPage}
                            actions={ACTIONS}
                            selectNode={selectNode}
                            selectedNodes={selected}
                            unselectNode={unselectNode}
                            copiedNode={copied}
                            setCopiedNode={setCopied}
                        />
                        <Header
                            setMetadata={e => {
                                setMetadata(e)
                            }}
                            metadata={metadata}
                            handlePrint={handlePrint}
                        >
                            <Dropdown
                                label={'Arquivo'} open={openOptions === 0}
                                buttons={[
                                    {
                                        children: [
                                            {
                                                label: 'Importar arquivo',
                                                icon: <PublishRounded style={{fontSize: '1.2rem'}}/>,
                                                onClick: () => {
                                                    uploadRef.current.setAttribute('accept', '.canvas')
                                                    uploadRef.current.click()
                                                },
                                                disabled: false
                                            },
                                            {
                                                label: 'Baixar cópia',
                                                icon: <SaveRounded style={{fontSize: '1.2rem'}}/>,
                                                onClick: () => HandleDownload({data: {}, asJson: false}),
                                                disabled: false
                                            }
                                        ],
                                    },
                                    {
                                        children: [
                                            {
                                                label: 'Exportar como JSON',
                                                icon: <FileCopyRounded style={{fontSize: '1.2rem'}}/>,
                                                onClick: () => HandleDownload({data: {}, asJson: true}),
                                                disabled: false
                                            },
                                            {
                                                label: 'Exportar como PDF',
                                                icon: <PictureAsPdfRounded style={{fontSize: '1.2rem'}}/>,
                                                onClick: () => handlePrint(),
                                                disabled: false
                                            },
                                            {
                                                label: 'Exportar como PNG',
                                                icon: <ImageRounded style={{fontSize: '1.2rem'}}/>,
                                                onClick: () => {
                                                    const el = document.getElementById('frame')
                                                    if (el !== null) {
                                                        const svg = 'data:image/svg+xml,' + encodeURIComponent(el.innerHTML)
                                                        let downloadAnchorNode = document.createElement('a');

                                                        downloadAnchorNode.setAttribute("href", svg);
                                                        downloadAnchorNode.setAttribute("download", `${metadata.subject}.svg`);
                                                        document.body.appendChild(downloadAnchorNode)
                                                        downloadAnchorNode.click()
                                                        downloadAnchorNode.remove()
                                                    }
                                                },
                                                disabled: false
                                            },
                                            {
                                                label: 'Imprimir',
                                                icon: <PrintRounded style={{fontSize: '1.2rem'}}/>,
                                                onClick: () => handlePrint(),
                                                disabled: false
                                            }]
                                    }
                                ]}
                                handleOpen={() => setOpenOptions(0)}
                                handleClose={() => setOpenOptions(null)}
                            />
                            <Dropdown
                                label={'Inserir'} open={openOptions === 1}
                                buttons={[
                                    {
                                        children: [
                                            {
                                                label: 'Importar JSON',
                                                icon: <DescriptionRounded style={{fontSize: '1.2rem'}}/>,
                                                onClick: () => {
                                                    uploadRef.current.setAttribute('accept', '.json')
                                                    uploadRef.current.click()
                                                },
                                                disabled: false
                                            },
                                            {
                                                label: 'Importar CSV',
                                                icon: <DescriptionRounded style={{fontSize: '1.2rem'}}/>,
                                                onClick: () => {
                                                    uploadRef.current.setAttribute('accept', '.csv')
                                                    uploadRef.current.click()
                                                },
                                                disabled: false
                                            }
                                        ],
                                    }
                                ]}
                                handleOpen={() => setOpenOptions(1)}
                                handleClose={() => setOpenOptions(null)}
                            />
                        </Header>

                        <DataManagementBar
                            setOpenDataset={e => {
                                unselectNode(undefined, true)
                                setOpenDataset(e)
                            }}
                            openDataset={openDataset}/>
                    </>
                }
                body={[
                    <React.Fragment key={'content'}>
                        <ChartContent
                            selectNode={selectNode}
                            pages={pages}
                            openPage={openPage}
                            dispatchPage={dispatchPage}
                            actions={ACTIONS}
                            unselectNode={unselectNode}
                            setDefaultPage={setCurrentPage} defaultPage={currentPage} dataset={dataset}
                            children={props.children}
                            openDataset={openDataset} metadata={metadata}
                            setMetadata={setMetadata} selectedNodes={selected}
                        />
                    </React.Fragment>,
                    <React.Fragment key={'dataset'}>
                        <DatasetManagement
                            dataset={dataset} fileName={datasetName}
                            setDataset={setDataset} setDatasetName={setDatasetName} openDataset={openDataset}
                            handleUpload={() => {
                                uploadRef.current.setAttribute('accept', '.csv, .json')
                                uploadRef.current.click()
                            }}
                        />
                    </React.Fragment>
                ]}
            />
            <Loader loading={loading}/>
        </>
    )
}