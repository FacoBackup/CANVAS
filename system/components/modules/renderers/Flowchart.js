import styles from '../../styles/Canvas.module.css'
import React, {useEffect, useState} from "react";
import {useReactToPrint} from "react-to-print";
import NewProjectTemplate from "../../templates/props/NewProjectTemplate";
import SideBar from "../navigation/side/SideBar";
import ContextMenu from "../ContextMenu";
import Pages from "../navigation/pages/Pages";
import FontVisualsBar from "../navigation/FontVisualsBar";
import nodeStyles from '../../styles/Node.module.css'
import FrameView from "../engine/FrameView";
import tabsStyles from '../navigation/side/styles/Tabs.module.css'
import keyboardControl from "../../utils/control/KeyboardControl";
import FileOptions from "../navigation/side/modules/FileOptions";
import Head from "next/head";
import Connections from "../navigation/side/modules/Connections";
import Lines from "../navigation/side/modules/Lines";
import FlowchartShapes from "../navigation/side/modules/FlowchartShapes";
import {CategoryRounded} from "@material-ui/icons";

export default function Flowchart(props) {
    const [data, setDataD] = useState(NewProjectTemplate)
    const [defaultPage, setDefaultPage] = useState(0)
    const [toBeLinked, setToBeLinked] = useState(null)
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [scale, setScale] = useState(1)
    const [copiedNode, setCopiedNode] = useState(null)
    const handlePrint = useReactToPrint({
        content: () => document.getElementById('engine-content')
    })
    const handleKeyDown = (e) => {
        keyboardControl({
            event: e
        })
    }
    const setData= (e) => {
        console.log(e)
        setDataD(e)
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
                    if (selectedNode && event.target.closest('.' + nodeStyles.entityContainer) === null && event.target.closest('.' + tabsStyles.container) === null)
                        setSelectedNode(undefined)
                    if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                        setToBeLinked(null)
                }}
            >

                <FrameView/>
                <ContextMenu
                    data={data.pages[defaultPage]}
                    setData={(event) => {
                        console.log('SETTING FUCKING DATA')
                        console.log(event)
                        let newPages = [...data.pages]
                        newPages[defaultPage] = event
                        setData({...data, pages: newPages})

                    }}
                    scale={scale} setScale={setScale} copiedNode={copiedNode}
                    setCopiedNode={setCopiedNode} setSelectedNode={setSelectedNode}
                />
                <FileOptions setData={e => {
                    console.log('FILE IS SETTING DATA')
                    setData(e)
                }} data={data} handlePrint={handlePrint}/>
                <div style={{width: '100%', height: 'calc(100% - 40px)', display: 'flex'}}>
                    <SideBar
                        data={data}
                        defaultPage={defaultPage}
                        selectedNode={selectedNode}
                        setData={e => {
                            console.log('SIDEBAR IS SETTING DATA')
                            setData(e)
                        }}
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
                                                console.log('LINES IS SETTING DATA')
                                                setData(e)
                                            }}
                                        />

                                        <Connections
                                            data={data} setData={e => {
                                            console.log('CONNECTIONS IS SETTING DATA')
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
                            console.log('FONT IS SETTING DATA')
                            setData(e)
                        }}/>
                        <div className={styles.contentWrapper}>
                            <Pages
                                scale={scale} setScale={setScale}
                                data={data} setData={e => {
                                console.log('PAGE IS SETTING DATA')
                                setData(e)
                            }}
                                setDefaultPage={setDefaultPage}
                                defaultPage={defaultPage}
                            />
                            {props.children({
                                data: data.pages[defaultPage],
                                setData: (event) => {
                                    console.log('CHILDREN IS SETTING DATA')
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
                                selectedNode: selectedNode,
                                setSelectedNode: setSelectedNode,

                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}