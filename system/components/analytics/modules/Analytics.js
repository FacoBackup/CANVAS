import styles from '../../shared/styles/Canvas.module.css'
import React, {useEffect, useState} from "react";
import ContextMenu from "../../shared/modules/context/ContextMenu";
import keyboardControl from "../../shared/utils/KeyboardControl";
import {
    DescriptionRounded,
    FileCopyRounded,
    ImageRounded,
    PictureAsPdfRounded,
    PrintRounded,
    PublishRounded,
    SaveRounded
} from "@material-ui/icons";
import FileOptions from "../../shared/templates/tools/FileOptions";
import ChartNodeEditor from "../templates/ChartNodeEditor";
import HandleUpload from "../../shared/utils/HandleUpload";
import Dropdown from "../../shared/templates/tools/Dropdown";
import HandleDownload from "../../shared/utils/HandleDownload";
import DatasetManagement from "./dataset/DatasetManagement";
import DataManagementBar from "./dataset/DataManagementBar";
import ChartContent from "./ChartContent";
import ChildrenSwitcher from "./ChildrenSwitcher";
import Loader from "../../shared/templates/tools/Loader";
import useData from "../../shared/hooks/useData";

export default function Analytics(props) {
    const {
        dataset, setDataset,
        openDataset, setOpenDataset,
        setDatasetName, datasetName,
        copied, setCopied,
        pages, setPages,
        metadata, setMetadata,
        selected, loading,
        setLoading, openPage,
        setOpenPage, handlePageChange,
        selectNode,
        unselectNode,
        uploadRef,
        handlePrint
    } = useData()
    const [openOptions, setOpenOptions] = useState(null)

    const handleKeyDown = (e) => {
        keyboardControl({
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

        <div
            className={styles.wrapper}
            onMouseDown={event => {
                if ((event.target.id === 'frame' || event.target.id === 'engine-content'))
                    unselectNode(undefined, true)
            }}>
            {/*<FrameView data={data}/>*/}
            <Loader loading={loading}/>

            <ChartNodeEditor
                data={pages[openPage]}
                setData={handlePageChange}
                selectedNodes={selected}
                unselectNode={unselectNode}
            />

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
                data={pages[openPage]}
                setData={handlePageChange}
                selectNode={selectNode}
                unselectNode={unselectNode}
                copiedNode={copied}
                setCopiedNode={setCopied}
            />
            <FileOptions
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
            </FileOptions>
            <DataManagementBar
                setOpenDataset={e => {
                    unselectNode(undefined, true)
                    setOpenDataset(e)
                }}
                openDataset={openDataset}/>


            <ChildrenSwitcher
                children={[
                    <DatasetManagement
                        dataset={dataset} fileName={datasetName}
                        setDataset={setDataset} setDatasetName={setDatasetName} openDataset={openDataset}
                        handleUpload={() => {
                            uploadRef.current.setAttribute('accept', '.csv, .json')
                            uploadRef.current.click()
                        }}
                    />,
                    <ChartContent
                        selectNode={selectNode}
                        unselectNode={unselectNode}
                        setDefaultPage={setOpenPage} defaultPage={openPage} dataset={dataset}
                        children={props.children} setPages={setPages} pages={pages}
                        handlePageChange={handlePageChange} openDataset={openDataset} metadata={metadata}
                        setMetadata={setMetadata} selectedNodes={selected}
                    />
                ]} openChild={openDataset ? 0 : 1}
            />


        </div>
    )
}