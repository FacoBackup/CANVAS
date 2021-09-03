import CanvasTemplate from "../../templates/props/CanvasPropsTemplate";
import styles from '../../styles/Canvas.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import NewProjectTemplate from "../../templates/props/NewProjectTemplate";
import SideBar from "../navigation/side/SideBar";
import ContextMenu from "../ContextMenu";
import Pages from "../navigation/pages/Pages";
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
import DatasetOptions from "../../templates/analytics/DatasetOptions";
import DatasetManagement from "../dataset/DatasetManagement";
import DataManagementBar from "../dataset/DataManagementBar";

export default function Analytics(props) {
    const [data, setData] = useState(NewProjectTemplate)
    const [defaultPage, setDefaultPage] = useState(0)
    const uploadRef = useRef()
    const [selectedNode, setSelectedData] = useState(undefined)
    const [openOptions, setOpenOptions] = useState(null)
    const [copiedNode, setCopiedNode] = useState(null)
    const [openDataset, setOpenDataset] = useState(false)

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
                node={selectedNode !== undefined ? data.pages[defaultPage].nodes[selectedNode.index] : null}
                setData={(event) => {
                    let newPages = [...data.pages]
                    newPages[defaultPage] = event
                    setData({...data, pages: newPages})
                }}
                selectedNode={selectedNode}
                index={selectedNode !== undefined ? selectedNode.index : selectedNode}
                setSelectedNode={setSelectedNode}
            />

            <input
                type="file" ref={uploadRef} style={{display: 'none'}} multiple={false}
                onChange={event => HandleUpload({
                    file: event,
                    data: data,
                    setData: setData,
                    type: uploadRef.current.getAttribute('accept')
                })}
                accept={'.canvas'}
            />
            {/*<FrameView/>*/}

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
                                }
                            ],
                        }
                    ]}
                    handleOpen={() => setOpenOptions(1)}
                    handleClose={() => setOpenOptions(null)}
                />
            </FileOptions>
            <DataManagementBar setOpenDataset={setOpenDataset} openDataset={openDataset}/>
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

                                <AnalyticsShapes
                                    data={data.pages[defaultPage]}
                                    setData={(e) => {
                                        let newPages = [...data.pages]
                                        newPages[defaultPage] = e
                                        setData({...data, pages: newPages})
                                    }}
                                />

                            )
                        },
                        {
                            icon: <StorageRounded/>,
                            label: 'Dados',
                            content: data.dataset === undefined || data.dataset === null || data.dataset.length === 0 ? null : (

                                <DatasetOptions
                                    data={data}
                                    setData={setData}
                                    defaultPage={defaultPage}
                                    selectedNode={selectedNode}
                                />
                            ),
                            disabled: data.dataset === undefined || data.dataset === null
                        },
                    ]}
                />
                {openDataset ?
                    <DatasetManagement data={data}/>
                    :
                    null
                }
                <div className={styles.contentWrapper} style={{display: openDataset ? 'none' : undefined}}>

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
                        dataset: data.dataset ? data.dataset : [],
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