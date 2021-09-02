import CanvasTemplate from "../../templates/props/CanvasPropsTemplate";
import styles from '../../styles/Canvas.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import NewProjectTemplate from "../../templates/props/NewProjectTemplate";
import SideBar from "../navigation/side/SideBar";
import ContextMenu from "../ContextMenu";
import Pages from "../navigation/pages/Pages";
import FrameView from "../engine/FrameView";
import keyboardControl from "../../utils/control/KeyboardControl";
import {
    CategoryRounded,
    DescriptionRounded,
    FileCopyRounded,
    PictureAsPdfRounded,
    PrintRounded,
    PublishRounded,
    SaveRounded,
    StorageRounded
} from "@material-ui/icons";
import AnalyticsShapes from "../navigation/side/modules/AnalyticsShapes";
import FileOptions from "../navigation/side/modules/FileOptions";
import ChartNodeEditor from "../../templates/editors/ChartNodeEditor";
import HandleUpload from "../../utils/io/HandleUpload";
import Dropdown from "../navigation/misc/Dropdown";
import HandleDownload from "../../utils/io/HandleDownload";
import nodeStyles from '../../styles/Node.module.css'
export default function Analytics(props) {
    const [data, setData] = useState(NewProjectTemplate)
    const [defaultPage, setDefaultPage] = useState(0)
    const uploadRef = useRef()
    const [selectedNode, setSelectedData] = useState(undefined)
    const [openOptions, setOpenOptions] = useState(null)
    const [copiedNode, setCopiedNode] = useState(null)
    const handlePrint = useReactToPrint({
        content: () => document.getElementById('engine-content')
    });

    const setSelectedNode = (node, openEdit) => {
        console.log(openEdit)
        let index
        if (node !== undefined && node !== null) {
            data.pages[defaultPage].nodes.find((e, i) => {
                if (e.id === node.id)
                    index = i
            })

            setSelectedData({
                node: node,
                index: index,
                openEdit: openEdit
            })
        } else
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
    })

    return (

        <div
            className={styles.wrapper}
            onMouseDown={event => {
                if (selectedNode !== undefined && (event.target.id === 'frame' || event.target.id === 'engine-content'))
                    setSelectedNode(undefined)
            }}>
            <ChartNodeEditor
                data={data.pages[defaultPage]}
                setData={(event) => {
                    console.log(event)
                    let newPages = [...data.pages]
                    newPages[defaultPage] = event
                    console.log({...data, pages: newPages})
                    setData({...data, pages: newPages})
                }}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
            />

            <input
                type="file" ref={uploadRef} style={{display: 'none'}} multiple={false}
                onChange={event => HandleUpload({
                    file: event,
                    data: data,
                    setData: props.setData,
                    type: uploadRef.current.getAttribute('accept')
                })}
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
                copiedNode={copiedNode}
                setCopiedNode={setCopiedNode}
                setSelectedNode={setSelectedNode}/>
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
                                    onClick: () => {
                                        uploadRef.current.setAttribute('accept', '.canvas')
                                        uploadRef.current.click()
                                    },
                                    disabled: false
                                },
                                {
                                    label: 'Baixar cópia',
                                    icon: <SaveRounded style={{fontSize: '1.2rem'}}/>,
                                    onClick: () => HandleDownload({data: data, asJson: false}),
                                    disabled: false
                                }
                            ],
                        },
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
                                },
                                {
                                    label: 'Importar Excel',
                                    icon: <DescriptionRounded style={{fontSize: '1.2rem'}}/>,
                                    onClick: () => {
                                        uploadRef.current.setAttribute('accept', '.excel')
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
            <div style={{width: '100%', height: 'calc(100% - 40px)', display: 'flex'}}>

                <SideBar
                    data={data}
                    defaultPage={defaultPage} handlePrint={handlePrint}
                    selectedNode={selectedNode}
                    setData={setData}
                    options={[
                        {
                            icon: <CategoryRounded/>,
                            label: 'Visuais',
                            content: (
                                <>
                                    <AnalyticsShapes
                                        data={data.pages[defaultPage]}
                                        setData={(e) => {
                                            let newPages = [...data.pages]
                                            newPages[defaultPage] = e
                                            setData({...data, pages: newPages})
                                        }}
                                    />
                                </>
                            )
                        },
                        {
                            icon: <StorageRounded/>,
                            label: 'Dados',
                            content: (
                                <>
                                    <AnalyticsShapes
                                        data={data.pages[defaultPage]}
                                        setData={(e) => {
                                            let newPages = [...data.pages]
                                            newPages[defaultPage] = e
                                            setData({...data, pages: newPages})
                                        }}
                                    />
                                </>
                            ),
                            disabled: data.dataset === undefined || data.dataset === null
                        },
                    ]}
                />

                <div className={styles.contentWrapper}>
                    <Pages
                        data={data} setData={setData}
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
                        dimensions: data.dimensions,
                        selectedNode: selectedNode !== undefined ? selectedNode.node : selectedNode,
                        setSelectedNode: setSelectedNode,

                    })}
                </div>

            </div>
        </div>
    )
}
Analytics.propTypes = CanvasTemplate