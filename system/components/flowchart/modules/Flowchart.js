import styles from '../../shared/styles/Canvas.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import NewProjectTemplate from "../../shared/templates/NewProjectTemplate";
import SideBar from "../../shared/templates/SideBar";
import ContextMenu from "../../shared/modules/ContextMenu";
import Pages from "../../shared/modules/Pages";
import FontVisualsBar from "./FontVisualsBar";
import FrameView from "../../shared/modules/engine/FrameView";
import keyboardControl from "../../shared/utils/KeyboardControl";
import FileOptions from "../../shared/templates/FileOptions";
import Head from "next/head";
import Connections from "../templates/Connections";
import Lines from "../templates/Lines";
import FlowchartShapes from "../templates/FlowchartShapes";
import {
    CategoryRounded,
    FileCopyRounded,
    HelpRounded,
    InfoRounded,
    PictureAsPdfRounded,
    PrintRounded,
    PublishRounded,
    SaveRounded
} from "@material-ui/icons";
import FlowchartNodeEditor from "../templates/FlowchartNodeEditor";
import HandleUpload from "../../shared/utils/HandleUpload";
import Dropdown from "../../shared/templates/Dropdown";
import HandleDownload from "../../shared/utils/HandleDownload";

export default function Flowchart(props) {
    const [data, setData] = useState(NewProjectTemplate)
    const [defaultPage, setDefaultPage] = useState(0)
    const [toBeLinked, setToBeLinked] = useState(null)
    const [selectedNode, setSelectedData] = useState(undefined)
    const [scale, setScale] = useState(1)
    const [copiedNode, setCopiedNode] = useState(null)
    const [openOptions, setOpenOptions] = useState(null)
    const uploadRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => document.getElementById('engine-content')
    })
    const setSelectedNode = (node, openEdit) => {
        let index
        if(node !== undefined && node !== null) {
            data.pages[defaultPage].nodes.find((e, i) => {
                if (e.id === node.id)
                    index = i
            })

            setSelectedData({
                node: node,
                index: index,
                openEdit: openEdit
            })
        }
        else
            setSelectedData(undefined)
    }
    const handleKeyDown = (e) => {
        keyboardControl({
            event: e
        })
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [data])

    return (
        <>

            <Head>
                <title>{data.subject} - Flowchart</title>
                <link rel='icon' href={'/flow.svg'} type='image/x-icon'/>
            </Head>

            <div
                className={styles.wrapper}
                onMouseDown={event => {
                    if (selectedNode !== undefined && (event.target.id === 'frame' || event.target.id === 'engine-content'))
                        setSelectedNode(undefined)
                    if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                        setToBeLinked(null)
                }}
            >
                <FlowchartNodeEditor
                    data={data.pages[defaultPage]}
                    setData={(event) => {
                        let newPages = [...data.pages]
                        newPages[defaultPage] = event
                        setData({...data, pages: newPages})
                    }}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                />
                <input
                    type="file" ref={uploadRef} style={{display: 'none'}} multiple={false}
                    onChange={event => {
                        HandleUpload({
                            file: event,
                            setData: setData,
                            type: '.canvas'
                        })
                    }}
                    accept={'.canvas'}
                />
                <FrameView/>
                <ContextMenu
                    data={data.pages[defaultPage]}
                    setData={(event) => {
                        let newPages = [...data.pages]
                        newPages[defaultPage] = event
                        setData({...data, pages: newPages})

                    }}
                    scale={scale} setScale={setScale} copiedNode={copiedNode}
                    setCopiedNode={setCopiedNode} setSelectedNode={setSelectedNode}
                />
                <FileOptions setData={e => {
                    setData(e)
                }} data={data} handlePrint={handlePrint}>
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
                                        onClick: () => uploadRef.current.click(),
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
                <div style={{width: '100%', height: 'calc(100% - 40px)', display: 'flex'}}>
                    <SideBar
                        data={data}
                        defaultPage={defaultPage}
                        selectedNode={selectedNode}
                        setData={setData}
                        options={[
                            {
                                icon: <CategoryRounded/>,
                                label: 'Dados e configurações',
                                content: (
                                    <>
                                        <FlowchartShapes
                                            data={data.pages[defaultPage]}
                                            setData={(e) => {
                                                let newPages = [...data.pages]
                                                newPages[defaultPage] = e
                                                setData({...data, pages: newPages})
                                            }}
                                            scale={scale}
                                        />
                                        <Lines
                                            data={data}
                                            setData={e => {
                                                setData(e)
                                            }}
                                        />

                                        <Connections
                                            data={data} setData={e => {
                                            setData(e)
                                        }}
                                        />
                                    </>
                                ),
                                toolTip: 'Módulos e opções'
                            },
                        ]}
                    />
                    <div className={styles.content}>
                        <FontVisualsBar scale={scale} setScale={setScale} data={data} setData={e => {
                            setData(e)
                        }}/>
                        <div className={styles.contentWrapper}>
                            <Pages
                                scale={scale} setScale={setScale}
                                data={data} setData={e => {
                                setData(e)
                            }}
                                setDefaultPage={setDefaultPage}
                                defaultPage={defaultPage}
                            />
                            {props.children({
                                data: data.pages[defaultPage],
                                setData: (event) => {
                                    let newPages = [...data.pages]
                                    newPages[defaultPage] = event
                                    setData({...data, pages: newPages})
                                },
                                styling: {connectionType: data.connectionType},
                                toBeLinked: toBeLinked,
                                setToBeLinked: setToBeLinked,
                                scale: scale,
                                setScale: setScale,
                                dimensions: data.dimensions,
                                selectedNode: selectedNode !== undefined ? selectedNode.node : selectedNode,
                                setSelectedNode: setSelectedNode,

                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}