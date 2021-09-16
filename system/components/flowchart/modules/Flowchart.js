import styles from '../../shared/styles/Canvas.module.css'
import React, {useState} from "react";
import ContextMenu from "../../shared/modules/context/ContextMenu";
import Pages from "../../shared/modules/engine/Pages";
import FontVisualsBar from "./FontVisualsBar";
import FileOptions from "../../shared/templates/tools/FileOptions";
import Head from "next/head";
import Connections from "../templates/Connections";
import Lines from "../templates/Lines";
import FlowchartShapes from "../templates/FlowchartShapes";
import {
    CategoryRounded,
    FileCopyRounded,
    HelpRounded,
    InfoRounded,
    LinkRounded,
    PictureAsPdfRounded,
    PrintRounded,
    PublishRounded,
    SaveRounded
} from "@material-ui/icons";
import FlowchartNodeEditor from "../templates/FlowchartNodeEditor";
import HandleUpload from "../../shared/utils/HandleUpload";
import Dropdown from "../../shared/templates/tools/Dropdown";
import HandleDownload from "../../shared/utils/HandleDownload";
import useData from "../../shared/hooks/useData";
import VerticalTabs from "../../shared/templates/tools/VerticalTabs";

export default function Flowchart(props) {
    const {
        copied, setCopied,
        toBeLinked, setToBeLinked,
        pages, setPages,
        metadata, setMetadata,
        selected, loading,
        setLoading, openPage,
        setOpenPage, handlePageChange,
        selectNode,
        unselectNode,
        uploadRef,
        handlePrint,
        scale, setScale
    } = useData()
    const [openOptions, setOpenOptions] = useState(null)
    const [openButton,setOpenButton] = useState(0)
    return (
        <>

            <Head>
                <title>{metadata.subject} - Flowchart</title>
                <link rel='icon' href={'/flow.svg'} type='image/x-icon'/>
            </Head>

            <div
                className={styles.wrapper}
                onClick={event => {
                    if ((event.target.id === 'frame' || event.target.id === 'engine-content'))
                        unselectNode(undefined, true)
                    if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                        setToBeLinked(null)
                }}
            >
                <input
                    type="file" ref={uploadRef}
                    style={{display: 'none'}} multiple={false}
                    onChange={event => {
                        setLoading(true)
                        HandleUpload({
                            file: event,
                            data: metadata,
                            setData: setMetadata
                        })

                        event.target.value = ''
                    }}
                    accept={'.canvas'}
                />

                {/*<FrameView/>*/}
                <ContextMenu
                    data={pages[openPage]}
                    setData={handlePageChange}
                    scale={scale} setScale={setScale} copiedNode={copied}
                    setCopiedNode={setCopied}
                    selectNode={selected}
                    unselectNode={unselectNode}
                />
                <FileOptions
                metadata={metadata}
                setMetadata={setMetadata}
                    handlePrint={handlePrint}>
                    <Dropdown
                        label={'Arquivo'} open={openOptions === 0}
                        buttons={[
                            {
                                children: [
                                    {
                                        label: 'Importar arquivo',
                                        icon: <PublishRounded style={{fontSize: '1.2rem'}}/>,
                                        onClick: () => uploadRef.current.click(),
                                        disabled: false
                                    },
                                    {
                                        label: 'Baixar cópia',
                                        icon: <SaveRounded style={{fontSize: '1.2rem'}}/>,
                                        onClick: () => HandleDownload({data: data, asJson: false}),
                                        disabled: false
                                    }
                                ],
                            }
                        ]}
                        handleOpen={() => setOpenOptions(0)}
                        handleClose={() => setOpenOptions(null)}
                    />
                    <Dropdown
                        label={'Exportar'} open={openOptions === 1}
                        buttons={[
                            {
                                children: [
                                    {
                                        label: 'Exportar como JSON',
                                        icon: <FileCopyRounded style={{fontSize: '1.2rem'}}/>,
                                        onClick: () => HandleDownload({data: data, asJson: true}),
                                        disabled: false
                                    },
                                    {
                                        label: 'Exportar como PDF',
                                        icon: <PictureAsPdfRounded style={{fontSize: '1.2rem'}}/>,
                                        onClick: () => handlePrint(),
                                        disabled: false
                                    },
                                    {
                                        label: 'Imprimir',
                                        icon: <PrintRounded style={{fontSize: '1.2rem'}}/>,
                                        onClick: () => handlePrint(),
                                        disabled: false
                                    }
                                ],
                            }
                        ]}
                        handleOpen={() => setOpenOptions(1)}
                        handleClose={() => setOpenOptions(null)}
                    />
                    <Dropdown
                        label={'Sobre'} open={openOptions === 2}
                        buttons={[
                            {
                                children: [
                                    {
                                        label: 'Ajuda',
                                        icon: <HelpRounded style={{fontSize: '1.2rem'}}/>,
                                        onClick: () => null,
                                        disabled: true
                                    },
                                    {
                                        label: 'Informações adicionais',
                                        icon: <InfoRounded style={{fontSize: '1.2rem'}}/>,
                                        onClick: () => null,
                                        disabled: true
                                    }
                                ],
                            }
                        ]}
                        handleOpen={() => setOpenOptions(2)}
                        handleClose={() => setOpenOptions(null)}
                    />
                </FileOptions>
                <FontVisualsBar scale={scale} setScale={setScale} data={metadata} setData={setMetadata}/>
                <div style={{width: '100%', height: 'calc(100% - 40px)', display: 'flex'}}>
                    <VerticalTabs
                        buttons={[
                            {
                                icon: <CategoryRounded/>,
                                label: 'Formas',
                                content: (
                                    <>
                                        <FlowchartShapes
                                            data={pages[openPage]}
                                            setData={handlePageChange}
                                            scale={scale}
                                        />

                                    </>
                                )
                            },
                            {
                                icon: <LinkRounded/>,
                                label: 'Conexões',
                                content: (
                                    <>
                                        <Lines
                                            data={metadata} setData={setMetadata}
                                        />

                                        <Connections
                                            data={metadata} setData={setMetadata}
                                        />
                                    </>
                                )
                            }
                        ]}
                        openButton={openButton}
                        setOpenButton={setOpenButton}
                    />
                    <div className={styles.content}>

                        <div className={styles.contentWrapper}>

                            {props.children({
                                data: pages[openPage],
                                setData: handlePageChange,
                                metadata: metadata,
                                toBeLinked: toBeLinked,
                                setToBeLinked: setToBeLinked,
                                scale: scale,
                                setScale: setScale,
                                dimensions: metadata.dimensions,
                                selectedNodes: selected,
                                selectNode: selectNode,
                                unselectNode: unselectNode
                            })}
                            <Pages
                                defaultPage={openPage} setDefaultPage={setOpenPage} pages={pages} setPages={setPages}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    </div>
                    <FlowchartNodeEditor
                        data={pages[openPage]}
                        setData={handlePageChange}
                        selectedNodes={selected}
                        selectNode={selectNode}
                        unselectNode={unselectNode}
                    />
                </div>
            </div>
        </>
    )
}