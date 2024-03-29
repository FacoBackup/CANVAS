import styles from '../../../packages/engine/styles/Canvas.module.css'
import React, {useState} from "react";
import ContextMenu from "../../../packages/context/ContextMenu";
import Pages from "../../shared/modules/Pages";
import FontVisualsBar from "./FontVisualsBar";
import Header from "../../../packages/header/Header";
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
import HandleUpload from "../../shared/utils/handleUpload";
import Dropdown from "../../../packages/dropdown/Dropdown";
import HandleDownload from "../../shared/utils/handleDownload";
import useData from "../../shared/hooks/data/useData";
import VerticalTabs from "../../../packages/tabs/VerticalTabs";
import Layout from "../../../packages/layout/Layout";

export default function Flowchart(props) {
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
        setScale, scale, setToBeLinked, toBeLinked
    } = useData()
    const [openOptions, setOpenOptions] = useState(null)
    const [openButton, setOpenButton] = useState(0)

    return (
        <>
            <Head>
                <title>{metadata.subject} - Flowchart</title>
                <link rel='icon' href={'/flow.svg'} type='image/x-icon'/>
            </Head>
            <Layout
                onClick={event => {
                    if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                        setToBeLinked(null)
                }}
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
                                    setData: setMetadata
                                })

                                event.target.value = ''
                            }}
                            accept={'.canvas'}
                        />

                        {/*<FrameView/>*/}
                        <ContextMenu
                            scale={scale} setScale={setScale} copiedNode={copied}
                            setCopiedNode={setCopied} pages={pages} actions={ACTIONS}
                            dispatchPage={dispatchPage} openPage={openPage}
                            selectNode={selectNode} selectedNodes={selected}
                            unselectNode={unselectNode}
                        />
                        <Header
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
                        </Header>
                        <FontVisualsBar scale={scale} setScale={setScale} data={metadata} setData={setMetadata}/>
                    </>
                }
                body={[
                    <div style={{width: '100%', height: 'calc(100% - 40px)', display: 'flex'}} key={'content'}>
                        <VerticalTabs
                            tabsKey={'flowchart-content'}
                            buttons={[
                                {
                                    icon: <CategoryRounded/>,
                                    label: 'Formas',
                                    content: (
                                        <>
                                            <FlowchartShapes
                                                pages={pages} actions={ACTIONS}
                                                dispatchPage={dispatchPage} openPage={openPage}
                                                scale={scale} selectedNodes={selected}
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
                                    openPage: openPage,
                                    dispatchPage: dispatchPage,
                                    actions: ACTIONS,
                                    pages: pages,

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
                                <Pages pages={pages} openPage={openPage}
                                       dispatchPage={dispatchPage} actions={ACTIONS}
                                       setDefaultPage={setCurrentPage} defaultPage={currentPage}
                                />
                            </div>
                        </div>
                        <FlowchartNodeEditor
                            openPage={openPage}
                            dispatchPage={dispatchPage}
                            actions={ACTIONS}
                            selectedNodes={selected}
                            unselectNode={unselectNode}
                        />
                    </div>
                ]}
            />
        </>
    )
}