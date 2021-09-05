import CanvasTemplate from "../../shared/templates/CanvasPropsTemplate";
import styles from '../../shared/styles/Canvas.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import NewProjectTemplate from "../../shared/templates/NewProjectTemplate";
import ContextMenu from "../../shared/modules/ContextMenu";
import keyboardControl from "../../shared/utils/KeyboardControl";
import {
    DescriptionRounded,
    FileCopyRounded,
    PictureAsPdfRounded,
    PrintRounded,
    PublishRounded,
    SaveRounded
} from "@material-ui/icons";
import FileOptions from "../../shared/templates/FileOptions";
import ChartNodeEditor from "../templates/ChartNodeEditor";
import HandleUpload from "../../shared/utils/HandleUpload";
import Dropdown from "../../shared/templates/Dropdown";
import HandleDownload from "../../shared/utils/HandleDownload";
import DatasetManagement from "./dataset/DatasetManagement";
import DataManagementBar from "./dataset/DataManagementBar";
import ChartContent from "./ChartContent";
import ChildrenSwitcher from "./ChildrenSwitcher";

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
                onChange={event => {
                    HandleUpload({
                        file: event,
                        data: data,
                        setData: setData,
                        type: event.target.files[0].name.split('.').pop()
                    })
                    event.target.value = ''
                }}
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
            <DataManagementBar setOpenDataset={e => {
                setSelectedNode(undefined)
                setOpenDataset(e)
            }} openDataset={openDataset}/>


            <ChildrenSwitcher
                children={[
                    <DatasetManagement
                        data={data} fileName={data.fileName} setData={setData}
                        handleUpload={() => {
                            uploadRef.current.setAttribute('accept', '.csv, .json')
                            uploadRef.current.click()
                        }}
                        setSelectedNode={setSelectedNode}
                    />,
                    <ChartContent
                        data={data} setData={setData} setSelectedNode={setSelectedNode}
                        setDefaultPage={setDefaultPage} defaultPage={defaultPage}
                        children={props.children}
                        selectedNode={selectedNode}
                    />
                ]} openChild={openDataset ? 0 : 1}
            />


        </div>
    )
}
Analytics.propTypes = CanvasTemplate